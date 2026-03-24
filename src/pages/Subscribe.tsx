import React, { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { motion } from "motion/react";

export default function Subscribe() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 md:py-24 space-y-16">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-4">
          <Mail className="w-12 h-12" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          Stay Ahead of the Curve
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Join 50,000+ smart readers. Get the most important tech news, AI insights, and startup trends delivered to your inbox daily. No fluff, just signal.
        </p>
      </header>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 shadow-xl"
      >
        {subscribed ? (
          <div className="text-center space-y-6 py-12">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-3xl font-bold">You're on the list!</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Thanks for subscribing. Keep an eye on your inbox for the next edition of TechPulse.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center">Subscribe to TechPulse Daily</h2>
            <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-5 py-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition-shadow text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-5 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-colors shadow-lg shadow-blue-600/20"
              >
                Subscribe Now
              </button>
            </form>
            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4 text-center">What you get</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Daily 5-minute read",
                  "AI & Tech deep dives",
                  "Startup funding news",
                  "Exclusive interviews",
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
