"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import Button from "./Button";
import { joinWaitlist } from "@/app/action";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-r-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Joining..." : "Join"}
    </Button>
  );
}

export function WaitlistForm() {
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    try {
      const result = await joinWaitlist(formData);
      setMessage(result.message);

      if (result.success) {
        // Reset form
        const form = document.getElementById(
          "waitlist-form"
        ) as HTMLFormElement;
        form?.reset();

        // Clear message after 5 seconds
        setTimeout(() => setMessage(""), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="w-full space-y-3">
      <form id="waitlist-form" action={handleSubmit} className="flex w-full">
        <input
          type="email"
          className="flex-1 border border-gray-600 bg-gray-800 text-white rounded-l-lg px-3 py-2 md:px-4 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-gray-400"
          placeholder="Join the waitlist..."
          required
          name="email"
        />
        <SubmitButton />
      </form>

      {message && (
        <div className="w-full">
          <p
            className={`text-sm ${
              message.includes("success") ||
              message.includes("Added to waitlist")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        </div>
      )}
    </div>
  );
}
