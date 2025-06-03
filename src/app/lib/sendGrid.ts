import sgMail from "@sendgrid/mail";

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export type EmailData = {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
};

export async function sendEmail(data: EmailData) {
  try {
    const { to, from, subject, text, html } = data;

    // Validate required fields
    if (!to || !from || !subject) {
      throw new Error("Missing required email fields");
    }

    // Ensure we have either text or html content
    if (!text && !html) {
      throw new Error("Email must contain either text or html content");
    }

    // Send email using SendGrid
    const response = await sgMail.send({
      to,
      from,
      subject,
      text,
      html,
    });

    return { success: true, response };
  } catch (error) {
    console.error("SendGrid error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
