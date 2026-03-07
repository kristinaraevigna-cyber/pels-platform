"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20;

    const pollPaymentStatus = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("has_paid")
        .eq("id", user.id)
        .single();

      if (profile?.has_paid) {
        setChecking(false);
        setTimeout(() => {
          router.push("/assessment");
          router.refresh();
        }, 2000);
        return;
      }

      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(pollPaymentStatus, 1500);
      } else {
        setChecking(false);
      }
    };

    pollPaymentStatus();
  }, [router]);

  return (
    <div className="text-center">
      <div className="text-5xl mb-4 text-green-600">&#10003;</div>
      <h1 className="font-serif text-2xl font-normal text-stone-800 mb-3">
        Payment Successful
      </h1>
      <p className="text-stone-500 text-sm leading-relaxed">
        {checking
          ? "Confirming your payment... You will be redirected shortly."
          : "Your access has been activated. Redirecting to the assessment..."}
      </p>
      {checking && (
        <div className="mt-6 mx-auto w-8 h-8 border-[3px] border-clay-200 border-t-clay-300 rounded-full animate-spin" />
      )}
    </div>
  );
}
