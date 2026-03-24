import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Clock, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <Zap className="w-12 h-12 text-blue-600 mb-4 animate-bounce" />
          <p className="text-zinc-500 font-medium">Generating latest tech news...</p>
        </div>
      </div>
    );
  }

  const heroArticle = articles[0];
  const trendingArticles = articles.slice(1, 4);
  const feedArticles = articles.slice(4);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      {heroArticle && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">
                Breaking
              </span>
              <span className="text-sm text-zinc-500 font-medium">{heroArticle.category}</span>
            </div>
            <Link to={`/article/${heroArticle.id}`} className="block group">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {heroArticle.title}
              </h1>
            </Link>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              {heroArticle.summary}
            </p>
            <div className="flex items-center space-x-4 text-sm text-zinc-500">
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{heroArticle.author}</span>
              <span>&bull;</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {heroArticle.readTime} min read</span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Link to={`/article/${heroArticle.id}`} className="block overflow-hidden rounded-2xl aspect-[4/3] bg-zinc-100 dark:bg-zinc-800">
              <img
                src={`https://picsum.photos/seed/${heroArticle.imageUrl}/800/600?blur=2`}
                alt={heroArticle.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>
        </motion.section>
      )}

      {/* Trending Strip */}
      <section className="border-y border-zinc-200 dark:border-zinc-800 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-600" /> Trending Now
          </h2>
          <Link to="/trending" className="text-sm font-medium text-blue-600 hover:underline flex items-center">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingArticles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <Link to={`/article/${article.id}`} className="block space-y-4">
                <div className="overflow-hidden rounded-xl aspect-[16/9] bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={`https://picsum.photos/seed/${article.imageUrl}/600/400`}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-bold leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-zinc-500">
                    <span>{article.author}</span>
                    <span>&bull;</span>
                    <span>{article.readTime} min read</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Personalized Feed & Newsletter */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <h2 className="text-2xl font-bold">Latest Stories</h2>
          <div className="space-y-8">
            {feedArticles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col sm:flex-row gap-6 group"
              >
                <Link to={`/article/${article.id}`} className="sm:w-1/3 shrink-0 overflow-hidden rounded-xl aspect-[4/3] bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={`https://picsum.photos/seed/${article.imageUrl}/400/300`}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div className="flex flex-col justify-center space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {article.category}
                  </span>
                  <Link to={`/article/${article.id}`}>
                    <h3 className="text-xl sm:text-2xl font-bold leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {article.summary}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-zinc-500 mt-auto pt-2">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{article.author}</span>
                    <span>&bull;</span>
                    <span>{formatDistanceToNow(new Date(article.publishedAt))} ago</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Newsletter CTA */}
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 sticky top-24">
            <h3 className="text-xl font-bold mb-2">Stay Ahead of the Curve</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">
              Get the most important tech news and AI insights delivered to your inbox daily. No fluff, just signal.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition-shadow"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-zinc-500 mt-4 text-center">
              Join 50,000+ smart readers. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
