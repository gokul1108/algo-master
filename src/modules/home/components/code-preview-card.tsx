const CodePreviewCard = () => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute -inset-1 bg-linear-to-r from-amber-500 via-indigo-500 to-amber-500 rounded-2xl blur opacity-20 dark:opacity-30" />
      <div className="relative bg-gray-950 dark:bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-gray-500 font-mono">
            solution.py
          </span>
        </div>
        {/* Code content */}
        <div className="p-6 text-left font-mono text-sm leading-relaxed">
          <div>
            <span className="text-indigo-400">def</span>{" "}
            <span className="text-amber-400">two_sum</span>
            <span className="text-gray-300">(</span>
            <span className="text-orange-300">nums</span>
            <span className="text-gray-500">,</span>{" "}
            <span className="text-orange-300">target</span>
            <span className="text-gray-300">):</span>
          </div>
          <div className="text-gray-500 ml-4">
            {"# O(n) hash map approach"}
          </div>
          <div className="ml-4">
            <span className="text-gray-300">seen </span>
            <span className="text-indigo-400">= </span>
            <span className="text-gray-300">{"{}"}</span>
          </div>
          <div className="ml-4">
            <span className="text-indigo-400">for</span>{" "}
            <span className="text-gray-300">i, num</span>{" "}
            <span className="text-indigo-400">in</span>{" "}
            <span className="text-amber-400">enumerate</span>
            <span className="text-gray-300">(nums):</span>
          </div>
          <div className="ml-8">
            <span className="text-gray-300">diff </span>
            <span className="text-indigo-400">= </span>
            <span className="text-gray-300">target </span>
            <span className="text-indigo-400">- </span>
            <span className="text-gray-300">num</span>
          </div>
          <div className="ml-8">
            <span className="text-indigo-400">if</span>{" "}
            <span className="text-gray-300">diff</span>{" "}
            <span className="text-indigo-400">in</span>{" "}
            <span className="text-gray-300">seen:</span>
          </div>
          <div className="ml-12">
            <span className="text-indigo-400">return</span>{" "}
            <span className="text-gray-300">[seen[diff], i]</span>
          </div>
          <div className="ml-8">
            <span className="text-gray-300">seen[num]</span>{" "}
            <span className="text-indigo-400">= </span>
            <span className="text-gray-300">i</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-green-400 text-xs">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            All test cases passed — Runtime: 4ms
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePreviewCard;
