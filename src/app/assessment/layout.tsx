import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/assessment");
  }

  // Check if user has paid
  const { data: profile } = await supabase
    .from("profiles")
    .select("has_paid")
    .eq("id", user.id)
    .single();

  if (!profile?.has_paid) {
    redirect("/payment");
  }

  return <>{children}</>;
}
