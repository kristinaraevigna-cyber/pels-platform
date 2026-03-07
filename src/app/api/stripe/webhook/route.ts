import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Use service role client to bypass RLS
function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;

    if (userId) {
      const supabase = createServiceClient();

      // Update profile to mark as paid
      await supabase
        .from("profiles")
        .update({
          has_paid: true,
          stripe_customer_id: session.customer as string,
        })
        .eq("id", userId);

      // Insert payment record
      await supabase.from("payments").insert({
        user_id: userId,
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent as string,
        amount_cents: session.amount_total,
        currency: session.currency,
        status: "completed",
      });
    }
  }

  return NextResponse.json({ received: true });
}
