import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Zap, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export default function Trending() {
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
          <p className="text-zinc-500 font-medium">Loading trending news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-12 flex items-center space-x-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
          <TrendingUp className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Trending Now
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mt-2">
            The most read stories across the tech ecosystem today.
          </p>
        </div>
      </header>

      <div className="space-y-12">
        {articles.map((article, i) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col md:flex-row gap-8 group items-center"
          >
            <div className="md:w-1/12 text-center hidden md:block">
              <span className="text-5xl font-black text-zinc-200 dark:text-zinc-800">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <Link to={`/article/${article.id}`} className="md:w-4/12 shrink-0 overflow-hidden rounded-xl aspect-[16/9] bg-zinc-100 dark:bg-zinc-800 w-full">
              <img
                src={`https://picsum.photos/seed/${article.imageUrl}/600/400`}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </Link>
            <div className="flex flex-col justify-center space-y-3 md:w-7/12">
              <div className="flex items-center space-x-2">
                <span className="md:hidden text-lg font-black text-zinc-400 dark:text-zinc-600 mr-2">
                  #{i + 1}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {article.category}
                </span>
              </div>
              <Link to={`/article/${article.id}`}>
                <h3 className="text-2xl md:text-3xl font-bold leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>
              </Link>
              <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2 text-lg">
                {article.summary}
              </p>
              <div className="flex items-center space-x-2 text-sm text-zinc-500 pt-2">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{article.author}</span>
                <span>&bull;</span>
                <span>{formatDistanceToNow(new Date(article.publishedAt))} ago</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
