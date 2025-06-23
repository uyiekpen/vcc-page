"use client";

import { motion } from "framer-motion";
import { Code, Users, Zap } from "lucide-react";
import Link from "next/link";
import Button from "../ui/ButtonNew";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 sm:py-32">
      {/* Top Glow */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[300px] -translate-x-1/2 bg-purple-500/30 blur-3xl rounded-full z-0" />

      {/* Subtle Grid or Background Image Overlay */}
      <div className="absolute inset-0 bg-[url('/your-blob.svg')] bg-cover bg-center opacity-10 pointer-events-none z-0" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-2xl text-center">
          {/* Animated Promo Banner */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-300 ring-1 ring-white/10 hover:ring-white/20">
              Join 500+ developers in our community{" "}
              <Link href="/signup" className="font-semibold text-purple-400">
                <span className="absolute inset-0" aria-hidden="true" />
                Sign up <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Code. Learn. <span className="text-purple-400">Connect.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Join a vibrant coding community where developers of all levels
            learn, collaborate, and grow through real-world projects and
            mentorship.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-lg font-semibold w-[200px] md:w-[250px]">
              <Link href="/mail">Join the Waitlist</Link>
            </Button>
            <Button className="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white w-[200px] md:w-[250px] transition-all duration-300">
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 flex justify-center gap-8 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">500+ Members</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              <span className="text-sm">50+ Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span className="text-sm">Weekly Events</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
