import {
  ChevronRight,
  Play,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CodePreviewCard from "./code-preview-card";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 pt-8 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/20 dark:bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-300/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-linear-to-r from-amber-500/10 to-indigo-500/10 dark:from-amber-500/20 dark:to-indigo-500/20 border border-amber-200/50 dark:border-amber-700/50 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Level up your coding skills — join 10,000+ developers
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-8">
          Think.{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-amber-500 dark:text-amber-400">
              Code.
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-3 bg-amber-400/30 dark:bg-amber-400/20 rounded-full -skew-x-3" />
          </span>{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-indigo-600 dark:text-indigo-400">
              Conquer.
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-3 bg-indigo-400/30 dark:bg-indigo-400/20 rounded-full skew-x-3" />
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Sharpen your algorithmic thinking with curated problems, real-time
          code execution, and a thriving community of developers pushing their
          limits every day.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Link href="/problems">
            <Button
              size="lg"
              className="group relative px-8 py-6 text-base font-semibold bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-400 dark:to-amber-500 dark:hover:from-amber-500 dark:hover:to-amber-600 text-white dark:text-gray-900 shadow-xl shadow-amber-500/25 dark:shadow-amber-400/20 hover:shadow-2xl hover:shadow-amber-500/30 transform hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Solving
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
          <Link href="/problems">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base font-semibold border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600 rounded-xl transition-all duration-300"
            >
              <Terminal className="w-5 h-5 mr-2" />
              Explore Problems
            </Button>
          </Link>
        </div>

        <CodePreviewCard />
      </div>
    </section>
  );
};

export default HeroSection;
