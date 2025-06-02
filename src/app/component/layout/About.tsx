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
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Join Our Coding Club?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're more than just a club – we're a community dedicated to
            fostering growth, innovation, and collaboration among developers of
            all skill levels.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
