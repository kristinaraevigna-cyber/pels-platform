import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-clay-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[440px] bg-white rounded-xl shadow-lg shadow-stone-200/50 px-10 py-12">
        <div className="flex justify-center mb-8">
          <Image
            src="/PEL Logo.png"
            alt="Positively Energizing Leadership"
            width={140}
            height={140}
            priority
            style={{ objectFit: "contain", mixBlendMode: "multiply" }}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
