"use client";

import { motion } from "framer-motion";
import { Code2, Users2, Trophy, BookOpen } from "lucide-react";

export function About() {
  const features = [
    {
      icon: Code2,
      title: "Hands-on Learning",
      description:
        "Learn by doing with real projects and coding challenges that build practical skills.",
    },
    {
      icon: Users2,
      title: "Collaborative Environment",
      description:
        "Work with peers, share knowledge, and build lasting connections in the tech community.",
    },
    {
      icon: Trophy,
      title: "Competitions & Hackathons",
      description:
        "Participate in coding competitions and hackathons to test your skills and win prizes.",
    },
    {
      icon: BookOpen,
      title: "Mentorship Program",
      description:
        "Get guidance from experienced developers and help newcomers on their coding journey.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 dark:bg-black" id="about">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Join Our Coding Club?
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-600 dark:font-extrabold dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            We're more than just a club – we're a community dedicated to
            fostering growth, innovation, and collaboration among developers of
            all skill levels.
          </motion.p>
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 transition-all hover:shadow-lg hover:scale-[1.02]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 group-hover:scale-105 transition-transform">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:font-extrabold dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:font-bold dark:text-white">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
