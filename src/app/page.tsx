"use client";

import { useRouter } from "next/navigation";
import LandingPage from "@/components/steps/LandingPage";

export default function HomePage() {
  const router = useRouter();

  return <LandingPage onStart={() => router.push("/signup")} />;
}
