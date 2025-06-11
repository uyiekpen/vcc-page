"use client";
import { supabase } from "@/app/lib/supbase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiGithub, FiLoader, FiEye, FiEyeOff, FiX } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import ErrorModal from "@/app/component/ui/ErrorModal";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState({
    github: false,
    google: false,
  });
  const [modalError, setModalError] = useState<string | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!strongPasswordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with uppercase, lowercase, number, and symbol";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { name: formData.name },
        },
      });

      if (error) throw error;

      toast.success("Account created successfully!");
      setShowWelcomeModal(true);
    } catch (error: any) {
      console.error("Signup error:", error);
      setModalError(error.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignup = async (provider: "github" | "google") => {
    setIsOAuthLoading((prev) => ({ ...prev, [provider]: true }));
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/onboarding`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error(`${provider} signup error:`, error);
      setModalError(error.message || `Error signing up with ${provider}`);
    } finally {
      setIsOAuthLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  const handleContinueToDashboard = () => {
    setShowWelcomeModal(false);
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 dark:bg-black mt-10">
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome to Your Dashboard!
              </h2>
              <button
                onClick={handleContinueToDashboard}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FiX size={24} />
              </button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Your account has been successfully created. We're excited to have
              you on board! Click continue to start your onboarding journey.
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleContinueToDashboard}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signup Form */}
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow dark:bg-gray-900 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Welcome to VCC
          </h1>
          <p className="text-gray-700 dark:text-gray-300">Create an Account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`w-full border ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-lg px-4 py-3 pr-10 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full border ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-lg px-4 py-3 pr-10 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin" /> Processing...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-pink-500 hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>

        {/* Separator */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="mx-3 text-gray-500 dark:text-gray-400 text-sm">
            OR
          </span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => handleOAuthSignup("github")}
            disabled={isOAuthLoading.github}
            className="w-full flex items-center justify-center gap-2 border border-gray-700 rounded-lg py-2.5 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-70"
          >
            {isOAuthLoading.github ? (
              <FiLoader className="animate-spin" />
            ) : (
              <>
                <FiGithub className="w-5 h-5" />
                <span>Sign up with GitHub</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleOAuthSignup("google")}
            disabled={isOAuthLoading.google}
            className="w-full flex items-center justify-center gap-2 border border-gray-700 rounded-lg py-2.5 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-70"
          >
            {isOAuthLoading.google ? (
              <FiLoader className="animate-spin" />
            ) : (
              <>
                <FcGoogle className="w-5 h-5" />
                <span>Sign up with Google</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Modal */}
      <ErrorModal
        isOpen={!!modalError}
        message={modalError || ""}
        onClose={() => setModalError(null)}
      />
    </div>
  );
}
