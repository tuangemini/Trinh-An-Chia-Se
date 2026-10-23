/**
 * AN NHIÊN CMS STUDIO - TRÌNH QUẢN TRỊ NỘI DUNG TRỰC QUAN
 * Cho phép cô Trịnh Thị An tự đăng bài, thêm ảnh, video, prompt và quản lý học viên mà không cần biết lập trình!
 */

window.AnNhienCMS = (function () {
  'use strict';

  let currentTab = 'posts';
  let isAuthenticated = false;

  function init() {
    createAdminModal();
    bindGlobalTriggers();
  }

  function bindGlobalTriggers() {
    // Keyboard shortcut: Ctrl + Shift + A to open CMS
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        openCMS();
      }
    });
  }

  function openCMS() {
    const modal = document.getElementById('an-nhien-cms-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    if (!isAuthenticated) {
      document.getElementById('cms-pin-screen').classList.remove('hidden');
      document.getElementById('cms-main-screen').classList.add('hidden');
      setTimeout(() => document.getElementById('cms-pin-input').focus(), 100);
    } else {
      document.getElementById('cms-pin-screen').classList.add('hidden');
      document.getElementById('cms-main-screen').classList.remove('hidden');
      renderActiveTab();
    }
  }

  function closeCMS() {
    const modal = document.getElementById('an-nhien-cms-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  function verifyPin() {
    const input = document.getElementById('cms-pin-input');
    const err = document.getElementById('cms-pin-error');
    const entered = input.value.trim();
    const correctPin = window.AnNhienData.getAdminPin();

    if (entered === correctPin) {
      isAuthenticated = true;
      input.value = '';
      err.classList.add('hidden');
      document.getElementById('cms-pin-screen').classList.add('hidden');
      document.getElementById('cms-main-screen').classList.remove('hidden');
      renderActiveTab();
    } else {
      err.textContent = 'Mã PIN chưa chính xác. Vui lòng thử lại!';
      err.classList.remove('hidden');
      input.select();
    }
  }

  function createAdminModal() {
    if (document.getElementById('an-nhien-cms-modal')) return;

    const div = document.createElement('div');
    div.id = 'an-nhien-cms-modal';
    div.className = 'fixed inset-0 z-[10000] hidden items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto';
    div.innerHTML = `
      <div class="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col font-sans">
        
        <!-- HEADER -->
        <div class="px-6 py-4 bg-gradient-to-r from-slate-900 via-blue-950 to-teal-900 text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-extrabold text-lg">
              🔐
            </div>
            <div>
              <h3 class="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
                An Nhiên CMS Studio
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">Dành Cho Cô An</span>
              </h3>
              <p class="text-xs text-slate-300">Quản trị nội dung website trực quan không cần viết code</p>
            </div>
          </div>
          <button onclick="window.AnNhienCMS.close()" class="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition">
            &times;
          </button>
        </div>

        <!-- PIN SCREEN -->
        <div id="cms-pin-screen" class="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-5">
          <div class="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center text-3xl shadow-inner">
            🔑
          </div>
          <div class="space-y-1">
            <h4 class="text-xl font-black text-slate-900 dark:text-white">Xác Thực Mã PIN Quản Trị</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400">Vui lòng nhập mã PIN để mở trung tâm quản trị (Mặc định: <strong class="text-amber-600">1979</strong>)</p>
          </div>
          <form onsubmit="event.preventDefault(); window.AnNhienCMS.verifyPin();" class="space-y-3">
            <input type="password" id="cms-pin-input" placeholder="Nhập mã PIN..." maxlength="10" class="w-full text-center text-2xl tracking-widest font-bold py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500">
            <p id="cms-pin-error" class="text-xs text-red-500 font-bold hidden"></p>
            <button type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition active:scale-[0.98]">
              Đăng Nhập Quản Trị
            </button>
          </form>
        </div>

        <!-- MAIN DASHBOARD -->
        <div id="cms-main-screen" class="hidden flex-1 flex flex-col overflow-hidden">
          
          <!-- TAB NAVIGATION -->
          <div class="flex items-center gap-1 px-4 sm:px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 overflow-x-auto shrink-0 scrollbar-none">
            <button onclick="window.AnNhienCMS.switchTab('posts')" id="tab-btn-posts" class="cms-tab-btn active">
              📝 Bài Viết & Học AI
            </button>
            <button onclick="window.AnNhienCMS.switchTab('artworks')" id="tab-btn-artworks" class="cms-tab-btn">
              🎨 Kho Tranh AI
            </button>
            <button onclick="window.AnNhienCMS.switchTab('prompts')" id="tab-btn-prompts" class="cms-tab-btn">
              ⚡ Kho Prompt
            </button>
            <button onclick="window.AnNhienCMS.switchTab('videos')" id="tab-btn-videos" class="cms-tab-btn">
              🎬 Video YouTube
            </button>
            <button onclick="window.AnNhienCMS.switchTab('registrations')" id="tab-btn-registrations" class="cms-tab-btn">
              👥 Học Viên & Yêu Cầu
            </button>
            <button onclick="window.AnNhienCMS.switchTab('settings')" id="tab-btn-settings" class="cms-tab-btn">
              ⚙️ Cài Đặt & Sao Lưu
            </button>
          </div>

          <!-- TAB CONTENT CONTAINER -->
          <div id="cms-tab-content" class="flex-1 p-4 sm:p-6 overflow-y-auto">
            <!-- Dynamic Content -->
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(div);

    // Add styles for CMS tab
    const style = document.createElement('style');
    style.innerHTML = `
      .cms-tab-btn {
        padding: 10px 16px;
        font-size: 13px;
        font-weight: 700;
        border-radius: 12px 12px 0 0;
        border: 1px solid transparent;
        border-bottom: none;
        color: #64748b;
        white-space: nowrap;
        transition: all 0.2s;
        cursor: pointer;
      }
      .cms-tab-btn:hover {
        color: #0f172a;
        background: rgba(255, 255, 255, 0.5);
      }
      .dark .cms-tab-btn:hover {
        color: #f8fafc;
        background: rgba(30, 41, 59, 0.5);
      }
      .cms-tab-btn.active {
        color: #0f2b48;
        background: #ffffff;
        border-color: #e2e8f0;
        border-top: 3px solid #d97706;
      }
      .dark .cms-tab-btn.active {
        color: #38bdf8;
        background: #0f172a;
        border-color: #334155;
        border-top: 3px solid #f59e0b;
      }
    `;
    document.head.appendChild(style);
  }

  function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.cms-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`tab-btn-${tab}`);
    if (activeBtn) activeBtn.classList.add('active');
    renderActiveTab();
  }

  function renderActiveTab() {
    const container = document.getElementById('cms-tab-content');
    if (!container) return;

    if (currentTab === 'posts') {
      renderPostsTab(container);
    } else if (currentTab === 'artworks') {
      renderArtworksTab(container);
    } else if (currentTab === 'prompts') {
      renderPromptsTab(container);
    } else if (currentTab === 'videos') {
      renderVideosTab(container);
    } else if (currentTab === 'registrations') {
      renderRegistrationsTab(container);
    } else if (currentTab === 'settings') {
      renderSettingsTab(container);
    }
  }

  // --- TAB 1: POSTS ---
  function renderPostsTab(container) {
    const posts = window.AnNhienData.getPosts();
    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h4 class="text-lg font-black text-slate-900 dark:text-white">Quản Lý Bài Viết & Hướng Dẫn Học AI (${posts.length})</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400">Các bài chia sẻ kiến thức, hướng dẫn thực hành và góc sống đẹp</p>
          </div>
          <button onclick="window.AnNhienCMS.showPostForm()" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow transition">
            <span>+ Thêm Bài Mới</span>
          </button>
        </div>

        <div id="cms-post-form-area" class="hidden"></div>

        <div class="grid grid-cols-1 gap-3">
          ${posts.map(p => `
            <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:border-amber-400 transition">
              <div class="flex items-center gap-3">
                <img src="${p.coverImage}" class="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700" onerror="this.src='images/anh-05.jpg'">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 uppercase">${p.category}</span>
                    <span class="text-xs text-slate-400">${p.date} • ${p.readTime}</span>
                  </div>
                  <h5 class="font-bold text-sm text-slate-900 dark:text-white mt-1">${p.title}</h5>
                  <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">${p.excerpt}</p>
                </div>
              </div>
              <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button onclick="window.AnNhienCMS.showPostForm('${p.id}')" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition">
                  ✏️ Sửa
                </button>
                <button onclick="window.AnNhienCMS.deletePost('${p.id}')" class="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold text-red-600 dark:text-red-400 transition">
                  🗑️ Xóa
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function showPostForm(postId) {
    const area = document.getElementById('cms-post-form-area');
    if (!area) return;
    area.classList.remove('hidden');

    let post = null;
    if (postId) {
      const posts = window.AnNhienData.getPosts();
      post = posts.find(p => p.id === postId);
    }

    area.innerHTML = `
      <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-amber-300 dark:border-amber-600 space-y-4 mb-6 shadow-md">
        <div class="flex items-center justify-between">
          <h5 class="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            ${post ? '✏️ Chỉnh Sửa Bài Viết' : '✨ Thêm Bài Viết Mới'}
          </h5>
          <button onclick="document.getElementById('cms-post-form-area').classList.add('hidden')" class="text-xs text-slate-400 hover:text-slate-600">Đóng ✕</button>
        </div>
        <form onsubmit="event.preventDefault(); window.AnNhienCMS.savePost('${postId || ''}');" class="space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tiêu đề bài viết:</label>
              <input type="text" id="post-title" required value="${post ? post.title : ''}" placeholder="Nhập tiêu đề..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Chuyên mục:</label>
              <select id="post-category" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
                <option value="Thư Viện Học AI" ${post && post.category === 'Thư Viện Học AI' ? 'selected' : ''}>Thư Viện Học AI</option>
                <option value="AI Công Việc" ${post && post.category === 'AI Công Việc' ? 'selected' : ''}>AI Công Việc</option>
                <option value="Âm Nhạc & Video AI" ${post && post.category === 'Âm Nhạc & Video AI' ? 'selected' : ''}>Âm Nhạc & Video AI</option>
                <option value="Góc Sống Đẹp" ${post && post.category === 'Góc Sống Đẹp' ? 'selected' : ''}>Góc Sống Đẹp</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Cấp độ:</label>
              <input type="text" id="post-level" value="${post ? post.level : 'Cơ Bản Cho Người Mới'}" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Thời lượng đọc:</label>
              <input type="text" id="post-readtime" value="${post ? post.readTime : '5 phút đọc'}" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Link ảnh bìa (hoặc file):</label>
              <input type="text" id="post-cover" value="${post ? post.coverImage : 'images/anh-05.jpg'}" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Đoạn tóm tắt mở đầu:</label>
            <textarea id="post-excerpt" rows="2" required placeholder="Tóm tắt ngắn gọn nội dung bài viết..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">${post ? post.excerpt : ''}</textarea>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nội dung chi tiết (hỗ trợ xuống dòng & gạch đầu dòng):</label>
            <textarea id="post-content" rows="8" required placeholder="Nội dung bài viết..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono">${post ? post.content : ''}</textarea>
          </div>
          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" onclick="document.getElementById('cms-post-form-area').classList.add('hidden')" class="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold">Hủy bỏ</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow">Lưu Bài Viết</button>
          </div>
        </form>
      </div>
    `;
    area.scrollIntoView({ behavior: 'smooth' });
  }

  function savePost(postId) {
    const title = document.getElementById('post-title').value.trim();
    const category = document.getElementById('post-category').value;
    const level = document.getElementById('post-level').value.trim();
    const readTime = document.getElementById('post-readtime').value.trim();
    const coverImage = document.getElementById('post-cover').value.trim();
    const excerpt = document.getElementById('post-excerpt').value.trim();
    const content = document.getElementById('post-content').value.trim();

    let posts = window.AnNhienData.getPosts();

    if (postId) {
      posts = posts.map(p => p.id === postId ? {
        ...p,
        title, category, level, readTime, coverImage, excerpt, content
      } : p);
    } else {
      const newPost = {
        id: 'post-' + Date.now(),
        title,
        category,
        level,
        readTime,
        coverImage,
        excerpt,
        content,
        date: new Date().toISOString().split('T')[0]
      };
      posts.unshift(newPost);
    }

    window.AnNhienData.savePosts(posts);
    renderPostsTab(document.getElementById('cms-tab-content'));
    if (window.renderLivePosts) window.renderLivePosts();
    alert('Đã lưu bài viết thành công!');
  }

  function deletePost(postId) {
    if (!confirm('Cô An có chắc chắn muốn xóa bài viết này không?')) return;
    let posts = window.AnNhienData.getPosts();
    posts = posts.filter(p => p.id !== postId);
    window.AnNhienData.savePosts(posts);
    renderPostsTab(document.getElementById('cms-tab-content'));
    if (window.renderLivePosts) window.renderLivePosts();
  }

  // --- TAB 2: ARTWORKS ---
  function renderArtworksTab(container) {
    const artworks = window.AnNhienData.getArtworks();
    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h4 class="text-lg font-black text-slate-900 dark:text-white">Quản Lý Kho Ảnh Nghệ Thuật AI (${artworks.length})</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400">Các bộ tranh Tâm An, Phật Giáo, Phong Cảnh và Chân Dung cô An đã sáng tác</p>
          </div>
          <button onclick="window.AnNhienCMS.showArtworkForm()" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow transition">
            <span>+ Thêm Bức Tranh Mới</span>
          </button>
        </div>

        <div id="cms-art-form-area" class="hidden"></div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          ${artworks.map(a => `
            <div class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm flex flex-col justify-between">
              <div class="aspect-[9/16] relative bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img src="${a.image}" class="w-full h-full object-cover" onerror="this.src='images/anh-01.jpg'">
                <span class="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-slate-950/70 text-amber-300 font-extrabold text-[10px] backdrop-blur-md">
                  ${a.category}
                </span>
              </div>
              <div class="p-3 space-y-1">
                <h5 class="font-bold text-xs text-slate-900 dark:text-white truncate">${a.title}</h5>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 italic">"${a.meaning}"</p>
              </div>
              <div class="p-3 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 mt-1">
                <button onclick="window.AnNhienCMS.showArtworkForm('${a.id}')" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Sửa</button>
                <button onclick="window.AnNhienCMS.deleteArtwork('${a.id}')" class="text-xs font-bold text-red-600 dark:text-red-400 hover:underline">Xóa</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function showArtworkForm(artId) {
    const area = document.getElementById('cms-art-form-area');
    if (!area) return;
    area.classList.remove('hidden');

    let art = null;
    if (artId) {
      const artworks = window.AnNhienData.getArtworks();
      art = artworks.find(a => a.id === artId);
    }

    area.innerHTML = `
      <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-amber-300 dark:border-amber-600 space-y-4 mb-6 shadow-md">
        <div class="flex items-center justify-between">
          <h5 class="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            ${art ? '✏️ Sửa Thông Tin Bức Tranh' : '✨ Thêm Bức Tranh Nghệ Thuật Mới'}
          </h5>
          <button onclick="document.getElementById('cms-art-form-area').classList.add('hidden')" class="text-xs text-slate-400 hover:text-slate-600">Đóng ✕</button>
        </div>
        <form onsubmit="event.preventDefault(); window.AnNhienCMS.saveArtwork('${artId || ''}');" class="space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tên bức tranh:</label>
              <input type="text" id="art-title" required value="${art ? art.title : ''}" placeholder="Ví dụ: Hương Trầm Mùa Thiền..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Chủ đề:</label>
              <select id="art-category" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
                <option value="Tâm An & Phật Giáo" ${art && art.category === 'Tâm An & Phật Giáo' ? 'selected' : ''}>Tâm An & Phật Giáo</option>
                <option value="Phong Cảnh Quê Hương" ${art && art.category === 'Phong Cảnh Quê Hương' ? 'selected' : ''}>Phong Cảnh Quê Hương</option>
                <option value="Chân Dung Truyền Cảm Hứng" ${art && art.category === 'Chân Dung Truyền Cảm Hứng' ? 'selected' : ''}>Chân Dung Truyền Cảm Hứng</option>
                <option value="Thư Pháp & Triết Lý" ${art && art.category === 'Thư Pháp & Triết Lý' ? 'selected' : ''}>Thư Pháp & Triết Lý</option>
                <option value="Phong Cảnh & Thiên Nhiên" ${art && art.category === 'Phong Cảnh & Thiên Nhiên' ? 'selected' : ''}>Phong Cảnh & Thiên Nhiên</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Đường dẫn file ảnh (Ví dụ: images/anh-01.jpg hoặc link web):</label>
            <input type="text" id="art-image" required value="${art ? art.image : 'images/anh-01.jpg'}" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Ý nghĩa bức tranh:</label>
            <input type="text" id="art-meaning" required value="${art ? art.meaning : ''}" placeholder="Ý nghĩa gửi gắm trong bức tranh..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Câu lệnh Prompt đã dùng để vẽ (để học viên copy):</label>
            <textarea id="art-prompt" rows="3" required placeholder="Prompt Midjourney hoặc DALL-E..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono">${art ? art.prompt : ''}</textarea>
          </div>
          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" onclick="document.getElementById('cms-art-form-area').classList.add('hidden')" class="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold">Hủy bỏ</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow">Lưu Tranh</button>
          </div>
        </form>
      </div>
    `;
    area.scrollIntoView({ behavior: 'smooth' });
  }

  function saveArtwork(artId) {
    const title = document.getElementById('art-title').value.trim();
    const category = document.getElementById('art-category').value;
    const image = document.getElementById('art-image').value.trim();
    const meaning = document.getElementById('art-meaning').value.trim();
    const prompt = document.getElementById('art-prompt').value.trim();

    let artworks = window.AnNhienData.getArtworks();

    if (artId) {
      artworks = artworks.map(a => a.id === artId ? {
        ...a,
        title, category, image, meaning, prompt
      } : a);
    } else {
      const newArt = {
        id: 'art-' + Date.now(),
        title,
        category,
        image,
        meaning,
        prompt,
        views: 100,
        tags: [category]
      };
      artworks.unshift(newArt);
    }

    window.AnNhienData.saveArtworks(artworks);
    renderArtworksTab(document.getElementById('cms-tab-content'));
    if (window.renderLiveArtworks) window.renderLiveArtworks();
    alert('Đã cập nhật kho tranh nghệ thuật thành công!');
  }

  function deleteArtwork(artId) {
    if (!confirm('Cô An có chắc muốn xóa bức tranh này khỏi bộ sưu tập?')) return;
    let artworks = window.AnNhienData.getArtworks();
    artworks = artworks.filter(a => a.id !== artId);
    window.AnNhienData.saveArtworks(artworks);
    renderArtworksTab(document.getElementById('cms-tab-content'));
    if (window.renderLiveArtworks) window.renderLiveArtworks();
  }

  // --- TAB 3: PROMPTS ---
  function renderPromptsTab(container) {
    const prompts = window.AnNhienData.getPrompts();
    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h4 class="text-lg font-black text-slate-900 dark:text-white">Quản Lý Thư Viện Prompt & Skill (${prompts.length})</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400">Các câu lệnh chuẩn cho công việc, tạo ảnh, làm thơ và nhạc</p>
          </div>
          <button onclick="window.AnNhienCMS.showPromptForm()" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow transition">
            <span>+ Thêm Prompt Mới</span>
          </button>
        </div>

        <div id="cms-prompt-form-area" class="hidden"></div>

        <div class="grid grid-cols-1 gap-3">
          ${prompts.map(p => `
            <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 uppercase">${p.category}</span>
                  <span class="text-xs text-slate-400">Khuyên dùng: ${p.model}</span>
                </div>
                <h5 class="font-bold text-sm text-slate-900 dark:text-white">${p.title}</h5>
                <p class="text-xs text-slate-500 dark:text-slate-400">${p.description}</p>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <button onclick="window.AnNhienCMS.showPromptForm('${p.id}')" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition">
                  ✏️ Sửa
                </button>
                <button onclick="window.AnNhienCMS.deletePrompt('${p.id}')" class="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold text-red-600 dark:text-red-400 transition">
                  🗑️ Xóa
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function showPromptForm(promptId) {
    const area = document.getElementById('cms-prompt-form-area');
    if (!area) return;
    area.classList.remove('hidden');

    let p = null;
    if (promptId) {
      const prompts = window.AnNhienData.getPrompts();
      p = prompts.find(item => item.id === promptId);
    }

    area.innerHTML = `
      <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-amber-300 dark:border-amber-600 space-y-4 mb-6 shadow-md">
        <div class="flex items-center justify-between">
          <h5 class="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            ${p ? '✏️ Sửa Câu Lệnh Prompt' : '✨ Thêm Câu Lệnh Prompt Mới'}
          </h5>
          <button onclick="document.getElementById('cms-prompt-form-area').classList.add('hidden')" class="text-xs text-slate-400 hover:text-slate-600">Đóng ✕</button>
        </div>
        <form onsubmit="event.preventDefault(); window.AnNhienCMS.savePrompt('${promptId || ''}');" class="space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tiêu đề Prompt:</label>
              <input type="text" id="p-title" required value="${p ? p.title : ''}" placeholder="Nhập tiêu đề câu lệnh..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Danh mục:</label>
              <select id="p-category" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
                <option value="Công Việc" ${p && p.category === 'Công Việc' ? 'selected' : ''}>Công Việc</option>
                <option value="Tạo Ảnh AI" ${p && p.category === 'Tạo Ảnh AI' ? 'selected' : ''}>Tạo Ảnh AI</option>
                <option value="Nội Dung" ${p && p.category === 'Nội Dung' ? 'selected' : ''}>Nội Dung</option>
                <option value="Âm Nhạc" ${p && p.category === 'Âm Nhạc' ? 'selected' : ''}>Âm Nhạc</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mô hình khuyên dùng:</label>
              <input type="text" id="p-model" value="${p ? p.model : 'ChatGPT / DeepSeek'}" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mô tả ngắn gọn ứng dụng:</label>
              <input type="text" id="p-desc" value="${p ? p.description : ''}" placeholder="Ứng dụng để làm gì..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nội dung câu lệnh (Prompt Template):</label>
            <textarea id="p-content" rows="6" required placeholder="Dán nội dung câu lệnh vào đây..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono">${p ? p.prompt : ''}</textarea>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Hướng dẫn sử dụng & thay thế:</label>
            <input type="text" id="p-guide" value="${p ? p.guide : ''}" placeholder="Cách thay đổi thông tin trong ngoặc..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
          </div>
          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" onclick="document.getElementById('cms-prompt-form-area').classList.add('hidden')" class="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold">Hủy bỏ</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow">Lưu Prompt</button>
          </div>
        </form>
      </div>
    `;
    area.scrollIntoView({ behavior: 'smooth' });
  }

  function savePrompt(promptId) {
    const title = document.getElementById('p-title').value.trim();
    const category = document.getElementById('p-category').value;
    const model = document.getElementById('p-model').value.trim();
    const description = document.getElementById('p-desc').value.trim();
    const prompt = document.getElementById('p-content').value.trim();
    const guide = document.getElementById('p-guide').value.trim();

    let prompts = window.AnNhienData.getPrompts();

    if (promptId) {
      prompts = prompts.map(item => item.id === promptId ? {
        ...item,
        title, category, model, description, prompt, guide
      } : item);
    } else {
      const newPrompt = {
        id: 'p-' + Date.now(),
        title, category, model, description, prompt, guide,
        tags: [category]
      };
      prompts.unshift(newPrompt);
    }

    window.AnNhienData.savePrompts(prompts);
    renderPromptsTab(document.getElementById('cms-tab-content'));
    if (window.renderLivePrompts) window.renderLivePrompts();
    alert('Đã lưu Prompt thành công!');
  }

  function deletePrompt(promptId) {
    if (!confirm('Xác nhận xóa câu lệnh này khỏi kho Prompt?')) return;
    let prompts = window.AnNhienData.getPrompts();
    prompts = prompts.filter(p => p.id !== promptId);
    window.AnNhienData.savePrompts(prompts);
    renderPromptsTab(document.getElementById('cms-tab-content'));
    if (window.renderLivePrompts) window.renderLivePrompts();
  }

  // --- TAB 4: VIDEOS ---
  function renderVideosTab(container) {
    const videos = window.AnNhienData.getVideos();
    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h4 class="text-lg font-black text-slate-900 dark:text-white">Quản Lý Video & MV YouTube (${videos.length})</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400">Kết nối các MV âm nhạc và video bài giảng từ kênh An Nhiên AI Music</p>
          </div>
          <button onclick="window.AnNhienCMS.showVideoForm()" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow transition">
            <span>+ Thêm Video YouTube</span>
          </button>
        </div>

        <div id="cms-video-form-area" class="hidden"></div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${videos.map(v => `
            <div class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm flex flex-col justify-between">
              <div class="aspect-video relative bg-slate-950">
                <iframe src="https://www.youtube.com/embed/${v.youtubeId}" class="w-full h-full border-0" allowfullscreen></iframe>
              </div>
              <div class="p-3 space-y-1">
                <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 uppercase">${v.category}</span>
                <h5 class="font-bold text-xs text-slate-900 dark:text-white truncate">${v.title}</h5>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">${v.description}</p>
              </div>
              <div class="p-3 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 mt-1">
                <button onclick="window.AnNhienCMS.showVideoForm('${v.id}')" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Sửa</button>
                <button onclick="window.AnNhienCMS.deleteVideo('${v.id}')" class="text-xs font-bold text-red-600 dark:text-red-400 hover:underline">Xóa</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function showVideoForm(videoId) {
    const area = document.getElementById('cms-video-form-area');
    if (!area) return;
    area.classList.remove('hidden');

    let v = null;
    if (videoId) {
      const videos = window.AnNhienData.getVideos();
      v = videos.find(item => item.id === videoId);
    }

    area.innerHTML = `
      <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-amber-300 dark:border-amber-600 space-y-4 mb-6 shadow-md">
        <div class="flex items-center justify-between">
          <h5 class="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            ${v ? '✏️ Sửa Video YouTube' : '✨ Thêm Video Mới'}
          </h5>
          <button onclick="document.getElementById('cms-video-form-area').classList.add('hidden')" class="text-xs text-slate-400 hover:text-slate-600">Đóng ✕</button>
        </div>
        <form onsubmit="event.preventDefault(); window.AnNhienCMS.saveVideo('${videoId || ''}');" class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tiêu đề Video:</label>
            <input type="text" id="v-title" required value="${v ? v.title : ''}" placeholder="Nhập tiêu đề video..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Link YouTube hoặc Mã Video (ID):</label>
              <input type="text" id="v-yt-id" required value="${v ? (v.url || v.youtubeId) : ''}" placeholder="Dán link youtube hoặc ID..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Thể loại:</label>
              <select id="v-category" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
                <option value="MV Âm Nhạc" ${v && v.category === 'MV Âm Nhạc' ? 'selected' : ''}>MV Âm Nhạc</option>
                <option value="Hướng Dẫn Học AI" ${v && v.category === 'Hướng Dẫn Học AI' ? 'selected' : ''}>Hướng Dẫn Học AI</option>
                <option value="Triển Lãm Nghệ Thuật" ${v && v.category === 'Triển Lãm Nghệ Thuật' ? 'selected' : ''}>Triển Lãm Nghệ Thuật</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mô tả video:</label>
            <textarea id="v-desc" rows="2" placeholder="Mô tả nội dung video..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">${v ? v.description : ''}</textarea>
          </div>
          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" onclick="document.getElementById('cms-video-form-area').classList.add('hidden')" class="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold">Hủy bỏ</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow">Lưu Video</button>
          </div>
        </form>
      </div>
    `;
    area.scrollIntoView({ behavior: 'smooth' });
  }

  function parseYouTubeId(input) {
    if (!input) return '';
    input = input.trim();
    if (input.includes('v=')) return input.split('v=')[1].substring(0, 11);
    if (input.includes('youtu.be/')) return input.split('youtu.be/')[1].substring(0, 11);
    if (input.includes('/shorts/')) return input.split('/shorts/')[1].substring(0, 11);
    if (input.includes('/embed/')) return input.split('/embed/')[1].substring(0, 11);
    return input.length === 11 ? input : 'inpok4MKVLM';
  }

  function saveVideo(videoId) {
    const title = document.getElementById('v-title').value.trim();
    const rawUrl = document.getElementById('v-yt-id').value.trim();
    const category = document.getElementById('v-category').value;
    const description = document.getElementById('v-desc').value.trim();
    const youtubeId = parseYouTubeId(rawUrl);

    let videos = window.AnNhienData.getVideos();

    if (videoId) {
      videos = videos.map(item => item.id === videoId ? {
        ...item,
        title, youtubeId, url: `https://www.youtube.com/watch?v=${youtubeId}`, category, description
      } : item);
    } else {
      const newVideo = {
        id: 'v-' + Date.now(),
        title,
        youtubeId,
        url: `https://www.youtube.com/watch?v=${youtubeId}`,
        category,
        description,
        duration: 'Video'
      };
      videos.unshift(newVideo);
    }

    window.AnNhienData.saveVideos(videos);
    renderVideosTab(document.getElementById('cms-tab-content'));
    if (window.renderLiveVideos) window.renderLiveVideos();
    alert('Đã cập nhật video YouTube thành công!');
  }

  function deleteVideo(videoId) {
    if (!confirm('Xóa video này khỏi danh sách?')) return;
    let videos = window.AnNhienData.getVideos();
    videos = videos.filter(v => v.id !== videoId);
    window.AnNhienData.saveVideos(videos);
    renderVideosTab(document.getElementById('cms-tab-content'));
    if (window.renderLiveVideos) window.renderLiveVideos();
  }

  // --- TAB 5: REGISTRATIONS & ART REQUESTS ---
  function renderRegistrationsTab(container) {
    const regs = window.AnNhienData.getRegistrations();
    const artReqs = window.AnNhienData.getArtRequests();

    container.innerHTML = `
      <div class="space-y-8">
        <!-- Student Registrations -->
        <div class="space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 class="text-base font-black text-slate-900 dark:text-white">Danh Sách Đăng Ký Học AI (${regs.length})</h4>
              <p class="text-xs text-slate-500">Khách hàng và học viên gửi form quan tâm khóa học</p>
            </div>
            ${regs.length > 0 ? `
              <button onclick="window.AnNhienCMS.exportCSV('registrations')" class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs">
                📥 Tải File Excel/CSV
              </button>
            ` : ''}
          </div>

          ${regs.length === 0 ? `
            <div class="p-6 text-center text-xs text-slate-400 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              Chưa có học viên nào gửi đăng ký mới.
            </div>
          ` : `
            <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th class="p-3">Thời Gian</th>
                    <th class="p-3">Họ Tên</th>
                    <th class="p-3">Số Điện Thoại / Zalo</th>
                    <th class="p-3">Khóa Học Quan Tâm</th>
                    <th class="p-3">Lời Nhắn</th>
                    <th class="p-3 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  ${regs.map(r => `
                    <tr>
                      <td class="p-3 whitespace-nowrap text-slate-400 font-medium">${r.createdAt}</td>
                      <td class="p-3 font-bold text-slate-900 dark:text-white">${r.fullName}</td>
                      <td class="p-3 font-semibold text-emerald-600 dark:text-emerald-400">
                        <a href="https://zalo.me/${r.phone}" target="_blank" class="hover:underline">${r.phone}</a>
                      </td>
                      <td class="p-3 font-medium text-slate-700 dark:text-slate-300">${r.course || 'Tư vấn chung'}</td>
                      <td class="p-3 text-slate-500 max-w-xs truncate">${r.note || '—'}</td>
                      <td class="p-3 text-right">
                        <button onclick="window.AnNhienCMS.deleteReg('${r.id}')" class="text-red-500 hover:underline">Xóa</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- Art Requests -->
        <div class="space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 class="text-base font-black text-slate-900 dark:text-white">Yêu Cầu Thiết Kế Tranh Theo Mẫu (${artReqs.length})</h4>
              <p class="text-xs text-slate-500">Khách hàng đặt vẽ chân dung nghệ thuật, tranh tâm an hoặc phục dựng ảnh</p>
            </div>
          </div>

          ${artReqs.length === 0 ? `
            <div class="p-6 text-center text-xs text-slate-400 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              Chưa có yêu cầu đặt vẽ tranh nào.
            </div>
          ` : `
            <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th class="p-3">Thời Gian</th>
                    <th class="p-3">Khách Hàng</th>
                    <th class="p-3">Số Zalo</th>
                    <th class="p-3">Thể Loại Tranh</th>
                    <th class="p-3">Mô Tả Chi Tiết</th>
                    <th class="p-3 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  ${artReqs.map(ar => `
                    <tr>
                      <td class="p-3 whitespace-nowrap text-slate-400 font-medium">${ar.createdAt}</td>
                      <td class="p-3 font-bold text-slate-900 dark:text-white">${ar.fullName}</td>
                      <td class="p-3 font-semibold text-emerald-600 dark:text-emerald-400">
                        <a href="https://zalo.me/${ar.phone}" target="_blank" class="hover:underline">${ar.phone}</a>
                      </td>
                      <td class="p-3 font-medium text-slate-700 dark:text-slate-300">${ar.style}</td>
                      <td class="p-3 text-slate-500 max-w-xs truncate">${ar.details}</td>
                      <td class="p-3 text-right">
                        <button onclick="window.AnNhienCMS.deleteArtReq('${ar.id}')" class="text-red-500 hover:underline">Xóa</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;
  }

  function deleteReg(id) {
    if (!confirm('Xóa học viên này khỏi danh sách?')) return;
    window.AnNhienData.deleteRegistration(id);
    renderRegistrationsTab(document.getElementById('cms-tab-content'));
  }

  function deleteArtReq(id) {
    if (!confirm('Xóa yêu cầu đặt tranh này?')) return;
    window.AnNhienData.deleteArtRequest(id);
    renderRegistrationsTab(document.getElementById('cms-tab-content'));
  }

  function exportCSV(type) {
    const list = window.AnNhienData.getRegistrations();
    if (list.length === 0) return alert('Không có dữ liệu để xuất!');

    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "Thời Gian,Họ Tên,Số Điện Thoại,Email,Khóa Học,Lời Nhắn\n";

    list.forEach(r => {
      csvContent += `"${r.createdAt}","${r.fullName}","${r.phone}","${r.email || ''}","${r.course || ''}","${(r.note || '').replace(/"/g, '""')}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Danh_Sach_Hoc_Vien_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // --- TAB 6: SETTINGS & BACKUP ---
  function renderSettingsTab(container) {
    const brand = window.AnNhienData.getBrand();
    container.innerHTML = `
      <div class="space-y-8 max-w-3xl">
        <!-- Brand Settings -->
        <div class="space-y-4">
          <h4 class="text-base font-black text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
            Thông Tin Thương Hiệu Cá Nhân
          </h4>
          <form onsubmit="event.preventDefault(); window.AnNhienCMS.saveBrandSettings();" class="space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tên tác giả:</label>
                <input type="text" id="set-name" value="${brand.name}" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tên thương hiệu:</label>
                <input type="text" id="set-brandname" value="${brand.brandName}" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Thông điệp cốt lõi (Slogan):</label>
              <input type="text" id="set-tagline" value="${brand.tagline}" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Số Hotline / Zalo:</label>
                <input type="text" id="set-phone" value="${brand.phone}" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Kênh YouTube:</label>
                <input type="text" id="set-yt" value="${brand.youtube}" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Lời tự sự giới thiệu bản thân:</label>
              <textarea id="set-bio" rows="4" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm leading-relaxed">${brand.bio}</textarea>
            </div>
            <div class="text-right">
              <button type="submit" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow">
                Lưu Thay Đổi Thương Hiệu
              </button>
            </div>
          </form>
        </div>

        <!-- PIN Settings -->
        <div class="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h4 class="text-base font-black text-slate-900 dark:text-white">Đổi Mã PIN Quản Trị</h4>
          <form onsubmit="event.preventDefault(); window.AnNhienCMS.changePin();" class="space-y-3 max-w-sm">
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mã PIN mới (4-8 số):</label>
              <input type="password" id="set-new-pin" maxlength="10" placeholder="Nhập PIN mới..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
            </div>
            <button type="submit" class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider">
              Cập Nhật Mã PIN
            </button>
          </form>
        </div>

        <!-- Backup & Restore -->
        <div class="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h4 class="text-base font-black text-slate-900 dark:text-white">Sao Lưu & Khôi Phục Dữ Liệu An Toàn</h4>
          <p class="text-xs text-slate-500">Cô An có thể tải file sao lưu về máy tính để bảo toàn toàn bộ bài viết, ảnh, prompt và học viên đã lưu.</p>
          
          <div class="flex flex-wrap items-center gap-3">
            <button onclick="window.AnNhienCMS.downloadBackup()" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow">
              <span>💾 Tải File Sao Lưu Dự Phòng (.json)</span>
            </button>

            <label class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer border border-slate-300 dark:border-slate-700">
              <span>📥 Khôi Phục Từ File Backup</span>
              <input type="file" id="cms-import-file" accept=".json" class="hidden" onchange="window.AnNhienCMS.handleFileRestore(event)">
            </label>

            <button onclick="window.AnNhienCMS.resetToFactory()" class="px-4 py-2.5 rounded-xl border border-red-300 dark:border-red-900 text-red-600 hover:bg-red-50 text-xs font-bold">
              ⚠️ Khôi phục về dữ liệu gốc
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function saveBrandSettings() {
    const brand = window.AnNhienData.getBrand();
    brand.name = document.getElementById('set-name').value.trim();
    brand.brandName = document.getElementById('set-brandname').value.trim();
    brand.tagline = document.getElementById('set-tagline').value.trim();
    brand.phone = document.getElementById('set-phone').value.trim();
    brand.zalo = `https://zalo.me/${brand.phone.replace(/[^0-9]/g, '')}`;
    brand.youtube = document.getElementById('set-yt').value.trim();
    brand.bio = document.getElementById('set-bio').value.trim();

    window.AnNhienData.saveBrand(brand);
    alert('Đã cập nhật thông tin thương hiệu thành công! Trang web sẽ tự động áp dụng.');
    location.reload();
  }

  function changePin() {
    const newPin = document.getElementById('set-new-pin').value.trim();
    if (!newPin || newPin.length < 4) {
      return alert('Vui lòng nhập mã PIN có ít nhất 4 ký tự!');
    }
    window.AnNhienData.setAdminPin(newPin);
    alert('Đổi mã PIN thành công! Hãy ghi nhớ mã PIN mới này nhé.');
  }

  function downloadBackup() {
    const json = window.AnNhienData.exportBackupJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AnNhienAI_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleFileRestore(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      const res = window.AnNhienData.importBackupJSON(evt.target.result);
      if (res.success) {
        alert('Khôi phục dữ liệu thành công! Trang web sẽ làm mới để cập nhật nội dung.');
        location.reload();
      } else {
        alert(res.message);
      }
    };
    reader.readAsText(file);
  }

  function resetToFactory() {
    if (!confirm('Hành động này sẽ đưa trang web về dữ liệu bài viết và tranh ban đầu. Cô An có chắc chắn không?')) return;
    window.AnNhienData.resetToDefault();
    alert('Đã khôi phục về cài đặt ban đầu!');
    location.reload();
  }

  return {
    init,
    open: openCMS,
    close: closeCMS,
    verifyPin,
    switchTab,
    showPostForm,
    savePost,
    deletePost,
    showArtworkForm,
    saveArtwork,
    deleteArtwork,
    showPromptForm,
    savePrompt,
    deletePrompt,
    showVideoForm,
    saveVideo,
    deleteVideo,
    deleteReg,
    deleteArtReq,
    exportCSV,
    saveBrandSettings,
    changePin,
    downloadBackup,
    handleFileRestore,
    resetToFactory
  };
})();

// Auto initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.AnNhienCMS.init);
} else {
  window.AnNhienCMS.init();
}
