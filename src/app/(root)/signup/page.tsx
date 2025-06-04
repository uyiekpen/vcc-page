"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    ("/onboarding");
    router.push("/onboarding");

    alert(`Signed up with:\nName: ${formData.name}\nEmail: ${formData.email}`);
    // Here you would typically submit form data to your backend
  };

  // Placeholder functions for OAuth sign-in
  const handleGitHubSignup = () => {
    alert("GitHub signup clicked (implement OAuth flow here)");
  };

  const handleGoogleSignup = () => {
    alert("Google signup clicked (implement OAuth flow here)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 dark:bg-black mt-10">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow dark:bg-gray-900 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Welcome to VCC
          </h1>
          <p className="text-gray-700 dark:text-gray-300">Create an Account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Sign Up
          </button>
        </form>

        {/* Or separator */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="mx-3 text-gray-500 dark:text-gray-400 text-sm">
            OR
          </span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGitHubSignup}
            className="w-full flex items-center justify-center space-x-2 border border-gray-700 rounded-lg py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {/* GitHub Icon */}
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C5.373 0 0 5.373 0 12a12 12 0 008.207 11.385c.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.39-1.333-1.76-1.333-1.76-1.09-.745.082-.73.082-.73 1.204.085 1.838 1.237 1.838 1.237 1.07 1.834 2.806 1.304 3.49.997.11-.776.42-1.304.763-1.605-2.665-.3-5.466-1.332-5.466-5.932 0-1.31.47-2.382 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.323 3.3 1.23a11.52 11.52 0 016 0c2.29-1.553 3.297-1.23 3.297-1.23.654 1.653.243 2.873.12 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.804 5.63-5.475 5.922.43.372.814 1.103.814 2.222 0 1.606-.015 2.896-.015 3.287 0 .32.216.694.825.576A12.003 12.003 0 0024 12c0-6.627-5.373-12-12-12z"
              />
            </svg>
            <span>Sign up with GitHub</span>
          </button>

          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center space-x-2 border border-gray-700 rounded-lg py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {/* Google Icon */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-18.6-1.5-36.5-4.4-53.9H272v102h146.9c-6.3 34-25.4 62.9-54.3 82.4v68.1h87.7c51.3-47.2 80.2-117 80.2-198.6z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c73.7 0 135.6-24.4 180.8-66.2l-87.7-68.1c-24.4 16.4-55.7 26-93.1 26-71.5 0-132.2-48.3-154-113.3H29.9v70.9C75 485.1 167.5 544.3 272 544.3z"
                fill="#34A853"
              />
              <path
                d="M118 324.7c-10.4-30.8-10.4-64 0-94.8v-70.9H29.9c-38.2 75.7-38.2 166.1 0 241.8l88.1-76.1z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.7c39.9 0 75.7 13.7 103.9 40.7l77.7-77.7C405.6 24.3 344 0 272 0 167.5 0 75 59.2 29.9 148.3l88.1 70.9c21.8-65 82.5-113.3 154-113.3z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
