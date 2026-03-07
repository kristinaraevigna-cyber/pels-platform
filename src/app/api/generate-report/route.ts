import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import PELSReport from "@/components/PELSReport";
import React from "react";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, score, interventions, assessmentId } = body;

    const element = React.createElement(PELSReport, { data, score, interventions, assessmentId });
    // @ts-expect-error — PELSReport wraps a <Document> but renderToBuffer expects DocumentProps directly
    const pdfBuffer = await renderToBuffer(element);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="PELS-Report.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
