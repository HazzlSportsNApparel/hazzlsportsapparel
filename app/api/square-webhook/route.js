import crypto from "crypto";

export const runtime = "nodejs";

function isValidSquareSignature(rawBody, signature) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  const notificationUrl = process.env.SQUARE_WEBHOOK_URL;

  if (!signatureKey || !notificationUrl || !signature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", signatureKey)
    .update(notificationUrl + rawBody)
    .digest("base64");

  const expectedBuffer = Buffer.from(expectedSignature);
  const receivedBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    expectedBuffer,
    receivedBuffer
  );
}

export async function POST(request) {
  try {
    const rawBody = await request.text();

    const signature = request.headers.get(
      "x-square-hmacsha256-signature"
    );

    if (!isValidSquareSignature(rawBody, signature)) {
      return Response.json(
        {
          success: false,
          message: "Invalid Square signature.",
        },
        { status: 401 }
      );
    }

    const event = JSON.parse(rawBody);
    const payment = event?.data?.object?.payment;

    if (
      event?.type !== "payment.updated" ||
      payment?.status !== "COMPLETED"
    ) {
      return Response.json({
        success: true,
        ignored: true,
      });
    }

    const squareOrderId = payment?.order_id;

    if (!squareOrderId) {
      return Response.json({
        success: true,
        ignored: true,
      });
    }

    const appsScriptUrl =
      process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!appsScriptUrl) {
      throw new Error(
        "GOOGLE_APPS_SCRIPT_URL is missing."
      );
    }

    const formData = new URLSearchParams();

    formData.append(
      "formType",
      "squarePaymentUpdate"
    );

    formData.append(
      "squareOrderId",
      squareOrderId
    );

    formData.append(
      "paymentStatus",
      "Paid"
    );

    const appsScriptResponse = await fetch(
      appsScriptUrl,
      {
        method: "POST",
        body: formData,
        cache: "no-store",
      }
    );

    if (!appsScriptResponse.ok) {
      throw new Error(
        "Apps Script payment update failed."
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Square webhook error:", error);

    return Response.json(
      {
        success: false,
        message: "Webhook processing failed.",
      },
      { status: 500 }
    );
  }
}
