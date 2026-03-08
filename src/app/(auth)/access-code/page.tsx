"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccessCodePage() {
  const router = useRouter();

  useEffect(() => {
    // Assessment is now free — redirect to assessment directly
    router.replace("/assessment");
  }, [router]);

  return (
    <div style={{ textAlign: "center", padding: "48px 0" }}>
      <p style={{ fontFamily: "'Inter', sans-serif", color: "#999", fontSize: "14px" }}>
        Redirecting to your assessment...
      </p>
    </div>
  );
}
