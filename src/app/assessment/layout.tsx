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

  // Free access — any authenticated user can take the assessment
  return <>{children}</>;
}
