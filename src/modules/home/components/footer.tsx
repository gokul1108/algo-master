const Footer = () => {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-widest text-amber-500 dark:text-amber-400">
            AlgoMaster
          </span>
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} AlgoMaster. Built for developers, by
          developers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
