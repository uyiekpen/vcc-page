export function getWelcomeEmailTemplate(name: string) {
  return {
    subject: `Welcome to Our Platform, ${name}!`,
    text: `
      Hi ${name},
      
      Welcome to our platform! We're excited to have you on board.
      
      If you have any questions, feel free to reply to this email.
      
      Best regards,
      The Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Our Platform!</h2>
        <p>Hi ${name},</p>
        <p>We're excited to have you on board. Your account has been successfully created.</p>
        <p>If you have any questions, feel free to reply to this email.</p>
        <p>Best regards,<br>The Team</p>
      </div>
    `,
  };
}

export function getPasswordResetTemplate(name: string, resetLink: string) {
  return {
    subject: "Password Reset Request",
    text: `
      Hi ${name},
      
      We received a request to reset your password. If you didn't make this request, you can ignore this email.
      
      To reset your password, click the link below:
      ${resetLink}
      
      This link will expire in 1 hour.
      
      Best regards,
      The Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
        <p>To reset your password, click the button below:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
        </p>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #4F46E5;">${resetLink}</p>
        <p>This link will expire in 1 hour.</p>
        <p>Best regards,<br>The Team</p>
      </div>
    `,
  };
}
