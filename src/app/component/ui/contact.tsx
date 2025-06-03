"use client";

import { useActionState } from "react";
import { CheckCircle, Mail, AlertCircle, Link } from "lucide-react";
import { joinWaitlist } from "@/app/action";

const initialState = {
  success: false,
  message: "",
};

export function WaitlistForm() {
  const [state, action, isPending] = useActionState(joinWaitlist, initialState);

  if (state?.success) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border">
        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              You're on the list!
            </h3>
            <p className="text-sm text-gray-600">{state.message}</p>
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-xs text-blue-700">
                📧 Check your email inbox (and spam folder) for a confirmation
                message.
              </p>
            </div>
            <span><Link  to="/">Go back Home</Link></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto  bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="text-center p-6 border-b">
        <div className="flex justify-center mb-4">
          <Mail className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Join the Waitlist</h2>
        <p className="text-gray-600 mt-2">
          Be the first to know when we launch. Get early access and exclusive
          updates.
        </p>
      </div>
      <div className="p-6">
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              required
              disabled={isPending}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              required
              disabled={isPending}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isPending ? "Joining..." : "Join Waitlist"}
          </button>
          {state && !state.success && state.message && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-600">{state.message}</div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
