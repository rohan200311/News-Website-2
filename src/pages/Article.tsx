import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Clock, Share2, Bookmark, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/news/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Article not found");
        return res.json();
      })
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <Zap className="w-12 h-12 text-blue-600 mb-4 animate-bounce" />
          <p className="text-zinc-500 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <Link to="/" className="text-blue-600 hover:underline inline-flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-12"
    >
      {/* Header */}
      <header className="space-y-6 text-center">
        <Link to={`/category/${article.category}`} className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
          {article.category}
        </Link>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
          {article.title}
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-center space-x-4 text-sm text-zinc-500 pt-4">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">{article.author}</span>
          <span>&bull;</span>
          <span>{format(new Date(article.publishedAt), "MMMM d, yyyy")}</span>
          <span>&bull;</span>
          <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {article.readTime} min read</span>
        </div>
      </header>

      {/* Hero Image */}
      <div className="overflow-hidden rounded-2xl aspect-[16/9] bg-zinc-100 dark:bg-zinc-800">
        <img
          src={`https://picsum.photos/seed/${article.imageUrl}/1200/675`}
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Content & Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Social Actions (Sticky) */}
        <div className="hidden md:block md:col-span-1">
          <div className="sticky top-24 flex flex-col space-y-4 items-center text-zinc-500">
            <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-blue-600 transition-colors" aria-label="Share">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-blue-600 transition-colors" aria-label="Save">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Text */}
        <div className="md:col-span-11 prose prose-lg dark:prose-invert prose-blue max-w-none">
          {/* Read in 60 seconds block */}
          <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border-l-4 border-blue-600 mb-8 not-prose">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-2" /> Read in 60 seconds
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Article Body */}
          <div className="space-y-6 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200">
            {article.content.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter CTA Inline */}
      <div className="bg-blue-600 text-white rounded-2xl p-8 md:p-12 mt-16 text-center shadow-xl">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Enjoying this read?</h3>
        <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
          Join 50,000+ tech insiders who get our daily digest of the most important AI and startup news.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-white transition-shadow"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-bold transition-colors whitespace-nowrap"
          >
            Subscribe Free
          </button>
        </form>
      </div>
    </motion.article>
  );
}
