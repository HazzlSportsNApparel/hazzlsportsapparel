import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

const MATERIAL_PRICES = {
  "Interlock DriFit": 25,
  "3 Tuck Mesh": 25,
  "50/50 Shirt": 24,
};

const SHIPPING_PRICE = 5;

export async function POST(request) {
  try {
    const accessToken = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.SQUARE_LOCATION_ID;

    if (!accessToken || !locationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Square is not configured.",
        },
        { status: 500 }
      );
    }

    const data = await request.json();

    const productName = String(
      data.productName || ""
    ).trim();

    const shirtColor = String(
      data.shirtColor || ""
    ).trim();

    const material = String(
      data.material || ""
    ).trim();

    const size = String(data.size || "").trim();

    const fulfillment = String(
      data.fulfillment || ""
    ).trim();

    const customerName = String(
      data.customerName || ""
    ).trim();

    const email = String(data.email || "").trim();

    const phone = String(data.phone || "").trim();

    const quantity = Number(data.quantity);

    if (
      !productName ||
      !material ||
      !size ||
      !customerName ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required order information is missing.",
        },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 25
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Quantity must be between 1 and 25.",
        },
        { status: 400 }
      );
    }

    const priceEach = MATERIAL_PRICES[material];

    if (!priceEach) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid shirt material.",
        },
        { status: 400 }
      );
    }

    const shipping =
      fulfillment === "Shipping"
        ? SHIPPING_PRICE
        : 0;

    const totalDollars =
      priceEach * quantity + shipping;

    const totalCents = Math.round(
      totalDollars * 100
    );

    const checkoutName = [
      productName,
      shirtColor,
      material,
      size,
      `Qty ${quantity}`,
      shipping
        ? "Includes $5 shipping"
        : "Customer pickup",
    ]
      .filter(Boolean)
      .join(" • ");

    const squareResponse = await fetch(
      "https://connect.squareup.com/v2/online-checkout/payment-links",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Square-Version": "2026-07-15",
        },
        body: JSON.stringify({
          idempotency_key: crypto.randomUUID(),

          quick_pay: {
            name: checkoutName,
            price_money: {
              amount: totalCents,
              currency: "USD",
            },
            location_id: locationId,
          },

          checkout_options: {
            redirect_url:
              "https://www.hazzlsportsapparel.com/?preorder=paid#preorder-store",
          },

          pre_populated_data: {
            buyer_email: email,
            buyer_phone_number: phone,
          },
        }),
      }
    );

    const squareData = await squareResponse.json();

    if (!squareResponse.ok) {
      console.error(
        "Square checkout error:",
        squareData
      );

      return NextResponse.json(
        {
          success: false,
          message:
            squareData?.errors?.[0]?.detail ||
            "Square could not create the checkout.",
        },
        { status: squareResponse.status }
      );
    }

    const checkoutUrl =
      squareData?.payment_link?.url;

    if (!checkoutUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Square did not return a checkout URL.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      checkoutUrl,
      priceEach,
      shipping,
      total: totalDollars,
    });
  } catch (error) {
    console.error(
      "Preorder checkout failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "The checkout could not be created.",
      },
      { status: 500 }
    );
  }
}
