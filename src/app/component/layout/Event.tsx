import { Calendar, Users, MapPin, Trophy } from "lucide-react";

interface EventStatsProps {
  totalEvents?: number;
  totalAttendees?: number;
  locations?: number;
  awards?: number;
}

export function EventStats({
  totalEvents = 150,
  totalAttendees = 5000,
  locations = 12,
  awards = 8,
}: EventStatsProps) {
  const stats = [
    {
      icon: Calendar,
      value: totalEvents,
      label: "Events Hosted",
      suffix: "+",
    },
    {
      icon: Users,
      value: totalAttendees,
      label: "Happy Attendees",
      suffix: "+",
    },
    {
      icon: MapPin,
      value: locations,
      label: "Cities Worldwide",
      suffix: "",
    },
    {
      icon: Trophy,
      value: awards,
      label: "Awards Won",
      suffix: "",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stat.value.toLocaleString()}
                {stat.suffix}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
