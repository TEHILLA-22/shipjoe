import { NextResponse } from "next/server";
import { getCurrencyRates } from "@/lib/exchange-rates";

export async function GET() {
  try {
    const rates = await getCurrencyRates();

    return NextResponse.json(
      {
        success: true,
        ngnPerGbp: rates.ngnPerGbp,
        ngnPerEur: rates.ngnPerEur,
        updatedAt: rates.updatedAt,
        live: rates.live,
      },
      { headers: { "Cache-Control": "public, max-age=300" } },
    );
  } catch (error) {
    console.error("GET /api/rates failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load exchange rates.",
      },
      { status: 500 },
    );
  }
}