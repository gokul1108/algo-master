import { Badge } from "@/components/ui/badge";

interface Step {
  step: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    step: "01",
    title: "Choose a Problem",
    description:
      "Browse by topic, difficulty, or company. Filter to find exactly what you need to practice.",
  },
  {
    step: "02",
    title: "Write Your Solution",
    description:
      "Code in your preferred language with our powerful editor. Test against sample cases as you go.",
  },
  {
    step: "03",
    title: "Learn & Improve",
    description:
      "Review optimal solutions, analyze complexity, and track your progress over time.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          >
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 tracking-tight">
            Three steps to{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-indigo-500">
              mastery
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-amber-500 to-indigo-600 text-white font-black text-lg mb-6 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
