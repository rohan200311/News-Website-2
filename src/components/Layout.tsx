import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Layout() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Trending", path: "/trending" },
    { name: "AI", path: "/category/AI" },
    { name: "Startups", path: "/category/Startups" },
    { name: "Gadgets", path: "/category/Gadgets" },
    { name: "Subscribe", path: "/subscribe" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-200">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            <span className="text-xl font-bold tracking-tight">TechPulse</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                  location.pathname === link.path
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-zinc-600 dark:text-zinc-400"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <nav className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-lg font-medium",
                    location.pathname === link.path
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-zinc-600 dark:text-zinc-400"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                <span className="text-xl font-bold tracking-tight">TechPulse</span>
              </Link>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-sm">
                The fastest, AI-powered news platform for tech, startups, and the future.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/category/AI" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600">AI</Link></li>
                <li><Link to="/category/Startups" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600">Startups</Link></li>
                <li><Link to="/category/Gadgets" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600">Gadgets</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600">About</Link></li>
                <li><Link to="/subscribe" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600">Subscribe</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} TechPulse News. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
