import { Target, Users, Braces, Flame, type LucideIcon } from "lucide-react";

interface Stat {
  number: string;
  label: string;
  icon: LucideIcon;
}

const stats: Stat[] = [
  { number: "50K+", label: "Problems Solved", icon: Target },
  { number: "10K+", label: "Active Developers", icon: Users },
  { number: "25+", label: "Languages", icon: Braces },
  { number: "98%", label: "Success Rate", icon: Flame },
];

const StatsSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group text-center p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 hover:border-amber-200 dark:hover:border-amber-800/50 transition-all duration-300"
            >
              <stat.icon className="w-5 h-5 mx-auto mb-3 text-amber-500 dark:text-amber-400" />
              <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">
                {stat.number}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
