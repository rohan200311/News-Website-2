import { Zap, Target, Users, Code } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-12 md:py-24 space-y-24">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-4">
          <Zap className="w-12 h-12" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          About TechPulse
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          We are building the future of news. AI-powered, human-curated, and designed for the modern tech professional.
        </p>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-lg dark:prose-invert prose-blue max-w-none"
      >
        <h2>Our Mission</h2>
        <p>
          In a world overflowing with information, finding the signal in the noise is harder than ever. TechPulse was founded with a simple mission: to deliver the most important tech, AI, and startup news quickly, accurately, and without the fluff.
        </p>
        <p>
          We believe that your time is valuable. That's why we use cutting-edge AI to summarize complex stories, allowing you to get the gist in 60 seconds or dive deep when you want to.
        </p>

        <h2>How We Work</h2>
        <p>
          Our platform is powered by Google's Gemini 3.1 Pro AI. We use it to monitor thousands of sources, identify emerging trends, and draft comprehensive summaries. But AI is only half the story. Every piece of content is reviewed, edited, and contextualized by our team of expert human editors.
        </p>
      </motion.section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Target,
            title: "Accuracy First",
            desc: "We prioritize facts over speed. Every story is verified.",
          },
          {
            icon: Code,
            title: "AI-Powered",
            desc: "Leveraging Gemini 3.1 Pro for unparalleled speed and depth.",
          },
          {
            icon: Users,
            title: "Community Driven",
            desc: "Built for founders, engineers, and tech enthusiasts.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center space-y-4"
          >
            <item.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto" />
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
