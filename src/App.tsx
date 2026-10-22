import { useState, useEffect } from "react";
import { BlogPost } from "./types";
import { INITIAL_POSTS, defaultAuthor } from "./data";
import Header from "./components/Header";
import PostCard from "./components/PostCard";
import PostDetail from "./components/PostDetail";
import Editor from "./components/Editor";
import { 
  Search, 
  BookOpen, 
  Quote, 
  Sparkles, 
  Heart, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Newspaper,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // 1. Storage & Posts State
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem("tuan_tu_te_blog_posts");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_POSTS;
      }
    }
    return INITIAL_POSTS;
  });

  // 2. Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("tuan_tu_te_theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return false; // Default to Light theme
  });

  // 3. View Routing State
  const [activeView, setActiveView] = useState<"home" | "write" | "detail">("home");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // 4. Listing Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 5. Community States
  const [emailInput, setEmailInput] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showGroupMessage, setShowGroupMessage] = useState(false);

  // Persist posts to LocalStorage
  useEffect(() => {
    localStorage.setItem("tuan_tu_te_blog_posts", JSON.stringify(posts));
  }, [posts]);

  // Persist and apply dark mode class to root HTML
  useEffect(() => {
    localStorage.setItem("tuan_tu_te_theme", isDarkMode ? "dark" : "light");
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Save new post from Editor
  const handleSavePost = (newPost: BlogPost) => {
    setPosts([newPost, ...posts]);
  };

  // Get active selected post
  const activePost = posts.find((p) => p.id === selectedPostId);

  // Read action: view detail & increment view counter in local state
  const handleViewPost = (postId: string) => {
    setSelectedPostId(postId);
    setActiveView("detail");

    // Increment mock views safely
    setPosts(prevPosts =>
      prevPosts.map((p) =>
        p.id === postId ? { ...p, views: p.views + 1 } : p
      )
    );
  };

  // Get all unique tags from existing posts
  const allUniqueTags = Array.from(
    new Set(posts.flatMap((p) => p.tags))
  );

  // Filter logic: search title/excerpt/content & matching tag
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300 flex flex-col font-sans">
      {/* 1. Brand Navigation Header */}
      <Header
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          if (view === "home") {
            setSelectedPostId(null);
          }
        }}
        isDarkMode={isDarkMode}
        toggleDarkMode={handleToggleDarkMode}
      />

      {/* 2. Main Page Layout Wrapper */}
      <main className="flex-1 pb-16">
        <AnimatePresence mode="wait">
          {/* VIEW: HOME PAGE */}
          {activeView === "home" && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Home Page Hero Section */}
              <div className="relative overflow-hidden border-b border-slate-100 bg-white py-12 dark:border-gray-900 dark:bg-gray-900/40 transition-colors duration-300">
                {/* Visual Ambient Blur Accents */}
                <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl dark:bg-emerald-500/10" />
                <div className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl dark:bg-emerald-500/10" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    {/* Left Intro Text Column */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-500 animate-spin" />
                        <span>CHÀO MỪNG BẠN GHÉ THĂM KHÔNG GIAN TỬ TẾ</span>
                      </div>

                      <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl leading-tight">
                        Phát triển bản thân <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent">toàn diện THÂN - TÂM - TRÍ.</span>
                      </h1>

                      <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                        Chào bạn, tôi là <strong>Tuấn</strong>. Nơi đây là góc nhỏ sẻ chia chiêm nghiệm về hành trình rèn luyện Thân thể, nuôi dưỡng Tâm hồn và khai phóng Trí tuệ. Sứ mệnh của tôi là <strong>kết nối các nguồn lực giúp những người khát khao thay đổi có cuộc sống tốt đẹp hơn.</strong>
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => {
                            const listEl = document.getElementById("blog-listing");
                            listEl?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/15 transition-all cursor-pointer"
                        >
                          Khám phá bài viết
                        </button>
                        <button
                          onClick={() => setActiveView("write")}
                          className="rounded-xl bg-white border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:bg-gray-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          Viết bài chia sẻ
                        </button>
                      </div>
                    </div>

                    {/* Right Intro Author Showcase Card */}
                    <div className="lg:col-span-5">
                      <div className="rounded-2xl border border-slate-150 bg-white p-6 shadow-md dark:border-slate-800 dark:bg-gray-900/60 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 text-emerald-500/10">
                          <Quote className="h-20 w-20 transform rotate-180" />
                        </div>

                        <div className="flex items-start space-x-4 relative">
                          <img
                            src={defaultAuthor.avatar}
                            alt={defaultAuthor.name}
                            referrerPolicy="no-referrer"
                            className="h-16 w-16 rounded-full object-cover ring-4 ring-emerald-500/20"
                          />
                          <div className="space-y-1">
                            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
                              TÁC GIẢ BLOG
                            </span>
                            <h3 className="text-lg font-black text-slate-950 dark:text-white">
                              {defaultAuthor.name}
                            </h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
                              {defaultAuthor.role} • Kết nối & Sẻ chia
                            </p>
                          </div>
                        </div>

                        <p className="mt-4 text-xs italic leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                          &ldquo;Phát triển bản thân toàn diện không phải là một đích đến, mà là một hành trình rèn luyện mỗi ngày. Hãy kiên trì rèn luyện Thân khỏe mạnh, giữ Tâm bình an, và mở Trí sáng suốt để nâng tầm nhận thức.&rdquo;
                        </p>

                        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around text-center">
                          <div>
                            <span className="block text-lg font-extrabold text-slate-950 dark:text-white">{posts.length}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bài viết</span>
                          </div>
                          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                          <div>
                            <span className="block text-lg font-extrabold text-slate-950 dark:text-white">
                              {posts.reduce((sum, p) => sum + p.views, 0)}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lượt đọc</span>
                          </div>
                          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                          <div>
                            <span className="block text-lg font-extrabold text-slate-950 dark:text-white">100%</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tử tế</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Listing with Search & Filtering */}
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" id="blog-listing">
                {/* Search Bar & Tag Pill filters */}
                <div className="mb-10 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-950 dark:text-white flex items-center space-x-2">
                        <Newspaper className="h-5 w-5 text-emerald-500" />
                        <span>Danh Sách Bài Viết ({filteredPosts.length})</span>
                      </h2>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        Lọc theo từ khóa tìm kiếm hoặc bấm vào từng thẻ tag để chọn chủ đề yêu thích.
                      </p>
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full md:max-w-xs">
                      <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Tìm bài viết..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm placeholder-slate-400 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-gray-900/60 dark:text-gray-100 dark:focus:border-emerald-400 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Tags filtering carousel */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1.5">Chủ đề:</span>
                    <button
                      onClick={() => setSelectedTag(null)}
                      className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
                        selectedTag === null
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                          : "bg-white border border-slate-150 text-slate-600 hover:bg-slate-50 dark:bg-gray-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      Tất cả
                    </button>
                    {allUniqueTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
                          tag === selectedTag
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "bg-white border border-slate-150 text-slate-600 hover:bg-slate-50 dark:bg-gray-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid list of posts */}
                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filteredPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onClick={() => handleViewPost(post.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900/20"
                  >
                    <BookOpen className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
                    <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">Không tìm thấy bài viết</h3>
                    <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                      Hãy thử tìm kiếm bằng từ khóa khác hoặc bấm quay lại Tất cả chủ đề.
                    </p>
                    <button
                      onClick={() => { setSearchQuery(""); setSelectedTag(null); }}
                      className="mt-4 inline-flex items-center space-x-2 rounded-lg bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400"
                    >
                      Xóa bộ lọc
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Community CTA Block */}
              <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 p-8 sm:p-12 text-white shadow-xl">
                  {/* Subtle decorative circles */}
                  <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
                  <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

                  <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Column: text and group action */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-100 backdrop-blur-sm">
                        <Users className="h-4 w-4" />
                        <span>KẾT NỐI & CÙNG TRƯỞNG THÀNH</span>
                      </div>
                      
                      <h2 className="text-2xl font-black sm:text-3xl tracking-tight leading-tight">
                        CỘNG ĐỒNG HỌC TẬP PHÁT TRIỂN BẢN THÂN
                      </h2>
                      
                      <p className="text-emerald-100/90 text-sm leading-relaxed max-w-xl">
                        Nơi những người khát khao thay đổi cùng nhau kết nối các nguồn lực, rèn luyện kỷ luật <strong>Thân - Tâm - Trí</strong> mỗi ngày, sẻ chia tri thức và nâng đỡ nhau hướng tới một cuộc sống tốt đẹp hơn.
                      </p>

                      <div className="space-y-3">
                        <button
                          onClick={() => setShowGroupMessage(true)}
                          className="rounded-xl bg-white px-6 py-3 text-sm font-black text-emerald-800 hover:bg-emerald-50 active:scale-95 shadow-md shadow-black/10 transition-all cursor-pointer flex items-center space-x-2"
                        >
                          <Users className="h-4 w-4 text-emerald-700" />
                          <span>Tham gia nhóm học tập</span>
                        </button>

                        <AnimatePresence>
                          {showGroupMessage && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-white/10 border border-white/15 rounded-xl p-4 text-xs text-emerald-50 leading-relaxed max-w-xl"
                            >
                              <p className="font-bold flex items-center gap-1.5">
                                <Sparkles className="h-4 w-4 text-amber-300 shrink-0" />
                                Chào mừng bạn gia nhập cộng đồng học tập!
                              </p>
                              <p className="mt-1">
                                Chúng tôi đang kết nối các nguồn lực tuyệt vời để xây dựng những buổi zoom thảo luận rèn luyện hằng tuần. Link tham gia nhóm học tập trực tiếp đã được lưu và gửi tới bạn qua email đăng ký bản tin ở bên cạnh!
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Right Column: Newsletter Signup Form */}
                    <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-sm space-y-4">
                      <h3 className="text-lg font-bold">Đăng ký nhận bản tin Thân-Tâm-Trí</h3>
                      <p className="text-emerald-100/80 text-xs leading-relaxed">
                        Nhận những bài chia sẻ sâu sắc nhất, hướng dẫn thực hành kỷ luật cùng tài liệu phát triển bản thân hoàn toàn miễn phí từ Ông Chủ Tuấn Tử Tế hằng tuần.
                      </p>

                      {isSubscribed ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-4 text-center space-y-2"
                        >
                          <p className="text-sm font-black text-white flex items-center justify-center gap-1.5">
                            ✨ Đăng ký thành công!
                          </p>
                          <p className="text-xs text-emerald-100">
                            Cảm ơn bạn đã đồng hành. Bản tin phát triển bản thân ý nghĩa sẽ sớm được gửi tới email của bạn!
                          </p>
                          <button
                            onClick={() => setIsSubscribed(false)}
                            className="text-[10px] text-emerald-200 underline hover:text-white"
                          >
                            Đăng ký bằng email khác
                          </button>
                        </motion.div>
                      ) : (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (emailInput.trim()) {
                              setIsSubscribed(true);
                              setEmailInput("");
                            }
                          }}
                          className="space-y-3"
                        >
                          <div className="relative">
                            <input
                              type="email"
                              required
                              placeholder="Nhập email của bạn..."
                              value={emailInput}
                              onChange={(e) => setEmailInput(e.target.value)}
                              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-emerald-200/50 focus:outline-none focus:border-white focus:bg-white/15 transition-all"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all active:scale-[0.98]"
                          >
                            Đăng ký ngay
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* VIEW: POST DETAILS */}
          {activeView === "detail" && activePost && (
            <PostDetail
              post={activePost}
              onBack={() => {
                setActiveView("home");
                setSelectedPostId(null);
              }}
            />
          )}

          {/* VIEW: EDITOR (CREATE POST) */}
          {activeView === "write" && (
            <Editor
              onSave={handleSavePost}
              onViewPost={handleViewPost}
            />
          )}
        </AnimatePresence>
      </main>

      {/* 3. Global Footer */}
      <footer className="border-t border-slate-150 bg-white dark:border-slate-950 dark:bg-gray-950 py-8 transition-colors duration-300 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            © 2026 Blog Ông Chủ Tuấn Tử Tế. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-md mx-auto">
            Hành trình chia sẻ tri thức phát triển bản thân toàn diện THÂN-TÂM-TRÍ, kết nối và nâng đỡ cộng đồng cùng có cuộc sống tốt đẹp hơn.
          </p>
        </div>
      </footer>
    </div>
  );
}
