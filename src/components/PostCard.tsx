import { BlogPost } from "../types";
import { Calendar, Eye, Clock, ArrowUpRight, Tag } from "lucide-react";
import { motion } from "motion/react";

interface PostCardProps {
  post: BlogPost;
  onClick: () => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  // Format date to Vietnamese locale style
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 dark:border-slate-800/80 dark:bg-slate-800/40"
      id={`post-card-${post.id}`}
    >
      {/* Cover Image */}
      <div 
        onClick={onClick}
        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
      >
        <img
          src={post.coverImage}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={(e) => {
            // Fallback image in case cover image url fails
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
        
        {/* Read time badge */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
          <Clock className="h-3 w-3" />
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
            >
              <Tag className="mr-0.5 h-2.5 w-2.5" />
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 
          onClick={onClick}
          className="mb-2.5 cursor-pointer text-lg font-bold leading-snug text-slate-950 transition-colors duration-200 line-clamp-2 hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400 sm:text-xl"
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Card Footer (Author & Stats) */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="h-7 w-7 rounded-full object-cover ring-1 ring-slate-100 dark:ring-slate-700"
            />
            <div className="flex flex-col text-[11px] font-medium">
              <span className="text-slate-800 dark:text-slate-200">{post.author.name}</span>
              <span className="text-slate-400 flex items-center mt-0.5">
                <Calendar className="mr-1 h-3 w-3" />
                {formatDate(post.date)}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center">
              <Eye className="mr-1 h-3.5 w-3.5" />
              {post.views}
            </span>
            <button
              onClick={onClick}
              className="flex items-center text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
            >
              Đọc tiếp
              <ArrowUpRight className="ml-0.5 h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
