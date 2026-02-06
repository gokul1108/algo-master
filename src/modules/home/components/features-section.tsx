import { Code2, Zap, BarChart3, Users, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "amber" | "indigo";
}

const features: Feature[] = [
  {
    icon: Code2,
    title: "Interactive Code Editor",
    description:
      "Write, run, and debug code in 25+ languages with syntax highlighting, autocomplete, and instant execution.",
    accent: "amber",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description:
      "Submit your solution and see results in milliseconds. Understand time & space complexity at a glance.",
    accent: "indigo",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description:
      "Visualize your growth with streaks, topic mastery maps, and personalized difficulty recommendations.",
    accent: "indigo",
  },
  {
    icon: Users,
    title: "Community Solutions",
    description:
      "Compare approaches with thousands of developers. Upvote, discuss, and learn from the best solutions.",
    accent: "amber",
  },
];

const accentStyles = {
  amber: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
  indigo:
    "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400",
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800"
          >
            Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 tracking-tight">
            Built for serious{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500">
              problem solvers
            </span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to go from beginner to interview-ready, all in
            one place
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 bg-white/50 dark:bg-white/2 hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${accentStyles[feature.accent]} group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-5 h-5" />
                </div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
