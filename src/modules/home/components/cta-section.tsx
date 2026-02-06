import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 mb-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background */}
          <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-900 to-indigo-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.15),transparent_50%)]" />

          <div className="relative px-8 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5 tracking-tight">
              Your next breakthrough
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-500">
                starts here
              </span>
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
              Stop scrolling tutorials. Start solving problems. Join thousands
              of developers building real skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/problems">
                <Button
                  size="lg"
                  className="px-8 py-6 text-base font-semibold bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 rounded-xl transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
