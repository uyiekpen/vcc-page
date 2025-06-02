import { Calendar, Code, Coffee, Gamepad2 } from "lucide-react";

export function Features() {
  const activities = [
    {
      icon: Code,
      title: "Weekly Coding Sessions",
      description:
        "Join our collaborative coding sessions every Tuesday and Thursday evening.",
      badge: "Popular",
    },
    {
      icon: Coffee,
      title: "Tech Talks & Workshops",
      description:
        "Learn from industry experts and explore new technologies in our monthly workshops.",
      badge: "Educational",
    },
    {
      icon: Gamepad2,
      title: "Game Development Jams",
      description:
        "Create games in 48 hours during our quarterly game development competitions.",
      badge: "Creative",
    },
    {
      icon: Calendar,
      title: "Project Showcases",
      description:
        "Present your projects to the community and get valuable feedback from peers.",
      badge: "Networking",
    },
  ];

  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What We Do
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From beginner-friendly workshops to advanced hackathons, we offer
            activities for every skill level and interest.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="relative rounded-2xl bg-white p-8 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                    <activity.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {activity.title}
                      </h3>
                    
                    </div>
                    <p className="text-gray-600">{activity.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
