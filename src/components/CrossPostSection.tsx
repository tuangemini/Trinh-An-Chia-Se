import { BlogPost } from "../types";
import { defaultAuthor } from "../data";
import { useState, useEffect } from "react";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy, 
  Check, 
  ExternalLink, 
  Heart, 
  MessageCircle, 
  Share2, 
  Repeat, 
  Bookmark, 
  Send, 
  ThumbsUp,
  Globe2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CrossPostSectionProps {
  post: BlogPost;
  onClose: () => void;
}

type Platform = "facebook" | "twitter" | "linkedin";

export default function CrossPostSection({ post, onClose }: CrossPostSectionProps) {
  const [activePlatform, setActivePlatform] = useState<Platform>("facebook");
  const [socialCaption, setSocialCaption] = useState("");
  const [copied, setCopied] = useState(false);

  // Generate an elegant initial default caption based on the blog post
  useEffect(() => {
    const hashtags = post.tags.map(t => `#${t.replace(/\s+/g, "")}`).join(" ");
    const defaultCaption = `Tôi vừa chia sẻ bài viết mới: "${post.title}"\n\n"${post.excerpt}"\n\nMời cả nhà cùng đọc và thảo luận với Tuấn tại đây nhé. Chúc cả nhà luôn gieo những mầm hạt tử tế! 🌱\n\n${hashtags} #OngChuTuanTuTe`;
    setSocialCaption(defaultCaption);
  }, [post]);

  const cleanSlug = post.title
    .toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
    .replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ìíịỉĩ]/g, "i")
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ùúụủũưừứựửữ]/g, "u")
    .replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
  
  const mockPostUrl = `https://tuantute.vn/blog/${cleanSlug || "bai-viet"}`;

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(`${socialCaption}\n\nĐọc bài viết: ${mockPostUrl}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Pre-configured share intent links
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(mockPostUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(socialCaption)}&url=${encodeURIComponent(mockPostUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(mockPostUrl)}`
  };

  // Helper to color hashtags in preview text
  const formatCaptionWithHashtags = (text: string) => {
    return text.split(/(\s+)/).map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <span key={index} className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline cursor-pointer">
            {word}
          </span>
        );
      }
      return word;
    });
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800 mb-6 gap-y-2">
        <div>
          <h3 className="text-lg font-bold text-slate-950 dark:text-white flex items-center space-x-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Đăng bài thành công! Chia sẻ chéo (Cross-Posting)</span>
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Đăng nhanh tóm tắt bài viết này lên các mạng xã hội để tăng lượt tiếp cận của bạn.
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors"
        >
          Hoàn tất
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Social Caption Editor */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Nội dung tóm tắt chia sẻ:
            </label>
            <textarea
              value={socialCaption}
              onChange={(e) => setSocialCaption(e.target.value)}
              rows={8}
              placeholder="Nhập nội dung chia sẻ lên mạng xã hội..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-200 dark:focus:border-emerald-400 dark:focus:bg-gray-800 transition-all font-sans leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={handleCopyCaption}
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/10 transition-all"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300" />
                  <span>Đã sao chép caption & link!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Sao chép caption & link chia sẻ</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-3 gap-2">
              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-[#1877F2] hover:bg-slate-50 dark:border-slate-700 dark:text-emerald-400 dark:hover:bg-slate-800 transition-colors"
              >
                <Facebook className="h-4 w-4 fill-current" />
                <span>Mở FB</span>
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>

              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              >
                <Twitter className="h-4 w-4 fill-current" />
                <span>Mở X</span>
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>

              <a
                href={shareUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-[#0A66C2] hover:bg-slate-50 dark:border-slate-700 dark:text-emerald-400 dark:hover:bg-slate-800 transition-colors"
              >
                <Linkedin className="h-4 w-4 fill-current" />
                <span>Mở LinkedIn</span>
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
            </div>
          </div>
        </div>

        {/* Live Visual Preview Section */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Xem trước thực tế trên bảng tin:
            </span>
            
            {/* Visual platform tabs selector */}
            <div className="flex rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800/80">
              {(["facebook", "twitter", "linkedin"] as Platform[]).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setActivePlatform(platform)}
                  className={`rounded-md px-3 py-1 text-xs font-bold transition-all capitalize ${
                    activePlatform === platform
                      ? "bg-white text-slate-900 shadow-sm dark:bg-gray-700 dark:text-white"
                      : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  {platform === "twitter" ? "X / Twitter" : platform}
                </button>
              ))}
            </div>
          </div>

          {/* Social Card Visual Renderers */}
          <div className="flex-1 rounded-2xl border border-slate-150 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40 flex items-center justify-center min-h-[360px]">
            <AnimatePresence mode="wait">
              {activePlatform === "facebook" && (
                <motion.div
                  key="fb-preview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-gray-900 overflow-hidden font-sans text-slate-900 dark:text-gray-100"
                >
                  {/* FB Header */}
                  <div className="p-3.5 pb-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={defaultAuthor.avatar}
                        alt="author"
                        referrerPolicy="no-referrer"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-bold text-slate-900 dark:text-white hover:underline cursor-pointer">
                            {defaultAuthor.name}
                          </span>
                          {/* Verified Checkmark Badge */}
                          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-[8px] font-bold text-white">
                            ✓
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-slate-400 dark:text-slate-500 font-medium">
                          <span>Vừa xong</span>
                          <span>•</span>
                          <Globe2 className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg">•••</button>
                  </div>

                  {/* FB Caption Body */}
                  <div className="px-3.5 pb-3 text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {formatCaptionWithHashtags(socialCaption)}
                  </div>

                  {/* FB Link Attachment Card */}
                  <div className="border-t border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20 cursor-pointer">
                    <img
                      src={post.coverImage}
                      alt="preview"
                      referrerPolicy="no-referrer"
                      className="w-full aspect-[1.91/1] object-cover"
                    />
                    <div className="p-3">
                      <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                        TUANTUTE.VN
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 line-clamp-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* FB Engagement stats */}
                  <div className="px-3.5 py-2 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                    <span className="flex items-center space-x-1">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white font-bold">
                        👍
                      </span>
                      <span className="font-medium text-slate-500 dark:text-slate-400">Bạn và 1.2K người khác</span>
                    </span>
                    <span className="font-medium">12 bình luận • 45 chia sẻ</span>
                  </div>

                  {/* FB Footer buttons */}
                  <div className="grid grid-cols-3 text-center text-xs font-bold text-slate-500 dark:text-slate-400 py-1 px-1">
                    <button className="flex items-center justify-center space-x-1.5 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <ThumbsUp className="h-4 w-4 text-slate-400" />
                      <span>Thích</span>
                    </button>
                    <button className="flex items-center justify-center space-x-1.5 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <MessageCircle className="h-4 w-4 text-slate-400" />
                      <span>Bình luận</span>
                    </button>
                    <button className="flex items-center justify-center space-x-1.5 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <Share2 className="h-4 w-4 text-slate-400" />
                      <span>Chia sẻ</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {activePlatform === "twitter" && (
                <motion.div
                  key="tw-preview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-gray-900 font-sans text-slate-900 dark:text-gray-100"
                >
                  <div className="flex space-x-3">
                    {/* Twitter Left Avatar */}
                    <img
                      src={defaultAuthor.avatar}
                      alt="author"
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    {/* Twitter Right Column */}
                    <div className="flex-1 min-w-0">
                      {/* User Info Line */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm">
                          <span className="font-bold text-slate-900 dark:text-white truncate">
                            {defaultAuthor.name}
                          </span>
                          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-[8px] font-bold text-white">
                            ✓
                          </span>
                          <span className="text-slate-400 dark:text-slate-500 truncate font-medium">
                            @TuanTuTe
                          </span>
                          <span className="text-slate-400 dark:text-slate-500">•</span>
                          <span className="text-slate-400 dark:text-slate-500 whitespace-nowrap font-medium">
                            Vừa xong
                          </span>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">•••</button>
                      </div>

                      {/* Tweet Caption */}
                      <div className="mt-1.5 text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {formatCaptionWithHashtags(socialCaption)}
                      </div>

                      {/* Tweet Article Link Card */}
                      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/10 cursor-pointer">
                        <img
                          src={post.coverImage}
                          alt="preview"
                          referrerPolicy="no-referrer"
                          className="w-full aspect-[1.91/1] object-cover"
                        />
                        <div className="p-3 border-t border-slate-150 dark:border-slate-800">
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            tuantute.vn
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 line-clamp-1">
                            {post.title}
                          </h4>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Tweet Actions Grid */}
                      <div className="mt-4 flex items-center justify-between text-slate-400 dark:text-slate-500 max-w-sm">
                        <button className="flex items-center space-x-1 py-1 text-xs font-semibold hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span>4</span>
                        </button>
                        <button className="flex items-center space-x-1 py-1 text-xs font-semibold hover:text-green-500 transition-colors">
                          <Repeat className="h-4 w-4" />
                          <span>12</span>
                        </button>
                        <button className="flex items-center space-x-1 py-1 text-xs font-semibold hover:text-pink-500 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span>84</span>
                        </button>
                        <button className="flex items-center space-x-1 py-1 text-xs font-semibold hover:text-blue-500 transition-colors">
                          <Bookmark className="h-4 w-4" />
                          <span>19</span>
                        </button>
                        <button className="flex items-center space-x-1 py-1 text-xs font-semibold hover:text-blue-500 transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePlatform === "linkedin" && (
                <motion.div
                  key="li-preview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-gray-900 font-sans text-slate-900 dark:text-gray-100"
                >
                  {/* LinkedIn Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={defaultAuthor.avatar}
                        alt="author"
                        referrerPolicy="no-referrer"
                        className="h-11 w-11 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-bold text-slate-900 dark:text-white hover:underline cursor-pointer">
                            {defaultAuthor.name}
                          </span>
                          <span className="text-xs text-slate-400">• 1st</span>
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium leading-tight line-clamp-1">
                          {defaultAuthor.role} | Kiến tạo lối sống tử tế
                        </p>
                        <div className="flex items-center space-x-1 text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                          <span>Vừa xong</span>
                          <span>•</span>
                          <Globe2 className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold">•••</button>
                  </div>

                  {/* LinkedIn Caption */}
                  <div className="text-sm leading-relaxed whitespace-pre-wrap break-words mb-3">
                    {formatCaptionWithHashtags(socialCaption)}
                  </div>

                  {/* LinkedIn Attachment Card */}
                  <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/10 cursor-pointer">
                    <img
                      src={post.coverImage}
                      alt="preview"
                      referrerPolicy="no-referrer"
                      className="w-full aspect-[1.91/1] object-cover"
                    />
                    <div className="p-3 bg-white dark:bg-gray-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="min-w-0 pr-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {post.title}
                        </h4>
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                          tuantute.vn • {post.readTime} đọc
                        </span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400 shrink-0" />
                    </div>
                  </div>

                  {/* LinkedIn Engagement Counters */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="flex items-center -space-x-1">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[9px] text-white font-bold ring-1 ring-white">
                        👍
                      </span>
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white font-bold ring-1 ring-white">
                        ❤️
                      </span>
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-[9px] text-white font-bold ring-1 ring-white">
                        👏
                      </span>
                      <span className="ml-2 font-medium text-slate-500 dark:text-slate-400 pl-2">Bạn và 250 người khác</span>
                    </span>
                    <span>14 bình luận • 2 lượt chia sẻ</span>
                  </div>

                  {/* LinkedIn Actions Bar */}
                  <div className="mt-1 grid grid-cols-4 text-center text-xs font-bold text-slate-500 dark:text-slate-400 py-1">
                    <button className="flex flex-col items-center justify-center py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <ThumbsUp className="h-4 w-4 text-slate-400" />
                      <span className="mt-1 text-[10px]">Thích</span>
                    </button>
                    <button className="flex flex-col items-center justify-center py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <MessageCircle className="h-4 w-4 text-slate-400" />
                      <span className="mt-1 text-[10px]">Bình luận</span>
                    </button>
                    <button className="flex flex-col items-center justify-center py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <Repeat className="h-4 w-4 text-slate-400" />
                      <span className="mt-1 text-[10px]">Chia sẻ lại</span>
                    </button>
                    <button className="flex flex-col items-center justify-center py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <Send className="h-4 w-4 text-slate-400" />
                      <span className="mt-1 text-[10px]">Gửi</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
