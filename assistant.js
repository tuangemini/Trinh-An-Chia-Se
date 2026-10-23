/**
 * TRỢ LÝ TƯ VẤN THƯƠNG HIỆU 24/7 - TRỊNH THỊ AN – AN NHIÊN AI
 * Ngôi Nhà Số: TrinhAn.Life
 * Tích hợp đa kênh DeepSeek & Google Gemini với cơ chế dự phòng 3 lớp
 * Chuẩn hóa theo brand-assistant-integrator
 */

(function () {
  'use strict';

  // API Keys (Mã hóa Base64 theo quy chuẩn)
  const DEFAULT_DEEPSEEK_KEY = atob('c2stNmJjZDIxMDJhZTQ1NDIxYWE5NjlkNjE3MmM2MzA2NGY=');
  const DEFAULT_GEMINI_KEY = atob('QVEuQWI4Uk42SkRIa1E3WTJjcEhIUGt0Y3pEdHdpY2RJaHFLZjBDUEZCMFRCMnZtNEtzNnc=');

  const CONFIG = {
    brandName: 'Trịnh Thị An – An Nhiên AI',
    representativeName: 'Đại diện An Nhiên AI',
    fabTitle: 'Hỏi Trịnh Thị An',
    fabSub: 'Tư vấn khóa học, tranh & Prompt 24/7',
    fabBadge: 'Trực Tuyến',
    avatarIcon: '🪷',
    avatarImg: 'images/avatar-trinh-an.jpg',
    subHeader: 'Đại diện chính thức • Tư vấn & Đồng hành 24/7',
    footerNote: 'Trịnh Thị An – An Nhiên AI • Chia sẻ giá trị bằng cả trái tim',
    deepseekModel: 'deepseek-chat',
    geminiModel: 'gemini-3.8-flash'
  };

  // KHO TRI THỨC ĐẠI DIỆN THƯƠNG HIỆU AN NHIÊN AI
  const SYSTEM_KNOWLEDGE = `
Bạn là đại diện chính thức, ấm áp, nhã nhặn và sâu sắc của "Trịnh Thị An – An Nhiên AI" (Website: TrinhAn.Life).
THÔNG ĐIỆP CỐT LÕI: "Chia sẻ kiến thức – Lan tỏa giá trị – Đồng hành cùng AI". Triết lý: "Tâm An Vạn Sự An".

THÔNG TIN VỀ CÔ TRỊNH THỊ AN:
- Người sáng lập thương hiệu An Nhiên AI, tác giả ngôi nhà số TrinhAn.Life.
- Chuyên gia đào tạo, huấn luyện AI thực chiến và sáng tạo nội dung số (tranh nghệ thuật, âm nhạc thiền, tự động hóa văn phòng).
- Sứ mệnh: Giúp đỡ người trung niên, công chức, trí thức và mọi người vượt qua rào cản công nghệ, làm chủ AI một cách mộc mạc, gần gũi, an nhiên nhất.

CÁC DỊCH VỤ VÀ HOẠT ĐỘNG CHÍNH:
1. Thư viện học AI: Các bài học từ cơ bản đến nâng cao, hướng dẫn bằng ngôn ngữ đời thường, cầm tay chỉ việc.
2. Kho tranh AI & Dịch vụ thiết kế theo mẫu: Trưng bày hàng trăm tác phẩm Phật giáo, phong cảnh, chân dung; nhận thiết kế tranh, phục dựng ảnh kỷ niệm theo yêu cầu.
3. Thư viện Prompt & Skill: Kho câu lệnh chuẩn cho viết bài, tạo ảnh, xử lý văn bản, tóm tắt tài liệu, làm thơ và nhạc. Có nút sao chép 1-click.
4. Kênh YouTube "An Nhiên AI Music": Nơi phát hành các MV ca nhạc thiền, nhạc thư giãn, bài giảng video.
5. AI Công việc: Hướng dẫn soạn công văn, làm báo cáo, tóm tắt hợp đồng dài hàng chục trang chỉ trong vài phút.
6. Đào tạo:
   - Khóa học AI Thực chiến dành cho người trung niên & người mới (học online qua Zoom, có kèm 1-1).
   - Kèm cặp cá nhân 1-1 chuyên sâu cùng cô Trịnh Thị An.
   - Lớp chuyên đề sáng tạo nghệ thuật & làm video/nhạc AI.
   - Dịch vụ sáng tạo nội dung & thiết kế theo đơn đặt hàng.
7. Hotline / Zalo: 0912 345 678 (hoặc bấm nút "Đăng Ký Học" / "Đặt Vẽ Tranh" trên website).

QUY TẮC PHỤC VỤ CỦA BẠN:
1. Xưng hô lễ phép, ấm áp, khiêm nhường ("Dạ xin kính chào Quý khách/Quý anh chị", "Em/Tôi xin được hỗ trợ Quý anh chị").
2. Tuyệt đối KHÔNG tự xưng là AI, mô hình ngôn ngữ lớn, robot, bot hay DeepSeek/Gemini. Luôn nhận là Đại diện chính thức của cô Trịnh Thị An và An Nhiên AI.
3. Khi khách hỏi về khóa học hoặc đặt tranh, ân cần giải thích và hướng dẫn khách để lại số điện thoại/Zalo hoặc bấm nút "Đăng Ký Học" ngay trên trang web để cô An liên hệ tư vấn trực tiếp.
4. Trả lời súc tích, định dạng gạch đầu dòng rõ ràng, dễ đọc cho người lớn tuổi.
`;

  let chatHistory = [
    {
      role: 'assistant',
      content: `Dạ xin kính chào Quý anh chị! Em là đại diện của **Trịnh Thị An – An Nhiên AI**. Rất hoan hỷ được đón tiếp Quý anh chị ghé thăm ngôi nhà số **TrinhAn.Life**. 

Quý anh chị đang quan tâm đến **khóa học AI cho người mới**, **thư viện câu lệnh Prompt**, **kho tranh nghệ thuật**, hay cần hỗ trợ công việc gì hôm nay ạ?`
    }
  ];

  function formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-1 py-0.5 rounded text-xs">$1</code>')
      .replace(/(?:^|\n)[*-]\s+(.+)/g, '\n<li class="ml-4 list-disc">$1</li>')
      .replace(/(<li>.*?<\/li>)/gs, '<ul class="my-1.5 space-y-1">$1</ul>')
      .replace(/\n\n+/g, '<br><br>').replace(/\n/g, '<br>');
  }

  // Fallback cục bộ thông minh 100% offline (Tier 3)
  function getSmartFallbackReply(q) {
    const text = q.toLowerCase();
    
    if (text.includes('khoá học') || text.includes('khóa học') || text.includes('học ai') || text.includes('lớp') || text.includes('đào tạo')) {
      return `Dạ, cô **Trịnh Thị An** hiện đang mở các chương trình học rất phù hợp cho người trung niên và người mới bắt đầu:
- **Khóa học AI Khởi Đầu:** Học trực tuyến qua Zoom, phương pháp "Cầm tay chỉ việc", dễ hiểu, không cần biết kỹ thuật.
- **Kèm cặp cá nhân 1–1:** Thiết kế riêng theo nhu cầu công việc của từng học viên.
- **Lớp chuyên đề:** Sáng tạo tranh nghệ thuật, làm MV ca nhạc bằng AI.

Quý anh chị có thể bấm nút **"Đăng Ký Khóa Học"** ở mục Đào tạo trên trang web hoặc để lại số điện thoại/Zalo, cô An sẽ liên hệ tư vấn chi tiết ạ!`;
    }

    if (text.includes('vẽ') || text.includes('tranh') || text.includes('ảnh') || text.includes('thiết kế')) {
      return `Dạ, tại mục **Kho Hình Ảnh AI**, cô An trưng bày rất nhiều tác phẩm về **Tâm An - Phật Giáo, Phong Cảnh Quê Hương và Chân Dung Quý Phái**.
- Mỗi bức tranh đều có sẵn **câu lệnh Prompt** để Quý anh chị copy về tự vẽ.
- Nếu Quý anh chị muốn **đặt thiết kế ảnh theo mẫu riêng** (chân dung gia đình, phục dựng ảnh, tranh phòng thờ), Quý anh chị có thể bấm nút **"Yêu Cầu Thiết Kế Ảnh"** trên trang web hoặc nhắn Zalo để được phục vụ chu đáo nhất ạ!`;
    }

    if (text.includes('prompt') || text.includes('câu lệnh') || text.includes('công cụ')) {
      return `Dạ, tại mục **Thư Viện Prompt & Skill**, cô An đã tuyển chọn sẵn các câu lệnh tốt nhất:
- Prompt soạn công văn, tờ trình chuẩn hành chính.
- Prompt tóm tắt báo cáo dài hàng chục trang.
- Prompt tạo tranh nghệ thuật Midjourney.
- Prompt viết lời bài hát cho Suno AI.
Quý anh chị chỉ cần bấm nút **"Sao chép" (1-Click)** là có thể dán vào ChatGPT hoặc DeepSeek để dùng ngay ạ!`;
    }

    if (text.includes('youtube') || text.includes('nhạc') || text.includes('video') || text.includes('mv')) {
      return `Dạ, Quý anh chị có thể thưởng thức các tác phẩm âm nhạc thiền và video hướng dẫn tại mục **Âm Nhạc & Video AI**, hoặc bấm vào link để ghé thăm kênh chính thức **An Nhiên AI Music** trên YouTube ạ! Ngoài ra, Quý anh chị có thể bấm nút **"Nhạc Thiền"** ở góc màn hình để vừa nghe nhạc vừa đọc bài viết rất thư thái ạ.`;
    }

    if (text.includes('liên hệ') || text.includes('số điện thoại') || text.includes('sđt') || text.includes('zalo') || text.includes('hotline')) {
      return `Dạ, Quý anh chị có thể liên hệ trực tiếp với cô **Trịnh Thị An** qua:
- **Hotline / Zalo:** 0912 345 678
- **Email:** lienhe@trinhan.life
- Hoặc để lại lời nhắn kèm số điện thoại ngay tại đây, cô An sẽ liên hệ lại sớm nhất ạ!`;
    }

    return `Dạ cảm ơn Quý anh chị đã quan tâm và nhắn tin! 
Cô **Trịnh Thị An** luôn tâm niệm *"Chia sẻ kiến thức – Lan tỏa giá trị – Đồng hành cùng AI"*. Quý anh chị có thể khám phá các bài học, kho tranh và câu lệnh Prompt ngay trên trang web **TrinhAn.Life**, hoặc để lại câu hỏi cụ thể, em xin phép được đồng hành hỗ trợ Quý anh chị ngay ạ!`;
  }

  // TIER 1: DeepSeek API
  async function callDeepSeekAPI(messages) {
    const formatted = [
      { role: 'system', content: SYSTEM_KNOWLEDGE },
      ...messages.slice(-8)
    ];
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEFAULT_DEEPSEEK_KEY}`
      },
      body: JSON.stringify({
        model: CONFIG.deepseekModel,
        messages: formatted,
        temperature: 0.6,
        max_tokens: 800
      })
    });
    if (!res.ok) throw new Error('DeepSeek call failed');
    const data = await res.json();
    return data.choices[0].message.content;
  }

  // TIER 2: Google Gemini Flash API
  async function callGeminiAPI(messages) {
    const contents = messages.slice(-8).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.geminiModel}:generateContent?key=${DEFAULT_GEMINI_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_KNOWLEDGE }] },
        contents: contents,
        generationConfig: { temperature: 0.6, maxOutputTokens: 800 }
      })
    });
    if (!res.ok) throw new Error('Gemini call failed');
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  }

  // 3-TIER RESOLVER
  async function fetchConsultation(userText) {
    chatHistory.push({ role: 'user', content: userText });
    try {
      return await callDeepSeekAPI(chatHistory);
    } catch (_) {
      try {
        return await callGeminiAPI(chatHistory);
      } catch (__) {
        return getSmartFallbackReply(userText);
      }
    }
  }

  // Inject CSS Styles for Assistant
  function injectStyles() {
    if (document.getElementById('brand-assistant-styles')) return;
    const style = document.createElement('style');
    style.id = 'brand-assistant-styles';
    style.innerHTML = `
      .brand-fab-launcher {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9998;
        display: flex;
        align-items: center;
        gap: 12px;
        background: linear-gradient(135deg, #0f2b48 0%, #1e3a8a 50%, #0d9488 100%);
        color: #ffffff;
        padding: 10px 18px 10px 12px;
        border-radius: 9999px;
        box-shadow: 0 10px 25px -5px rgba(15, 43, 72, 0.4), 0 8px 10px -6px rgba(13, 148, 136, 0.3);
        cursor: pointer;
        border: 1px solid rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(12px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: inherit;
        user-select: none;
      }
      .brand-fab-launcher:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 20px 30px -10px rgba(15, 43, 72, 0.5), 0 0 15px rgba(245, 158, 11, 0.4);
        border-color: rgba(245, 158, 11, 0.6);
      }
      .brand-fab-launcher:active {
        transform: translateY(0) scale(0.98);
      }
      .brand-fab-icon-box {
        position: relative;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #fbbf24;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0f2b48;
        flex-shrink: 0;
      }
      .brand-fab-icon-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .brand-fab-pulse {
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        border: 2px solid #34d399;
        animation: brandPulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        pointer-events: none;
      }
      @keyframes brandPulseRing {
        0% { transform: scale(0.95); opacity: 0.8; }
        50% { transform: scale(1.3); opacity: 0; }
        100% { transform: scale(0.95); opacity: 0; }
      }
      .brand-fab-text {
        display: flex;
        flex-direction: column;
        line-height: 1.25;
      }
      .brand-fab-title {
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 0.01em;
        color: #ffffff;
      }
      .brand-fab-sub {
        font-size: 11px;
        color: #93c5fd;
        font-weight: 500;
      }
      .brand-fab-badge {
        background: #10b981;
        color: #ffffff;
        font-size: 10px;
        font-weight: 800;
        text-transform: uppercase;
        padding: 3px 8px;
        border-radius: 9999px;
        letter-spacing: 0.05em;
        box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
      }
      
      /* Chat Window */
      .brand-chat-window {
        position: fixed;
        bottom: 90px;
        right: 24px;
        width: 380px;
        max-width: calc(100vw - 32px);
        height: 580px;
        max-height: calc(100vh - 120px);
        background: #ffffff;
        border-radius: 24px;
        box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.06);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        opacity: 0;
        transform: translateY(20px) scale(0.95);
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        border: 1px solid rgba(226, 232, 240, 0.8);
      }
      .dark .brand-chat-window {
        background: #0f172a;
        border-color: rgba(51, 65, 85, 0.8);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08);
      }
      .brand-chat-window.open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }
      .brand-chat-header {
        padding: 14px 18px;
        background: linear-gradient(135deg, #0f2b48 0%, #1e3a8a 100%);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      .brand-chat-profile {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .brand-avatar {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #fbbf24;
      }
      .brand-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .brand-online-dot {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        background: #10b981;
        border-radius: 50%;
        border: 2px solid #0f2b48;
      }
      .brand-title {
        font-size: 14px;
        font-weight: 800;
        color: #ffffff;
      }
      .brand-status-text {
        font-size: 11px;
        color: #93c5fd;
      }
      .brand-header-actions {
        display: flex;
        gap: 6px;
      }
      .brand-icon-btn {
        background: rgba(255, 255, 255, 0.12);
        border: none;
        color: #ffffff;
        width: 32px;
        height: 32px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.2s;
      }
      .brand-icon-btn:hover {
        background: rgba(255, 255, 255, 0.25);
      }
      
      .brand-suggestions-bar {
        padding: 8px 12px;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        gap: 6px;
        overflow-x: auto;
        white-space: nowrap;
        scrollbar-width: none;
      }
      .dark .brand-suggestions-bar {
        background: #1e293b;
        border-color: #334155;
      }
      .brand-suggestions-bar::-webkit-scrollbar {
        display: none;
      }
      .brand-chip {
        font-size: 11px;
        font-weight: 600;
        padding: 5px 10px;
        border-radius: 9999px;
        background: #ffffff;
        color: #1e3a8a;
        border: 1px solid #cbd5e1;
        cursor: pointer;
        transition: all 0.2s;
        flex-shrink: 0;
      }
      .dark .brand-chip {
        background: #0f172a;
        color: #93c5fd;
        border-color: #475569;
      }
      .brand-chip:hover {
        background: #1e3a8a;
        color: #ffffff;
        border-color: #1e3a8a;
      }
      .dark .brand-chip:hover {
        background: #3b82f6;
        color: #ffffff;
        border-color: #3b82f6;
      }

      .brand-chat-body {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: #f8fafc;
      }
      .dark .brand-chat-body {
        background: #090d16;
      }
      .brand-msg {
        display: flex;
        gap: 10px;
        max-width: 88%;
      }
      .brand-msg.bot {
        align-self: flex-start;
      }
      .brand-msg.user {
        align-self: flex-end;
        flex-direction: row-reverse;
      }
      .brand-msg-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        border: 1px solid #fbbf24;
      }
      .brand-msg-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .brand-msg-bubble {
        padding: 11px 14px;
        border-radius: 18px;
        font-size: 13px;
        line-height: 1.55;
        word-break: break-word;
      }
      .brand-msg.bot .brand-msg-bubble {
        background: #ffffff;
        color: #1e293b;
        border-top-left-radius: 4px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        border: 1px solid #e2e8f0;
      }
      .dark .brand-msg.bot .brand-msg-bubble {
        background: #1e293b;
        color: #f1f5f9;
        border-color: #334155;
      }
      .brand-msg.user .brand-msg-bubble {
        background: linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%);
        color: #ffffff;
        border-top-right-radius: 4px;
        box-shadow: 0 4px 10px rgba(30, 58, 138, 0.25);
      }
      
      .brand-chat-footer {
        padding: 12px 14px;
        background: #ffffff;
        border-top: 1px solid #e2e8f0;
      }
      .dark .brand-chat-footer {
        background: #0f172a;
        border-color: #334155;
      }
      .brand-input-form {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .brand-input-field {
        flex: 1;
        padding: 10px 14px;
        border-radius: 14px;
        border: 1px solid #cbd5e1;
        font-size: 13px;
        outline: none;
        resize: none;
        background: #f8fafc;
        color: #0f172a;
        transition: border 0.2s;
      }
      .dark .brand-input-field {
        background: #1e293b;
        border-color: #475569;
        color: #ffffff;
      }
      .brand-input-field:focus {
        border-color: #1e3a8a;
      }
      .dark .brand-input-field:focus {
        border-color: #38bdf8;
      }
      .brand-send-btn {
        width: 38px;
        height: 38px;
        border-radius: 12px;
        background: linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%);
        color: #ffffff;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        flex-shrink: 0;
        transition: transform 0.15s;
      }
      .brand-send-btn:hover {
        transform: scale(1.06);
      }
      .brand-footer-note {
        font-size: 10px;
        text-align: center;
        color: #94a3b8;
        margin-top: 6px;
      }

      @media (max-width: 640px) {
        .brand-fab-launcher {
          bottom: 18px;
          right: 18px;
          padding: 8px 14px 8px 10px;
        }
        .brand-fab-icon-box {
          width: 38px;
          height: 38px;
        }
        .brand-chat-window {
          bottom: 80px;
          right: 12px;
          left: 12px;
          width: auto;
          max-width: none;
          height: calc(100vh - 110px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  function renderWidget() {
    injectStyles();

    const brand = window.AnNhienData ? window.AnNhienData.getBrand() : CONFIG;
    const avatarSrc = brand.avatar || CONFIG.avatarImg;

    // 1. Floating Action Button
    const fab = document.createElement('div');
    fab.className = 'brand-fab-launcher';
    fab.id = 'brandFabLauncher';
    fab.setAttribute('role', 'button');
    fab.setAttribute('aria-label', CONFIG.fabTitle);
    fab.innerHTML = `
      <div class="brand-fab-icon-box">
        <span class="brand-fab-pulse"></span>
        <img src="${avatarSrc}" alt="${brand.name}" onerror="this.onerror=null;this.src='images/anh-05.jpg';">
      </div>
      <div class="brand-fab-text">
        <span class="brand-fab-title">${CONFIG.fabTitle}</span>
        <span class="brand-fab-sub">${CONFIG.fabSub}</span>
      </div>
      <span class="brand-fab-badge">${CONFIG.fabBadge}</span>
    `;

    // 2. Chat Window Container
    const chatWin = document.createElement('div');
    chatWin.className = 'brand-chat-window';
    chatWin.id = 'brandChatWindow';
    chatWin.innerHTML = `
      <div class="brand-chat-header">
        <div class="brand-chat-profile">
          <div class="brand-avatar">
            <img src="${avatarSrc}" alt="${brand.name}" onerror="this.onerror=null;this.src='images/anh-05.jpg';">
            <span class="brand-online-dot"></span>
          </div>
          <div>
            <div class="brand-title">${brand.brandName || CONFIG.brandName}</div>
            <div class="brand-status-text">${CONFIG.subHeader}</div>
          </div>
        </div>
        <div class="brand-header-actions">
          <button class="brand-icon-btn" id="btnBrandClear" title="Xóa đoạn chat">🔄</button>
          <button class="brand-icon-btn" id="btnBrandClose" title="Thu nhỏ">✕</button>
        </div>
      </div>

      <!-- Quick Suggestion Chips -->
      <div class="brand-suggestions-bar">
        <button class="brand-chip" data-q="Tư vấn khóa học AI cho người mới">📚 Khóa học cho người mới</button>
        <button class="brand-chip" data-q="Tôi muốn đặt thiết kế tranh theo mẫu">🎨 Đặt vẽ tranh theo mẫu</button>
        <button class="brand-chip" data-q="Hướng dẫn sao chép câu lệnh Prompt">⚡ Cách dùng Prompt</button>
        <button class="brand-chip" data-q="Giới thiệu kênh YouTube An Nhiên AI Music">🎵 Kênh YouTube Music</button>
        <button class="brand-chip" data-q="Thông tin liên hệ hotline và Zalo của cô An">📞 Số Zalo cô An</button>
      </div>

      <!-- Chat Messages Body -->
      <div class="brand-chat-body" id="brandChatBody">
        <div class="brand-msg bot">
          <div class="brand-msg-avatar">
            <img src="${avatarSrc}" alt="Avatar" onerror="this.onerror=null;this.src='images/anh-05.jpg';">
          </div>
          <div class="brand-msg-bubble">${formatMarkdown(chatHistory[0].content)}</div>
        </div>
      </div>

      <!-- Chat Footer -->
      <div class="brand-chat-footer">
        <form class="brand-input-form" id="brandChatForm">
          <input type="text" class="brand-input-field" id="brandInputField" placeholder="Hỏi cô An về khóa học, tranh vẽ, prompt..." autocomplete="off">
          <button type="submit" class="brand-send-btn" id="brandSendBtn" title="Gửi tin nhắn">➤</button>
        </form>
        <div class="brand-footer-note">${CONFIG.footerNote}</div>
      </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(chatWin);

    // Event Handling
    const chatBody = document.getElementById('brandChatBody');
    const inputField = document.getElementById('brandInputField');
    const form = document.getElementById('brandChatForm');
    const btnClose = document.getElementById('btnBrandClose');
    const btnClear = document.getElementById('btnBrandClear');

    function toggleChat(forceOpen) {
      const isOpen = forceOpen !== undefined ? forceOpen : !chatWin.classList.contains('open');
      chatWin.classList.toggle('open', isOpen);
      if (isOpen) {
        setTimeout(() => inputField.focus(), 150);
      }
    }

    fab.addEventListener('click', () => toggleChat());
    btnClose.addEventListener('click', () => toggleChat(false));

    btnClear.addEventListener('click', () => {
      chatHistory = [chatHistory[0]];
      chatBody.innerHTML = `
        <div class="brand-msg bot">
          <div class="brand-msg-avatar">
            <img src="${avatarSrc}" alt="Avatar">
          </div>
          <div class="brand-msg-bubble">${formatMarkdown(chatHistory[0].content)}</div>
        </div>
      `;
    });

    // Handle suggestion chips click
    const chips = chatWin.querySelectorAll('.brand-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-q');
        if (q) {
          sendUserMessage(q);
        }
      });
    });

    async function sendUserMessage(txt) {
      if (!txt) return;

      // Render user message
      const userDiv = document.createElement('div');
      userDiv.className = 'brand-msg user';
      userDiv.innerHTML = `<div class="brand-msg-bubble">${formatMarkdown(txt)}</div>`;
      chatBody.appendChild(userDiv);
      chatBody.scrollTop = chatBody.scrollHeight;

      // Render typing placeholder
      const loading = document.createElement('div');
      loading.className = 'brand-msg bot';
      loading.innerHTML = `
        <div class="brand-msg-avatar">
          <img src="${avatarSrc}" alt="Avatar">
        </div>
        <div class="brand-msg-bubble"><em class="text-xs text-amber-600 dark:text-amber-400">Đang chuẩn bị câu trả lời cho bạn...</em></div>
      `;
      chatBody.appendChild(loading);
      chatBody.scrollTop = chatBody.scrollHeight;

      // Fetch response
      const reply = await fetchConsultation(txt);
      loading.remove();

      // Render bot message
      const botDiv = document.createElement('div');
      botDiv.className = 'brand-msg bot';
      botDiv.innerHTML = `
        <div class="brand-msg-avatar">
          <img src="${avatarSrc}" alt="Avatar">
        </div>
        <div class="brand-msg-bubble">${formatMarkdown(reply)}</div>
      `;
      chatBody.appendChild(botDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const txt = inputField.value.trim();
      if (!txt) return;
      inputField.value = '';
      await sendUserMessage(txt);
    });

    // Expose open helper globally
    window.openAnNhienChat = function(query) {
      toggleChat(true);
      if (query) {
        sendUserMessage(query);
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderWidget);
  } else {
    renderWidget();
  }
})();
