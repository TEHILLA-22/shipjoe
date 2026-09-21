import { NextRequest, NextResponse } from "next/server";
import { Quotes } from "@/lib/db/orm";
import { getAdminSession } from "@/lib/auth/admin-auth";
import {
  validateQuoteForm,
  type QuoteFormData,
} from "@/lib/quote-validation";

function unauthorizedResponse() {
  return NextResponse.json(
    {
      success: false,
      message: "Authentication required.",
    },
    { status: 401 },
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const values: QuoteFormData = {
      origin:
        typeof body.origin === "string"
          ? body.origin.trim()
          : "",
      destination:
        typeof body.destination === "string"
          ? body.destination.trim()
          : "",
      shipmentType:
        typeof body.shipmentType === "string"
          ? body.shipmentType.trim()
          : "",
      weight:
        typeof body.weight === "string"
          ? body.weight.trim()
          : String(body.weight ?? ""),
      dimensions:
        typeof body.dimensions === "string"
          ? body.dimensions.trim()
          : "",
      quantity:
        typeof body.quantity === "string"
          ? body.quantity.trim()
          : String(body.quantity ?? ""),
      description:
        typeof body.description === "string"
          ? body.description.trim()
          : "",
      preferredMethod:
        typeof body.preferredMethod === "string"
          ? body.preferredMethod.trim()
          : "",
      fullName:
        typeof body.fullName === "string"
          ? body.fullName.trim()
          : "",
      email:
        typeof body.email === "string"
          ? body.email.trim()
          : "",
      phone:
        typeof body.phone === "string"
          ? body.phone.trim()
          : "",
      companyName:
        typeof body.companyName === "string"
          ? body.companyName.trim()
          : "",
      notes:
        typeof body.notes === "string"
          ? body.notes.trim()
          : "",
    };

    const validationErrors = validateQuoteForm(values);

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please correct the submitted information.",
          errors: validationErrors,
        },
        { status: 400 },
      );
    }

    const now = new Date().toISOString();

    const quote = await Quotes.insert({
      origin: values.origin,
      destination: values.destination,
      shipmentType: values.shipmentType,
      weight: Number(values.weight),
      dimensions: values.dimensions,
      quantity: Number(values.quantity),
      description: values.description || undefined,
      preferredMethod:
        values.preferredMethod || undefined,
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      companyName: values.companyName || undefined,
      notes: values.notes || undefined,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your quote request has been submitted successfully.",
        quoteId: quote?.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/quotes failed:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't submit your quote request.",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const session = await getAdminSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1,
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit")) || 20,
        1,
      ),
      100,
    );

    const result = await Quotes.query()
      .orderBy("createdAt", "desc")
      .getPaginated(page, limit);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("GET /api/quotes failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve quotes.",
      },
      { status: 500 },
    );
  }
}