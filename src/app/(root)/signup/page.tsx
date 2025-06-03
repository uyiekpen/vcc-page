"use client";

import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center overflow-hidden">
      {/* Floating blobs */}
      <div className="absolute w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float1 -top-20 -left-20"></div>
      <div className="absolute w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float2 top-20 right-10"></div>
      <div className="absolute w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float3 bottom-0 left-1/2 -translate-x-1/2"></div>

      {/* Glass card */}
      <div className="backdrop-blur-xl bg-white/60 border border-white/30 rounded-3xl shadow-lg p-8 w-full max-w-md z-10">
        <SignUp
          appearance={{
            elements: {
              card: "shadow-none bg-transparent",
              formButtonPrimary:
                "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600",
              headerTitle: "text-gray-900",
              headerSubtitle: "text-gray-600",
              formFieldLabel: "text-gray-700",
              formFieldInput:
                "bg-white/70 backdrop-blur-md border border-gray-300 text-gray-900",
            },
            variables: {
              colorPrimary: "#9333ea",
            },
          }}
        />
      </div>
    </div>
  );
}
