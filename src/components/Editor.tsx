import { useState } from "react";
import { BlogPost } from "../types";
import { defaultAuthor } from "../data";
import { PenTool, Image, Tag, Eye, Save, HelpCircle, Sparkles, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import CrossPostSection from "./CrossPostSection";
import { motion } from "motion/react";

interface EditorProps {
  onSave: (newPost: BlogPost) => void;
  onViewPost: (postId: string) => void;
}

const PRESET_COVERS = [
  {
    name: "Luyện Thân & Thể Chất",
    url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
    theme: "Body"
  },
  {
    name: "Khai Tâm & Bình An",
    url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80",
    theme: "Mind"
  },
  {
    name: "Mở Trí & Nhận Thức",
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    theme: "Intellect"
  }
];

const PRESET_TAGS = [
  "Luyện Thân",
  "Khai Tâm",
  "Mở Trí",
  "Sức Khỏe",
  "Tâm Hồn",
  "Tư Duy",
  "Tử Tế",
  "Bình An",
  "Thói Quen",
  "Học Tập",
  "Nhận Thức"
];

export default function Editor({ onSave, onViewPost }: EditorProps) {
  // Post states
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0].url);
  const [selectedTags, setSelectedTags] = useState<string[]>(["Luyện Thân"]);
  const [customTag, setCustomTag] = useState("");
  const [readTime, setReadTime] = useState("5 phút");

  // Tab views
  const [editorTab, setEditorTab] = useState<"write" | "preview">("write");

  // Success states
  const [publishedPost, setPublishedPost] = useState<BlogPost | null>(null);

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTag = customTag.trim();
    if (cleanTag && !selectedTags.includes(cleanTag)) {
      setSelectedTags([...selectedTags, cleanTag]);
      setCustomTag("");
    }
  };

  const calculateReadTime = (text: string): string => {
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 180)); // ~180 words per min in Vietnamese
    return `${minutes} phút`;
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Vui lòng nhập tiêu đề và nội dung bài viết.");
      return;
    }

    const calculatedExcerpt = excerpt.trim() || (content.substring(0, 150) + "...");
    const postReadTime = calculateReadTime(content);

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      excerpt: calculatedExcerpt,
      content: content,
      coverImage: coverImage,
      date: new Date().toISOString().split("T")[0],
      author: defaultAuthor,
      tags: selectedTags.length > 0 ? selectedTags : ["Khác"],
      views: 1, // Start with 1 self view
      readTime: postReadTime
    };

    onSave(newPost);
    setPublishedPost(newPost);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {publishedPost ? (
        <div className="space-y-6">
          {/* Published success notification and quick link */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-6 dark:from-emerald-950/20 dark:to-teal-950/10 dark:border-emerald-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <span className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                Tuyệt vời!
              </span>
              <h2 className="text-xl font-extrabold text-emerald-950 dark:text-white mt-1">
                Bài viết của bạn đã được xuất bản thành công!
              </h2>
              <p className="text-sm text-emerald-700/80 dark:text-gray-300 mt-1">
                Bài viết đã được lưu vào blog và sẵn sàng để độc giả khám phá.
              </p>
            </div>
            <button
              onClick={() => onViewPost(publishedPost.id)}
              className="inline-flex items-center space-x-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/15 transition-all shrink-0"
            >
              <BookOpen className="h-4 w-4" />
              <span>Xem bài viết trên blog</span>
            </button>
          </motion.div>

          {/* Special Cross-Posting feature interface */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CrossPostSection
              post={publishedPost}
              onClose={() => {
                // Clear the state and reset form
                setTitle("");
                setExcerpt("");
                setContent("");
                setPublishedPost(null);
                setSelectedTags(["Luyện Thân"]);
              }}
            />
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="border-b border-slate-150 pb-5 dark:border-slate-800">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center space-x-2.5">
              <PenTool className="h-7 w-7 text-emerald-600" />
              <span>Soạn Thảo Bài Viết Mới</span>
            </h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
              Chia sẻ những góc nhìn tử tế, bài học kinh nghiệm và kiến thức quý báu tới mọi người.
            </p>
          </div>

          <form onSubmit={handlePublish} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left side: Main Editor */}
            <div className="lg:col-span-8 space-y-6">
              {/* Post Title */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tiêu đề bài viết <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: 3 Bài Học Về Sự Trung Thực Trong Quản Trị Nhân Sự..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-base text-slate-800 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100 dark:focus:border-emerald-400 transition-all font-bold"
                  id="editor-title"
                />
              </div>

              {/* Excerpt / Summary */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tóm tắt ngắn (Trích đoạn hiển thị ngoài danh sách)
                </label>
                <textarea
                  placeholder="Nên viết từ 2-3 câu mô tả ngắn gọn, thu hút người đọc bấm vào..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100 dark:focus:border-emerald-400 transition-all font-medium"
                />
              </div>

              {/* Markdown Content with Write/Preview Toggles */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                    Nội dung bài viết (Hỗ trợ định dạng Markdown) <span className="text-red-500">*</span>
                  </label>

                  <div className="flex rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800/85">
                    <button
                      type="button"
                      onClick={() => setEditorTab("write")}
                      className={`rounded-md px-3 py-1 text-xs font-bold transition-all ${
                        editorTab === "write"
                          ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                          : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      }`}
                    >
                      Soạn thảo
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab("preview")}
                      className={`rounded-md px-3 py-1 text-xs font-bold transition-all flex items-center space-x-1 ${
                        editorTab === "preview"
                          ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                          : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      }`}
                    >
                      <Eye className="h-3 w-3" />
                      <span>Xem trước</span>
                    </button>
                  </div>
                </div>

                {editorTab === "write" ? (
                  <div className="space-y-2">
                    <textarea
                      required
                      placeholder="Dùng Markdown: # để ghi Tiêu đề lớn, **in đậm**, *in nghiêng*, > khối trích dẫn, - gạch đầu dòng..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={14}
                      className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100 dark:focus:border-emerald-400 transition-all font-mono leading-relaxed"
                      id="editor-body"
                    />
                    <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                      <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                      <span>Bạn có thể dùng Markdown để bài viết có tiêu đề phụ, trích dẫn, gạch đầu dòng rõ ràng.</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-5 min-h-[330px] dark:border-slate-800 dark:bg-slate-900/40">
                    {content.trim() ? (
                      <article className="prose prose-emerald dark:prose-invert max-w-none text-slate-800 dark:text-slate-300">
                        <ReactMarkdown
                          components={{
                            h1: ({ ...props }) => <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-4 mb-2 pb-1 border-b border-slate-100 dark:border-slate-800" {...props} />,
                            h2: ({ ...props }) => <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-3 mb-2" {...props} />,
                            p: ({ ...props }) => <p className="leading-relaxed mb-3 text-sm" {...props} />,
                            ul: ({ ...props }) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                            ol: ({ ...props }) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                            blockquote: ({ ...props }) => <blockquote className="border-l-4 border-emerald-500 pl-3 py-0.5 my-3 italic text-slate-500 bg-slate-100/50 dark:bg-slate-800/20" {...props} />,
                            strong: ({ ...props }) => <strong className="font-bold text-slate-900 dark:text-white" {...props} />,
                          }}
                        >
                          {content}
                        </ReactMarkdown>
                      </article>
                    ) : (
                      <p className="text-sm italic text-slate-400 text-center py-12">Nội dung trống. Hãy viết điều gì đó ở tab soạn thảo.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Image Cover & Meta settings */}
            <div className="lg:col-span-4 space-y-6">
              {/* Cover Image Selector */}
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-800/30">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5 mb-2">
                  <Image className="h-4 w-4 text-emerald-600" />
                  <span>Ảnh bìa bài viết</span>
                </label>

                {/* Cover Preview */}
                <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 mb-3.5 border border-slate-100 dark:border-slate-700/80">
                  <img
                    src={coverImage}
                    alt="cover-preview"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>

                {/* Preset Options */}
                <div className="mb-3">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Chọn nhanh mẫu ảnh chất lượng cao:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_COVERS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCoverImage(preset.url)}
                        className={`text-left rounded-lg p-1.5 border text-xs font-semibold transition-all flex flex-col items-center justify-center space-y-1 ${
                          coverImage === preset.url
                            ? "border-emerald-500 bg-emerald-50/50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : "border-slate-100 bg-slate-50/50 text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/20 dark:text-slate-400"
                        }`}
                      >
                        <span className="truncate max-w-[100px]">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cover Image Input Link */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Hoặc nhập URL ảnh bất kỳ:
                  </span>
                  <input
                    type="url"
                    placeholder="Dán đường dẫn ảnh Unsplash, Pinterest..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-700 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-850 dark:text-slate-200"
                  />
                </div>
              </div>

              {/* Tags Selector */}
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-800/30">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5 mb-2">
                  <Tag className="h-4 w-4 text-emerald-600" />
                  <span>Thẻ từ khóa (Tags)</span>
                </label>

                {/* Predefined Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {PRESET_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleToggleTag(tag)}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750"
                        }`}
                      >
                        {isSelected ? `✓ ${tag}` : tag}
                      </button>
                    );
                  })}
                </div>

                {/* Custom tag input form */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Thêm thẻ tùy chỉnh của bạn:
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nhập và nhấn thêm..."
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      className="flex-1 rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-700 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-850 dark:text-slate-200"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomTag}
                      className="rounded-lg bg-emerald-50 px-3 text-xs font-bold text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit / Publish Button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/15 transition-all group cursor-pointer"
                id="btn-publish-post"
              >
                <Save className="h-5 w-5 transition-transform group-hover:scale-105" />
                <span>Đăng bài & Chia sẻ chéo</span>
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}
