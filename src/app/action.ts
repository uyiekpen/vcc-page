"use server";

export async function joinWaitlist(formData: FormData) {
  // Get email from form data
  const email = formData.get("email") as string;

  if (!email) {
    return {
      success: false,
      message: "Email is required",
    };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address",
    };
  }

  try {
    // Here you would typically:
    // 1. Store the email in your database
    // 2. Send a confirmation email
    // 3. Add to your email marketing platform

    console.log("Adding to waitlist:", email);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For now, we'll just return a success message
    return {
      success: true,
      message:
        "Successfully added to waitlist! We'll notify you when we launch.",
    };
  } catch (error) {
    console.error("Waitlist error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
