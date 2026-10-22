import { BlogPost } from "../types";
import { ArrowLeft, Calendar, Eye, Clock, Share2, Facebook, Twitter, Linkedin, Check, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "motion/react";
import { useState } from "react";

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export default function PostDetail({ post, onBack }: PostDetailProps) {
  const [copied, setCopied] = useState(false);

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

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Quick share intent URLs
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
      id={`post-detail-${post.id}`}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-8 inline-flex items-center space-x-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 group transition-colors duration-200"
        id="btn-back-to-home"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        <span>Quay lại trang chủ</span>
      </button>

      {/* Header Info */}
      <div className="mb-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl leading-tight">
          {post.title}
        </h1>

        {/* Post Metadata Row */}
        <div className="mt-6 flex flex-wrap items-center gap-y-4 gap-x-6 border-b border-slate-100 pb-6 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-500/20"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {post.author.name}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {post.author.role}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
            <span className="flex items-center">
              <Calendar className="mr-1.5 h-4 w-4 text-gray-400" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1.5 h-4 w-4 text-gray-400" />
              {post.readTime} đọc
            </span>
            <span className="flex items-center">
              <Eye className="mr-1.5 h-4 w-4 text-gray-400" />
              {post.views} lượt xem
            </span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="mb-8 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 aspect-[21/9] w-full relative shadow-md">
        <img
          src={post.coverImage}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80";
          }}
        />
      </div>

      {/* Main Grid: Content + Sidebar Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editorial Body */}
        <div className="lg:col-span-8">
          <article className="prose prose-emerald dark:prose-invert max-w-none text-slate-800 dark:text-slate-300">
            <ReactMarkdown
              components={{
                h1: ({ ...props }) => (
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-8 mb-4 border-b border-slate-100 pb-2 dark:border-slate-800" {...props} />
                ),
                h2: ({ ...props }) => (
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-6 mb-3" {...props} />
                ),
                h3: ({ ...props }) => (
                  <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white mt-5 mb-2" {...props} />
                ),
                p: ({ ...props }) => (
                  <p className="leading-relaxed mb-5 text-slate-700 dark:text-slate-300 text-base" {...props} />
                ),
                ul: ({ ...props }) => (
                  <ul className="list-disc pl-6 mb-5 space-y-2 text-slate-700 dark:text-slate-300" {...props} />
                ),
                ol: ({ ...props }) => (
                  <ol className="list-decimal pl-6 mb-5 space-y-2 text-slate-700 dark:text-slate-300" {...props} />
                ),
                li: ({ ...props }) => (
                  <li className="leading-relaxed" {...props} />
                ),
                blockquote: ({ ...props }) => (
                  <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 my-6 italic text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 rounded-r-lg font-medium" {...props} />
                ),
                strong: ({ ...props }) => (
                  <strong className="font-bold text-slate-950 dark:text-white" {...props} />
                ),
                hr: ({ ...props }) => (
                  <hr className="my-8 border-slate-200 dark:border-slate-800" {...props} />
                ),
                code: ({ ...props }) => (
                  <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-emerald-600 dark:text-emerald-400" {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
          {/* Author Bio Card */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800/80 dark:bg-slate-800/20">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Tác giả bài viết
            </h4>
            <div className="flex flex-col items-center text-center">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                referrerPolicy="no-referrer"
                className="h-16 w-16 rounded-full object-cover ring-4 ring-emerald-500/10 mb-3"
              />
              <span className="text-base font-bold text-slate-950 dark:text-white">
                {post.author.name}
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                {post.author.role}
              </span>
              <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {post.author.bio}
              </p>
            </div>
          </div>

          {/* Social Share Card */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800/80 dark:bg-slate-800/20">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Chia sẻ bài viết
            </h4>
            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className="flex w-full items-center justify-between rounded-lg bg-white border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="flex items-center space-x-2">
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>{copied ? "Đã sao chép!" : "Sao chép đường dẫn"}</span>
                </span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={shareUrls.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center space-x-1.5 rounded-lg bg-[#1877F2] py-2.5 text-xs font-semibold text-white hover:bg-opacity-95 transition-opacity"
                >
                  <Facebook className="h-4 w-4 fill-current" />
                  <span>Facebook</span>
                </a>
                <a
                  href={shareUrls.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center space-x-1.5 rounded-lg bg-[#1DA1F2] py-2.5 text-xs font-semibold text-white hover:bg-opacity-95 transition-opacity"
                >
                  <Twitter className="h-4 w-4 fill-current" />
                  <span>Twitter</span>
                </a>
                <a
                  href={shareUrls.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center space-x-1.5 rounded-lg bg-[#0A66C2] py-2.5 text-xs font-semibold text-white hover:bg-opacity-95 transition-opacity"
                >
                  <Linkedin className="h-4 w-4 fill-current" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
