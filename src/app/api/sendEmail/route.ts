import { type NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const verifiedSender = "uyiekpenelizabeth@gmail.com";

    const msg = {
      to: email.toString(),
      from: verifiedSender,
      subject: "Test Email from Your App",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Test Email</h2>
          <p>This is a test email to verify that your SendGrid integration is working correctly.</p>
          <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
          <p>If you received this email, your SendGrid configuration is working! 🎉</p>
        </div>
      `,
    };

    console.log(`📤 Sending test email to: ${email}`);

    const response = await sgMail.send(msg);

    console.log(`✅ Test email sent successfully!`);
    console.log(`📊 Response:`, {
      statusCode: response[0]?.statusCode,
      messageId: response[0]?.headers?.["x-message-id"],
    });

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully! Check your inbox.",
      debug: {
        statusCode: response[0]?.statusCode,
        messageId: response[0]?.headers?.["x-message-id"],
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("❌ Test email error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send test email",
        debug: {
          error: error.message,
          code: error.code,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}
