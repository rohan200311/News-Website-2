import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Zap } from "lucide-react";
import { motion } from "motion/react";

export default function Category() {
  const { name } = useParams();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/news?category=${name}`)
      .then((res) => res.json())
      .then((data) => {
        // Filter by category if the API didn't
        const filtered = data.filter((a: any) => a.category.toLowerCase() === name?.toLowerCase());
        setArticles(filtered.length > 0 ? filtered : data); // Fallback to all if empty for prototype
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <Zap className="w-12 h-12 text-blue-600 mb-4 animate-bounce" />
          <p className="text-zinc-500 font-medium">Loading {name} news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <header className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight capitalize">
          {name} News
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mt-4">
          The latest updates, analysis, and breaking stories in {name}.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, i) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex flex-col"
          >
            <Link to={`/article/${article.id}`} className="block overflow-hidden rounded-xl aspect-[16/9] bg-zinc-100 dark:bg-zinc-800 mb-4">
              <img
                src={`https://picsum.photos/seed/${article.imageUrl}/600/400`}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </Link>
            <div className="flex flex-col flex-1 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {article.category}
              </span>
              <Link to={`/article/${article.id}`}>
                <h3 className="text-xl font-bold leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-3">
                  {article.title}
                </h3>
              </Link>
              <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2 text-sm flex-1">
                {article.summary}
              </p>
              <div className="flex items-center space-x-2 text-xs text-zinc-500 pt-4 mt-auto border-t border-zinc-100 dark:border-zinc-800">
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
