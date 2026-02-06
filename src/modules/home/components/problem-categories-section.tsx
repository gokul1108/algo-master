import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProblemCategory {
  level: string;
  title: string;
  description: string;
  count: string;
  color: "emerald" | "amber" | "rose";
  gradient: string;
}

const categories: ProblemCategory[] = [
  {
    level: "Easy",
    title: "Foundations",
    description:
      "Build your base with arrays, strings, and basic data structures. Perfect for getting started.",
    count: "500+",
    color: "emerald",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    level: "Medium",
    title: "Core Algorithms",
    description:
      "Master trees, graphs, dynamic programming, and classic interview patterns.",
    count: "800+",
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    level: "Hard",
    title: "Advanced",
    description:
      "Tackle complex optimizations, advanced graph theory, and contest-level challenges.",
    count: "300+",
    color: "rose",
    gradient: "from-rose-500 to-red-600",
  },
];

const badgeStyles = {
  emerald:
    "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400",
  amber:
    "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400",
  rose: "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-400",
};

const countStyles = {
  emerald: "text-emerald-600 dark:text-emerald-400",
  amber: "text-amber-600 dark:text-amber-400",
  rose: "text-rose-600 dark:text-rose-400",
};

const ProblemCategoriesSection = () => {
  return (
    <section id="problems" className="py-24">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"
          >
            Problem Sets
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 tracking-tight">
            Pick your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500">
              difficulty
            </span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Structured paths from fundamentals to contest-level challenges
          </p>
        </div>

        {/* Category cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-white/2 hover:shadow-xl transition-all duration-300"
            >
              {/* Top gradient line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${category.gradient} opacity-80`}
              />
              <CardHeader className="pt-8 pb-3">
                <Badge
                  variant="secondary"
                  className={`w-fit text-xs font-bold ${badgeStyles[category.color]}`}
                >
                  {category.level}
                </Badge>
                <CardTitle className="text-xl text-gray-900 dark:text-white mt-2">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {category.description}
                </CardDescription>
                <div className="flex items-center justify-between pt-2">
                  <span
                    className={`text-sm font-bold ${countStyles[category.color]}`}
                  >
                    {category.count} problems
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-all duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemCategoriesSection;
