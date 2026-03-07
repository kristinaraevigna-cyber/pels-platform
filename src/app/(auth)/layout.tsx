import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(165deg, #F7F3EE 0%, #EDE5D8 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        className="auth-card"
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(139,111,94,0.08), 0 2px 8px rgba(0,0,0,0.04)",
          padding: "48px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px", paddingTop: "12px" }}>
          <Image
            src="/PEL3.png"
            alt="Positively Energizing Leadership"
            width={260}
            height={260}
            priority
            style={{ objectFit: "contain", maxHeight: "180px", maxWidth: "100%", mixBlendMode: "multiply" }}
          />
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: "48px",
            height: "1px",
            backgroundColor: "#C4956A",
            margin: "0 auto 32px",
          }}
        />

        {children}
      </div>
    </div>
  );
}
