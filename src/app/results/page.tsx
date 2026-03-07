import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ResultsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/results");
  }

  const { data: results } = await supabase
    .from("assessment_results")
    .select("*")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false });

  return (
    <div className="min-h-screen bg-clay-50 p-10 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl text-stone-800 mb-2">
          Your Results
        </h1>
        <p className="text-stone-500 mb-10">
          View your past PELS assessment results.
        </p>

        {!results || results.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <p className="text-stone-500 mb-5">
              You haven&apos;t completed any assessments yet.
            </p>
            <a
              href="/assessment"
              className="inline-block px-7 py-3 bg-clay-300 text-white rounded-lg text-sm font-semibold hover:bg-clay-400"
            >
              Take the Assessment
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-serif text-xl font-semibold text-stone-800">
                    {result.assessment_type === "pels"
                      ? "PELS Assessment"
                      : result.assessment_type}
                  </h3>
                  <span className="text-stone-500 text-xs">
                    {new Date(result.completed_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <pre className="bg-clay-50 p-4 rounded-lg text-xs overflow-auto text-stone-800">
                  {JSON.stringify(result.scores, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
