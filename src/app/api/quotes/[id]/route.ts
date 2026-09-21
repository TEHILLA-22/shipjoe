import { NextRequest, NextResponse } from "next/server";
import { Quotes } from "@/lib/db/orm";
import { getAdminSession } from "@/lib/auth/admin-auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function unauthorizedResponse() {
  return NextResponse.json(
    {
      success: false,
      message: "Authentication required.",
    },
    { status: 401 },
  );
}

function parseQuoteId(id: string) {
  const quoteId = Number(id);

  if (!Number.isInteger(quoteId) || quoteId <= 0) {
    return null;
  }

  return quoteId;
}

export async function GET(
  _request: NextRequest,
  context: RouteContext,
) {
  const session = await getAdminSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const { id } = await context.params;

    const quoteId = parseQuoteId(id);

    if (!quoteId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid quote ID.",
        },
        { status: 400 },
      );
    }

    const quote = await Quotes.get({
      id: quoteId,
    });

    if (!quote) {
      return NextResponse.json(
        {
          success: false,
          message: "Quote not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      quote,
    });
  } catch (error) {
    console.error(
      "GET /api/quotes/[id] failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve quote.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext,
) {
  const session = await getAdminSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const { id } = await context.params;

    const quoteId = parseQuoteId(id);

    if (!quoteId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid quote ID.",
        },
        { status: 400 },
      );
    }

    const quote = await Quotes.get({
      id: quoteId,
    });

    if (!quote) {
      return NextResponse.json(
        {
          success: false,
          message: "Quote not found.",
        },
        { status: 404 },
      );
    }

    const body = await request.json();

    const allowedStatuses = [
      "pending",
      "reviewed",
      "quoted",
      "accepted",
      "rejected",
    ];

    const updates: Record<string, unknown> = {};

    if (typeof body.status === "string") {
      const status = body.status.trim();

      if (!allowedStatuses.includes(status)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid quote status.",
          },
          { status: 400 },
        );
      }

      updates.status = status;
    }

    const editableFields = [
      "origin",
      "destination",
      "shipmentType",
      "dimensions",
      "description",
      "preferredMethod",
      "fullName",
      "email",
      "phone",
      "companyName",
      "notes",
    ] as const;

    for (const field of editableFields) {
      if (typeof body[field] === "string") {
        updates[field] = body[field].trim();
      }
    }

    if (body.weight !== undefined) {
      const weight = Number(body.weight);

      if (!Number.isFinite(weight) || weight <= 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Weight must be a positive number.",
          },
          { status: 400 },
        );
      }

      updates.weight = weight;
    }

    if (body.quantity !== undefined) {
      const quantity = Number(body.quantity);

      if (
        !Number.isInteger(quantity) ||
        quantity <= 0
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Quantity must be a positive whole number.",
          },
          { status: 400 },
        );
      }

      updates.quantity = quantity;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No valid fields were provided.",
        },
        { status: 400 },
      );
    }

    updates.updatedAt = new Date().toISOString();

    await quote.update(updates);

    const updatedQuote = await Quotes.get({
      id: quoteId,
    });

    return NextResponse.json({
      success: true,
      message: "Quote updated successfully.",
      quote: updatedQuote,
    });
  } catch (error) {
    console.error(
      "PATCH /api/quotes/[id] failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update quote.",
      },
      { status: 500 },
    );
  }
}