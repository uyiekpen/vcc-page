"use server";

import sgMail from "@sendgrid/mail";

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function joinWaitlist(prevState: any, formData: FormData) {
  console.log("✅ Server action called");
  
  if (!formData || typeof formData.get !== "function") {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  const email = formData.get("email");
  const name = formData.get("name");

  if (!email || !name) {
    return {
      success: false,
      message: "Please provide both name and email",
    };
  }

  // Use the same verified sender email for both messages
  const verifiedSender = "uyiekpenelizabeth@gmail.com"; // Make sure this is verified in SendGrid

  console.log(`🚀 Starting waitlist signup for: ${name} (${email})`);
  console.log(`📧 Using sender email: ${verifiedSender}`);
  console.log(`🔑 SendGrid API Key present: ${!!process.env.SENDGRID_API_KEY}`);

  try {
    // Send confirmation email to the user
    const userMsg = {
      to: email.toString(),
      from: verifiedSender,
      subject: "Welcome to our waitlist!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thanks for joining our waitlist!</h2>
          <p>Hi ${name},</p>
          <p>We're excited to have you on our waitlist. We'll keep you updated on our progress and let you know as soon as we're ready to launch.</p>
          <p>Stay tuned!</p>
          <p>Best regards,<br>The Team</p>
        </div>
      `,
    };

    // Send notification email to admin (using same verified sender)
    const adminMsg = {
      to: verifiedSender, // Send admin notification to the same verified email
      from: verifiedSender,
      subject: "New Waitlist Signup",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h3>New waitlist signup:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Signed up at:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    console.log(`📤 Attempting to send emails...`);
    console.log(`📧 User email to: ${email}`);
    console.log(`📧 Admin email to: ${verifiedSender}`);

    // Send both emails and capture responses
    const [userResponse, adminResponse] = await Promise.all([
      sgMail.send(userMsg),
      sgMail.send(adminMsg),
    ]);

    console.log(`✅ User email sent successfully!`);
    console.log(`📊 User email response:`, {
      statusCode: userResponse[0]?.statusCode,
      messageId: userResponse[0]?.headers?.["x-message-id"],
    });

    console.log(`✅ Admin email sent successfully!`);
    console.log(`📊 Admin email response:`, {
      statusCode: adminResponse[0]?.statusCode,
      messageId: adminResponse[0]?.headers?.["x-message-id"],
    });

    return {
      success: true,
      message:
        "Successfully joined the waitlist! Check your email for confirmation.",
      debug: {
        userEmailSent: true,
        adminEmailSent: true,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error: any) {
    // Enhanced error logging
    console.error("❌ SendGrid error:", error);
    console.error("📧 Error details:", {
      message: error.message,
      code: error.code,
      statusCode: error.response?.status,
    });

    if (error.response) {
      console.error("📋 SendGrid response body:", error.response.body);
      console.error("📊 SendGrid response status:", error.response.status);
      console.error("📝 SendGrid response headers:", error.response.headers);
    }

    // Return more specific error messages based on the error
    let errorMessage = "Something went wrong. Please try again later.";

    if (error.code === 403) {
      errorMessage =
        "Email service configuration error. Please contact support.";
      console.error(
        "🚫 403 Error - Check sender authentication and API key permissions"
      );
    } else if (error.code === 401) {
      errorMessage =
        "Email service authentication error. Please contact support.";
      console.error("🔐 401 Error - Invalid API key");
    } else if (error.code === 400) {
      errorMessage = "Invalid email format. Please check your email address.";
      console.error(
        "📧 400 Error - Bad request, possibly invalid email format"
      );
    }

    return {
      success: false,
      message: errorMessage,
      debug: {
        error: error.message,
        code: error.code,
        timestamp: new Date().toISOString(),
      },
    };
  }
}
