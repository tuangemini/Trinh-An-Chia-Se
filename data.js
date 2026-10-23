/**
 * TRỊNH THỊ AN – AN NHIÊN AI
 * Ngôi Nhà Số: TrinhAn.Life
 * "Chia sẻ kiến thức – Lan tỏa giá trị – Đồng hành cùng AI"
 * Data Storage & State Management System
 */

const STORAGE_KEYS = {
  BRAND: 'trinhan_brand_info',
  POSTS: 'trinhan_blog_posts',
  ARTWORKS: 'trinhan_artworks',
  PROMPTS: 'trinhan_prompts',
  VIDEOS: 'trinhan_videos',
  WORK_GUIDES: 'trinhan_work_guides',
  COURSES: 'trinhan_courses',
  STORIES: 'trinhan_stories',
  REGISTRATIONS: 'trinhan_registrations',
  ART_REQUESTS: 'trinhan_art_requests',
  ADMIN_PIN: 'trinhan_admin_pin',
  THEME: 'trinhan_theme'
};

const DEFAULT_BRAND = {
  name: "Trịnh Thị An",
  brandName: "TRỊNH THỊ AN – AN NHIÊN AI",
  shortTitle: "An Nhiên AI",
  tagline: "Chia sẻ kiến thức – Lan tỏa giá trị – Đồng hành cùng AI",
  philosophy: "Tâm An Vạn Sự An",
  domain: "trinhan.life",
  avatar: "images/avatar-trinh-an.jpg",
  role: "Nhà Sáng Tạo Nội Dung & Huấn Luyện AI Thực Chiến",
  phone: "0834 133 344",
  zalo: "https://zalo.me/0834133344",
  email: "lienhe@trinhan.life",
  youtube: "https://www.youtube.com/@AnNhienAIMusic",
  youtubeChannelName: "An Nhiên AI Music",
  facebook: "https://facebook.com",
  adminPin: "1979",
  bio: "Chào bạn, tôi là Trịnh Thị An. Ở độ tuổi mà nhiều người nghĩ công nghệ là rào cản, tôi đã tìm thấy trong AI một người bạn đồng hành kỳ diệu để sáng tạo nghệ thuật, tối ưu hóa công việc và lan tỏa những giá trị bình an. Sứ mệnh của tôi là đồng hành cùng những người trung niên, trí thức và mọi người làm chủ Trí tuệ Nhân tạo một cách mộc mạc, gần gũi và hiệu quả nhất."
};

const DEFAULT_ARTWORKS = [
  {
    id: "art-1",
    title: "Tâm Tĩnh Như Đài Sen",
    category: "Tâm An & Phật Giáo",
    image: "images/anh-01.jpg",
    prompt: "Serene Buddha meditating on a radiant golden lotus in misty ancient forest, celestial sunbeams, ethereal atmosphere, tranquil composition, 8k --ar 9:16 --v 6.0",
    meaning: "Giữ tâm tĩnh lặng giữa dòng đời biến chuyển, như đóa sen ngát hương vươn lên từ bùn lầy.",
    views: 1840,
    tags: ["Tâm An", "Hoa Sen", "Thiền"]
  },
  {
    id: "art-2",
    title: "Hương Trầm Mùa Thiền",
    category: "Tâm An & Thiền Định",
    image: "images/anh-02.jpg",
    prompt: "Zen meditation sanctuary, delicate fragrant smoke curling from bronze burner, warm bamboo lamp, Japanese minimalist tea room, tranquil atmosphere --ar 9:16",
    meaning: "Một tách trà thơm, một nén hương trầm, lắng nghe từng hơi thở để tìm về chính mình.",
    views: 1420,
    tags: ["Hương Trầm", "Tĩnh Lặng", "Bình Yên"]
  },
  {
    id: "art-3",
    title: "Ánh Sáng Giác Ngộ",
    category: "Tâm An & Phật Giáo",
    image: "images/anh-03.jpg",
    prompt: "Majestic Bodhi tree with luminous golden aura, floating lotus petals, celestial twilight, spiritual awakening, cinematic lighting --ar 9:16",
    meaning: "Trí tuệ soi sáng bóng tối vô minh, mở ra con đường sống an vui và tự tại.",
    views: 2150,
    tags: ["Giác Ngộ", "Ánh Sáng", "Trí Tuệ"]
  },
  {
    id: "art-4",
    title: "Nắng Sớm Làng Sen",
    category: "Phong Cảnh Quê Hương",
    image: "images/anh-04.jpg",
    prompt: "Peaceful Vietnamese countryside at dawn, blooming lotus lake, wooden rowing boat, mist rising above still water, nostalgic watercolor --ar 9:16",
    meaning: "Vẻ đẹp mộc mạc thân thương của quê hương, gợi nhớ miền ký ức tuổi thơ trong trẻo.",
    views: 1690,
    tags: ["Làng Sen", "Quê Hương", "Bình Dị"]
  },
  {
    id: "art-5",
    title: "Nụ Cười An Nhiên",
    category: "Chân Dung Truyền Cảm Hứng",
    image: "images/anh-05.jpg",
    prompt: "Portrait of an elegant mature Vietnamese woman in traditional silk attire, gentle graceful smile, tranquil garden background, soft natural lighting --ar 9:16",
    meaning: "Vẻ đẹp của sự từng trải, bao dung và nụ cười rạng rỡ từ một tâm hồn an lạc.",
    views: 2430,
    tags: ["Chân Dung", "An Nhiên", "Phụ Nữ"]
  },
  {
    id: "art-6",
    title: "Suối Nguồn Bình An",
    category: "Phong Cảnh & Thiên Nhiên",
    image: "images/anh-06.jpg",
    prompt: "Crystal clear mountain stream trickling through moss-covered rocks, lush bamboo groves, soft emerald lighting, soothing zen mood --ar 9:16",
    meaning: "Nước chảy đá mòn, thuận theo tự nhiên mà uốn lượn, cuộc đời cũng thong dong như nước.",
    views: 1310,
    tags: ["Suối Nguồn", "Thiên Nhiên", "Thư Thái"]
  },
  {
    id: "art-7",
    title: "Thư Pháp Tâm An Vạn Sự An",
    category: "Thư Pháp & Triết Lý",
    image: "images/anh-07.jpg",
    prompt: "Vietnamese calligraphy art 'Tâm An Vạn Sự An' with golden leaf accents on vintage handmade parchment, ink wash painting --ar 9:16",
    meaning: "Khi tâm ta bình an thì vạn sự quanh ta đều trở nên hòa hợp, hanh thông.",
    views: 3200,
    tags: ["Thư Pháp", "Châm Ngôn", "Triết Lý"]
  },
  {
    id: "art-8",
    title: "Ngọn Đèn Tuệ Giác",
    category: "Tâm An & Trí Tuệ",
    image: "images/anh-08.jpg",
    prompt: "Traditional paper lantern glowing warmly in dark night, illuminating ancient wisdom books, cozy reflective study room, soft golden bokeh --ar 9:16",
    meaning: "Ngọn đèn trí tuệ thắp sáng nội tâm, giúp ta vững vàng trước mọi giông bão cuộc đời.",
    views: 1780,
    tags: ["Đèn Tuệ", "Học Tập", "Soi Sáng"]
  },
  {
    id: "art-9",
    title: "Mùa Vàng No Ấm",
    category: "Phong Cảnh Quê Hương",
    image: "images/anh-09.jpg",
    prompt: "Spectacular golden rice terraces under sunset sky, soaring birds, rolling mountain mist, northern Vietnam highland majesty --ar 9:16",
    meaning: "Mùa gặt trĩu hạt là thành quả ngọt ngào của sự cần lao, kiên nhẫn và lòng biết ơn đất trời.",
    views: 2890,
    tags: ["Ruộng Bậc Thang", "Mùa Vàng", "Bội Thu"]
  }
];

const DEFAULT_POSTS = [
  {
    id: "post-1",
    title: "Hướng Dẫn Người Trung Niên Bắt Đầu Với Trí Tuệ Nhân Tạo (AI) Trong 15 Phút",
    category: "Thư Viện Học AI",
    level: "Cơ Bản Cho Người Mới",
    date: "2026-10-20",
    readTime: "7 phút đọc",
    coverImage: "images/anh-08.jpg",
    excerpt: "Nhiều người nghĩ AI là thứ gì đó cao siêu của giới trẻ và dân công nghệ. Nhưng thực ra, AI giống như một người trợ lý cần mẫn và lịch thiệp, bạn chỉ cần biết cách trò chuyện mộc mạc.",
    content: `### Chào bạn, tôi là Trịnh Thị An

Khi bước qua tuổi 45, tôi cũng từng mang trong mình nỗi e dè lớn trước thế giới công nghệ luôn đổi thay chóng mặt. Tôi tự hỏi: *"Liệu ở tuổi này mình có thể học được trí tuệ nhân tạo không? Liệu nó có quá phức tạp đối với mình?"*

Và hôm nay, khi đã tự tay sáng tác hàng nghìn tác phẩm nghệ thuật, sản xuất các MV âm nhạc và tự động hóa toàn bộ công việc văn phòng bằng AI, tôi có thể khẳng định với bạn: **AI không hề khó, chỉ là bạn chưa có người đồng hành chỉ dẫn bằng ngôn ngữ gần gũi nhất!**

---

### Bước 1: Hiểu đúng về AI – Người trợ lý mộc mạc

Đừng coi AI là máy móc phức tạp. Hãy tưởng tượng AI (như ChatGPT, Gemini hay DeepSeek) giống như một **người thư ký riêng vô cùng thông thái và kiên nhẫn**:
- Người thư ký này đọc hàng triệu cuốn sách trên thế giới.
- Bạn hỏi bất cứ điều gì, người thư ký sẽ trả lời ngay lập tức.
- Bạn nhờ viết một lá thư, một bản báo cáo, hoặc sửa bài phát biểu, người ấy làm chỉ trong 3 giây.
- Đặc biệt, người ấy **không bao giờ cáu giận hay mệt mỏi**, sẵn sàng sửa đi sửa lại theo đúng ý bạn!

---

### Bước 2: 3 Công cụ AI miễn phí tốt nhất hiện nay

1. **ChatGPT (OpenAI):** Rất giỏi trò chuyện, viết văn bản, làm thơ, tóm tắt bài viết. Giao diện tiếng Việt cực kỳ mượt mà.
2. **DeepSeek:** Trợ lý thông minh với khả năng suy luận logic xuất sắc, hiểu sâu sắc văn hóa và ngữ cảnh tiếng Việt.
3. **Google Gemini:** Kết nối trực tiếp với tìm kiếm Google, hỗ trợ cập nhật tin tức mới nhất và xử lý hình ảnh nhanh chóng.

---

### Bước 3: Cách bắt đầu ngay trên điện thoại

Bạn không cần máy tính xịn. Chỉ cần chiếc điện thoại thông minh bạn đang dùng:
1. Mở trình duyệt (Safari hoặc Chrome) vào trang web [chatgpt.com](https://chatgpt.com).
2. Đăng nhập bằng tài khoản Gmail bạn có sẵn.
3. Gõ vào ô trò chuyện như nhắn tin cho người bạn: *"Chào bạn, tôi là người trung niên muốn học cách làm thơ và viết lời chúc mừng sinh nhật, hãy hướng dẫn tôi nhé!"*

Chỉ sau vài giây, bạn sẽ nhận được câu trả lời tận tình. Hãy đón đọc bài tiếp theo của tôi về **"Công thức 5 bước đặt câu lệnh chuẩn xác"** để làm chủ trợ lý này nhé!`
  },
  {
    id: "post-2",
    title: "Công Thức 5 Bước Đặt Câu Lệnh (Prompt) Chuẩn Xác: Biến AI Thành Trợ Lý Xuất Sắc",
    category: "Thư Viện Học AI",
    level: "Thực Chiến",
    date: "2026-10-18",
    readTime: "8 phút đọc",
    coverImage: "images/anh-05.jpg",
    excerpt: "Chất lượng câu trả lời của AI phụ thuộc hoàn toàn vào cách bạn đặt câu hỏi. Khám phá công thức 5 chữ vàng giúp bạn yêu cầu bất cứ điều gì AI cũng hiểu đúng 100%.",
    content: `### Tại sao AI trả lời không đúng ý bạn?

Nhiều anh chị học viên thường than thở với An: *"Cô An ơi, sao tôi bảo AI viết cho tôi bài văn hay tóm tắt văn bản mà nó viết chung chung, sáo rỗng quá?"*

Nguyên nhân rất đơn giản: **Bạn hỏi chung chung thì AI sẽ trả lời chung chung.** 

Hãy nhớ nguyên lý: **"Rác vào thì Rác ra - Vàng vào thì Vàng ra"**. Để nhận được kết quả xuất sắc, An đúc kết cho các anh chị **Công Thức 5 Bước (R-C-T-F-E)**:

---

### Công thức 5 Bước Đặt Lệnh Chuẩn Xác:

1. **Vai trò (Role):** Bạn muốn AI đóng vai ai? (Luật sư, nhà giáo, chuyên gia văn phòng, nhà thơ...)
   * *Ví dụ: "Bạn là một chuyên gia hành chính văn phòng có 20 năm kinh nghiệm soạn thảo công văn."*
2. **Bối cảnh (Context):** Tình huống cụ thể của bạn là gì?
   * *Ví dụ: "Tôi chuẩn bị tổ chức buổi lễ tri ân các thầy cô giáo nhân ngày 20/11 cho cựu học sinh khóa 1990."*
3. **Nhiệm vụ cụ thể (Task):** Bạn cần AI làm gì?
   * *Ví dụ: "Hãy viết một bài phát biểu dài 500 từ ấm áp, xúc động, tri ân sâu sắc công ơn dưỡng dục."*
4. **Định dạng kết quả (Format):** Trình bày như thế nào?
   * *Ví dụ: "Chia thành 3 phần: Mở đầu, Thân bài gợi nhớ kỷ niệm phấn trắng bảng đen, và Lời chúc sức khỏe."*
5. **Ví dụ hoặc Giọng điệu (Tone / Examples):** Giọng văn ấm áp, chân thành, trang trọng hay hài hước?
   * *Ví dụ: "Giọng điệu chân tình, sâu lắng, mang âm hưởng triết lý nhân sinh, không dùng từ ngữ sáo rỗng."*

---

### Mẫu câu lệnh hoàn chỉnh để bạn copy dùng ngay:

> *"Bạn là chuyên gia tư vấn văn hóa ứng xử và ngôn từ. Hãy giúp tôi viết một tin nhắn cảm ơn sâu sắc gửi tới người bạn lâu năm vừa giúp đỡ gia đình tôi trong lúc khó khăn. Giọng văn chân thành, khiêm nhường, đầy ân tình của người từng trải. Độ dài khoảng 150 chữ."*

Hãy thử áp dụng ngay hôm nay, bạn sẽ ngạc nhiên trước sự thông minh vượt bậc của người trợ lý này!`
  },
  {
    id: "post-3",
    title: "Ứng Dụng AI Soạn Thảo Công Văn, Tóm Tắt Tài Liệu & Xử Lý Báo Cáo Siêu Tốc",
    category: "AI Công Việc",
    level: "Ứng Dụng Văn Phòng",
    date: "2026-10-15",
    readTime: "6 phút đọc",
    coverImage: "images/anh-07.jpg",
    excerpt: "Tiết kiệm 80% thời gian làm việc hành chính mỗi ngày. Cách dùng AI rà soát lỗi chính tả, tóm tắt tập hồ sơ 100 trang và lập bảng kế hoạch công việc chuẩn mực.",
    content: `### Giải phóng sức lao động trong công việc hành chính

Công việc giấy tờ, soạn thảo báo cáo, tổng kết số liệu và biên bản cuộc họp thường chiếm rất nhiều thời gian và năng lượng của các cán bộ, công chức, và nhân viên văn phòng.

Với AI, bạn có thể biến 4 giờ làm việc mệt mỏi thành **15 phút kiểm tra và hoàn thiện nhẹ nhàng**:

---

### 4 Ứng dụng thực tế nhất:

#### 1. Tóm tắt tài liệu và nghị định dài hàng chục trang
Chỉ cần tải file PDF hoặc sao chép văn bản vào ChatGPT / DeepSeek kèm lệnh:
> *"Hãy đọc văn bản sau và tóm tắt thành 5 điểm chính cốt lõi nhất. Trình bày dưới dạng gạch đầu dòng rõ ràng, nêu rõ quyền lợi và nghĩa vụ của các bên liên quan."*

#### 2. Soạn thảo tờ trình, thông báo nội bộ
Không cần ngồi nghĩ câu chữ từ đầu:
> *"Hãy soạn giúp tôi một Thông Báo về việc lịch nghỉ Tết Nguyên Đán gửi toàn thể cán bộ nhân viên, yêu cầu kiểm tra an toàn phòng cháy chữa cháy trước khi về quê, bàn giao công việc chu đáo. Giọng điệu chuẩn mực hành chính nhà nước."*

#### 3. Chuyển đổi dữ liệu thô thành bảng biểu Excel
Copy danh sách lộn xộn và yêu cầu:
> *"Hãy sắp xếp danh sách khách hàng sau thành bảng có các cột: Họ tên, Số điện thoại, Đơn vị công tác, Trạng thái liên hệ. Sắp xếp theo thứ tự bảng chữ cái ABC."*

#### 4. Trợ lý rà soát lỗi văn bản và gợi ý từ ngữ đắt giá
Trước khi gửi thư quan trọng, hãy bảo AI:
> *"Hãy kiểm tra lỗi chính tả, ngữ pháp và tinh chỉnh lại các câu văn trong đoạn sau để trở nên lịch thiệp, trang nhã hơn nhưng vẫn giữ nguyên ý nghĩa cốt lõi."*

Hãy để công nghệ gánh vác phần việc nặng nhọc, để tâm trí bạn được an nhiên tập trung vào những quyết định quan trọng!`
  },
  {
    id: "post-4",
    title: "Hành Trình Sáng Tạo Âm Nhạc & MV Thiền Ca Cùng Kênh An Nhiên AI Music",
    category: "Âm Nhạc & Video AI",
    level: "Sáng Tạo Nghệ Thuật",
    date: "2026-10-12",
    readTime: "9 phút đọc",
    coverImage: "images/anh-01.jpg",
    excerpt: "Tôi chưa từng học trường nhạc, nhưng với sự trợ giúp của AI Suno và Runway, tôi đã có thể phổ nhạc cho những vần thơ của mình và làm nên những MV ca nhạc chạm đến trái tim người nghe.",
    content: `### Âm nhạc là liệu pháp chữa lành tâm hồn

Từ thuở nhỏ, tôi luôn ấp ủ ước mơ được ngân nga những giai điệu dịu êm, được biến những vần thơ chiêm nghiệm cuộc đời thành bài hát. Nhưng rào cản nhạc lý, hòa âm phối khí và phòng thu đắt đỏ từng khiến ước mơ ấy nằm sâu trong ngăn kéo.

Cho đến khi Trí tuệ Nhân tạo bùng nổ, cánh cửa ấy đã mở toang!

---

### Kênh YouTube "An Nhiên AI Music" ra đời như thế nào?

Kênh YouTube **An Nhiên AI Music** là ngôi nhà nơi tôi gửi gắm những giai điệu thiền tịnh, những bản nhạc không lời thư giãn, những ca khúc về tình mẹ, tình quê hương và triết lý sống an lành:
1. **Sáng tác lời:** Tôi tự tay viết những vần thơ sâu lắng, hoặc dùng AI trợ giúp tìm những vần điệu mượt mà.
2. **Hòa âm phối khí bằng Suno AI & Udio:** Lựa chọn thể loại nhạc Thiền (Zen ambient), Acoustic mộc mạc hay Dân gian đương đại.
3. **Tạo hình ảnh và video chuyển động:** Sử dụng Midjourney để vẽ nên khung cảnh sen ngát, làng quê bình yên và dùng Runway AI để tạo chuyển động sống động.

Kết quả là những tác phẩm âm nhạc trọn vẹn, chân thực, mang năng lượng an lành đã chạm đến hàng vạn khán giả trên YouTube!

---

### Bạn cũng hoàn toàn có thể làm được!

Trong khóa học chuyên đề của mình, tôi sẽ hướng dẫn các bạn:
- Cách viết lời bài hát giàu hình tượng.
- Cách sử dụng các câu lệnh tạo nhạc chuẩn phong cách yêu thích.
- Cách làm video ngắn cho con cháu, gia đình hoặc xây dựng kênh YouTube mang dấu ấn cá nhân.

Hãy ghé thăm và đăng ký kênh **An Nhiên AI Music** để cùng lắng nghe những thanh âm bình an nhé!`
  },
  {
    id: "post-5",
    title: "Tâm An Thì Vạn Sự An: Nuôi Dưỡng Năng Lượng Tích Cực Giữa Đời Thường",
    category: "Góc Sống Đẹp",
    level: "Triết Lý Sống",
    date: "2026-10-08",
    readTime: "5 phút đọc",
    coverImage: "images/anh-02.jpg",
    excerpt: "Bình an không phải là một nơi không có giông bão hay không có lo toan. Bình an là ngay giữa những ồn ào ấy, ta vẫn giữ được sự tĩnh tại trong tim.",
    content: `### Lắng đọng cùng Trịnh Thị An

Cuộc sống hiện đại luôn cuộn chảy với tốc độ chóng mặt. Những lo toan cơm áo gạo tiền, sức khỏe, con cái và các mối quan hệ xã hội đôi lúc khiến chúng ta kiệt sức và cảm thấy bất an.

Đã bao lâu rồi bạn chưa ngồi lại, nhấp một ngụm trà ấm và lắng nghe nhịp thở của chính mình?

---

### 3 Bài học giữ tâm an mà An luôn thực hành mỗi ngày:

1. **Biết ơn những điều giản dị:**
   Mỗi buổi sớm thức dậy, hãy biết ơn vì mình còn một ngày nữa để yêu thương, để hít thở bầu không khí trong lành, để nhìn thấy nụ cười của người thân. Lòng biết ơn là cánh cửa mở ra sự đủ đầy.
2. **Buông bỏ những điều không thể kiểm soát:**
   Ta không thể kiểm soát thời tiết, không thể kiểm soát suy nghĩ của người khác, nhưng ta hoàn toàn kiểm soát được thái độ sống của chính mình. Hãy mỉm cười và đón nhận mọi sự như một bài học.
3. **Học tập không ngừng để làm mới tâm hồn:**
   Khi ta học một điều mới – như học cách vẽ một bức tranh bằng AI, học cách lắng nghe một bản nhạc thiền – tâm trí ta sẽ được tưới mát, trẻ trung và tràn đầy hứng khởi.

> *"Tâm bình thế giới bình. Tâm an vạn sự an. Hãy đối xử tử tế với chính mình, bởi bạn xứng đáng có được sự an yên trọn vẹn nhất trong cuộc đời này."*`
  }
];

const DEFAULT_PROMPTS = [
  {
    id: "p-1",
    title: "Soạn Thảo Công Văn & Tờ Trình Chuẩn Thể Thức Hành Chính",
    category: "Công Việc",
    model: "ChatGPT / DeepSeek",
    tags: ["Hành chính", "Công văn", "Văn phòng"],
    description: "Tạo văn bản theo đúng quy chuẩn hành chính nhà nước, câu từ trang trọng, chặt chẽ.",
    prompt: `Bạn là chuyên gia quản trị văn phòng và chuyên viên soạn thảo văn bản hành chính với hơn 15 năm kinh nghiệm.
Hãy soạn thảo một [TÊN VĂN BẢN: ví dụ Tờ Trình / Thông Báo / Biên Bản] về nội dung: [MÔ TẢ CÔNG VIỆC CỤ THỂ].
Yêu cầu:
1. Thể thức văn bản chuẩn chỉnh (Quốc hiệu, Tiêu ngữ, Tên cơ quan, Số/Ký hiệu, Trích yếu nội dung).
2. Kết cấu rõ ràng gồm: Căn cứ pháp lý, Tình hình thực tế, Nội dung đề xuất/thông báo chi tiết, và Tổ chức thực hiện.
3. Ngôn ngữ chính xác, trang trọng, văn phong hành chính nhà nước mực thước, không dùng từ sáo rỗng.`,
    guide: "Thay đổi phần trong ngoặc vuông [TÊN VĂN BẢN] và [MÔ TẢ CÔNG VIỆC CỤ THỂ] trước khi gửi cho AI."
  },
  {
    id: "p-2",
    title: "Tóm Tắt Hồ Sơ & Báo Cáo Dài Thành Bản Tóm Lược 1 Trang",
    category: "Công Việc",
    model: "DeepSeek / ChatGPT",
    tags: ["Tóm tắt", "Báo cáo", "Tiết kiệm thời gian"],
    description: "Trích xuất cốt lõi từ các tài liệu dài hàng chục trang thành bản tóm tắt súc tích, dễ nhớ.",
    prompt: `Bạn là trợ lý phân tích dữ liệu và thư ký điều hành cấp cao.
Dưới đây là nội dung tài liệu:
"""
[DÁN NỘI DUNG TÀI LIỆU HOẶC VĂN BẢN VÀO ĐÂY]
"""
Hãy phân tích và tóm tắt thành một bản báo cáo ngắn gọn gói gọn trong 1 trang theo cấu trúc:
1. Mục tiêu và Bản chất cốt lõi của văn bản (tối đa 3 câu).
2. 5 Điểm quan trọng nhất cần lưu ý (dạng gạch đầu dòng ngắn gọn).
3. Các con số, thời hạn (Deadline) và trách nhiệm cụ thể của các bên.
4. Kiến nghị hoặc hành động cần triển khai ngay.`,
    guide: "Rất phù hợp khi cần đọc nhanh các nghị định, hồ sơ dự án hoặc hợp đồng nhiều trang."
  },
  {
    id: "p-3",
    title: "Tạo Chân Dung Nghệ Thuật Áo Dài Quý Phái & Thanh Lịch",
    category: "Tạo Ảnh AI",
    model: "Midjourney v6 / Fooocus / DALL-E 3",
    tags: ["Midjourney", "Áo Dài", "Chân Dung", "Nghệ Thuật"],
    description: "Vẽ chân dung phụ nữ Việt Nam trung niên trong tà áo dài truyền thống sang trọng, quý phái.",
    prompt: `A graceful and elegant mature Vietnamese woman, age 50, dignified and serene expression with a warm gentle smile. Wearing an exquisite silk navy blue traditional Ao Dai with subtle floral gold embroidery. Standing in a peaceful ancient courtyard with soft morning sunlight, blooming lotus pond in background. Ultra-realistic, cinematic lighting, 8k resolution, shot on 85mm f/1.4 lens, natural skin texture, masterpiece --ar 9:16 --v 6.0`,
    guide: "Dán câu lệnh này vào Midjourney hoặc Fooocus để tạo ra bức ảnh chân dung tuyệt đẹp."
  },
  {
    id: "p-4",
    title: "Vẽ Tranh Phật Giáo & Thiền Định Tâm An Tỏa Ánh Sáng Vàng",
    category: "Tạo Ảnh AI",
    model: "Midjourney v6 / DALL-E 3",
    tags: ["Phật Giáo", "Tâm An", "Hoa Sen", "Ánh Sáng"],
    description: "Sáng tạo tác phẩm tranh tâm linh thanh tịnh, mang lại cảm giác bình yên và thư thái.",
    prompt: `Luminous serene Buddha in meditation pose, floating on an ethereal glowing golden lotus flower above tranquil clear water. Subtle sacred halo radiance, delicate misty morning rays, ancient bamboo trees in distant background, peaceful spiritual atmosphere, transcendent aesthetic, 8k, ultra-detailed --ar 9:16 --v 6.0`,
    guide: "Có thể đổi màu hoa sen (white lotus, pink lotus) hoặc bối cảnh theo ý thích."
  },
  {
    id: "p-5",
    title: "Sáng Tác Thơ Thiền & Danh Ngôn Nuôi Dưỡng Tâm Hồn",
    category: "Nội Dung",
    model: "ChatGPT / DeepSeek",
    tags: ["Thơ ca", "Thiền", "Tâm hồn", "Sống đẹp"],
    description: "Sáng tác các bài thơ 7 chữ hoặc lục bát sâu lắng về lòng biết ơn và sự an yên.",
    prompt: `Bạn là một nhà thơ thiền sư có tâm hồn sâu sắc và am hiểu triết lý nhân sinh phương Đông.
Hãy sáng tác một bài thơ [THỂ LOẠI: Thất ngôn tứ tuyệt / Lục bát] về chủ đề: [CHỦ ĐỀ: ví dụ Lòng biết ơn cuộc đời / Bình an tuổi xế chiều / Mẹ hiền / Đóa sen đầu hạ].
Yêu cầu:
- Vần điệu chuẩn xác, niêm luật êm ái, đọc lên nghe thanh thoát.
- Hình tượng mộc mạc, gần gũi với thiên nhiên (trăng, hoa, sương sớm, tiếng chuông chùa).
- Mang thông điệp tích cực, an ủi tâm hồn và gieo mầm năng lượng bình an.`,
    guide: "Dùng để đăng Facebook kèm tranh hoặc làm quà tặng bạn bè rất ý nghĩa."
  },
  {
    id: "p-6",
    title: "Viết Lời Bài Hát Ballad / Thiền Ca Tạo Nhạc Bằng Suno AI",
    category: "Âm Nhạc",
    model: "Suno AI / Udio / ChatGPT",
    tags: ["Suno AI", "Lời bài hát", "Thiền Ca", "Nhạc trữ tình"],
    description: "Cấu trúc lời bài hát chuẩn chỉnh (Verse, Chorus, Bridge) để nạp thẳng vào Suno AI.",
    prompt: `Hãy viết lời cho một ca khúc mang phong cách [THỂ LOẠI: Thiền ca Acoustic / Ballad Trữ Tình Việt Nam] về chủ đề [CHỦ ĐỀ: Tìm về chốn bình yên sau bao năm bôn ba].
Cấu trúc chuẩn của Suno AI:
[Intro - Tiếng sáo trúc và đàn tranh mộc mạc]
[Verse 1] (4 câu ngắn, nhịp điệu chậm rãi)
[Verse 2] (4 câu phát triển cảm xúc)
[Chorus] (Điệp khúc cao trào, ca từ sâu sắc, giai điệu da diết dễ nhớ)
[Bridge] (Đoạn lắng đọng chiêm nghiệm)
[Chorus] (Lặp lại điệp khúc với cảm xúc bùng nổ)
[Outro] (Tiếng chuông ngân xa dần)
Yêu cầu: Ca từ giàu chất thơ, thuần Việt, không dùng từ sáo rỗng.`,
    guide: "Sau khi tạo lời xong, copy toàn bộ vào ô 'Custom Lyrics' của Suno.com để sinh ra bài hát hoàn chỉnh!"
  }
];

const DEFAULT_VIDEOS = [
  {
    id: "v-1",
    title: "MV Thiền Ca: Tâm An Vạn Sự An | An Nhiên AI Music",
    youtubeId: "inpok4MKVLM",
    url: "https://www.youtube.com/watch?v=inpok4MKVLM",
    category: "MV Âm Nhạc",
    duration: "4:15",
    description: "Tác phẩm âm nhạc thiền tịnh, kết hợp tiếng sáo trúc du dương và hình ảnh hoa sen thanh khiết được sáng tạo hoàn toàn bằng AI."
  },
  {
    id: "v-2",
    title: "Cẩm Nang 10 Phút: Hướng Dẫn Người Trung Niên Làm Quen Với AI",
    youtubeId: "inpok4MKVLM",
    url: "https://www.youtube.com/watch?v=inpok4MKVLM",
    category: "Hướng Dẫn Học AI",
    duration: "10:30",
    description: "Video cầm tay chỉ việc từ cô Trịnh Thị An giúp các cô chú, anh chị tự tin mở và trò chuyện với trợ lý AI ngay trên điện thoại."
  },
  {
    id: "v-3",
    title: "Hành Trình Sáng Tạo 1.000 Bức Tranh Nghệ Thuật Bằng Midjourney",
    youtubeId: "inpok4MKVLM",
    url: "https://www.youtube.com/watch?v=inpok4MKVLM",
    category: "Triển Lãm Nghệ Thuật",
    duration: "6:45",
    description: "Chiêm ngưỡng bộ sưu tập tranh Phật giáo, phong cảnh quê hương và bí quyết viết câu lệnh nghệ thuật của An Nhiên AI."
  }
];

const DEFAULT_WORK_GUIDES = [
  {
    id: "wg-1",
    title: "Soạn Thảo Công Văn, Tờ Trình & Thư Từ Chuyên Nghiệp",
    time: "Tiết kiệm 80% thời gian",
    icon: "FileText",
    desc: "Không còn cảnh thức khuya tìm mẫu công văn. AI giúp bạn tạo lập văn bản chuẩn mực thể thức hành chính chỉ trong 2 phút."
  },
  {
    id: "wg-2",
    title: "Tóm Tắt & Rà Soát Tài Liệu, Hồ Sơ Dài Hàng Trăm Trang",
    time: "Đọc nhanh gấp 10 lần",
    icon: "Search",
    desc: "Trích xuất những điểm mấu chốt, chỉ tiêu tài chính, thời hạn quan trọng và cảnh báo rủi ro từ các bản hợp đồng phức tạp."
  },
  {
    id: "wg-3",
    title: "Tự Động Hóa Báo Cáo & Xử Lý Dữ Liệu Bảng Biểu",
    time: "Chính xác tuyệt đối",
    icon: "BarChart3",
    desc: "Biến các con số rời rạc thành biểu đồ trực quan, phân tích xu hướng và gợi ý các giải pháp chiến lược cho doanh nghiệp."
  },
  {
    id: "wg-4",
    title: "Xây Dựng Trợ Lý Ảo Chuyên Biệt Theo Từng Ngành Nghề",
    time: "Trực 24/7 không nghỉ",
    icon: "Bot",
    desc: "Tạo trợ lý riêng hiểu tường tận sản phẩm, dịch vụ và quy trình của bạn để tư vấn khách hàng và hỗ trợ đồng nghiệp."
  }
];

const DEFAULT_COURSES = [
  {
    id: "c-1",
    badge: "Phổ Biến Nhất",
    title: "Khóa Học AI Khởi Đầu: Dành Riêng Cho Người Trung Niên & Người Mới",
    format: "Online Zoom + Cầm Tay Chỉ Việc",
    duration: "6 Buổi (Kèm 1-1 qua Zalo)",
    desc: "Thiết kế chậm rãi, mộc mạc, không dùng thuật ngữ kỹ thuật rườm rà. Giúp cô chú, anh chị tự tin làm chủ AI trên điện thoại và máy tính.",
    features: [
      "Làm quen và cài đặt ChatGPT, DeepSeek, Gemini dễ dàng",
      "Kỹ năng viết văn bản, làm thơ, soạn thảo công văn gia đình & cơ quan",
      "Tạo những bức ảnh nghệ thuật đầu tiên tặng bạn bè, người thân",
      "Tặng trọn bộ 100+ Prompt chọn lọc và nhóm hỗ trợ trọn đời"
    ],
    priceNote: "Học phí trợ duyên cộng đồng",
    isHot: true
  },
  {
    id: "c-2",
    badge: "Chuyên Sâu May Đo",
    title: "Kèm Cặp Cá Nhân 1–1 Cùng Cô Trịnh Thị An",
    format: "Kèm 1 Kèm 1 Trực Tiếp",
    duration: "Theo tiến độ học viên",
    desc: "Lộ trình thiết kế riêng biệt 100% phù hợp với đặc thù công việc và nhu cầu cụ thể của từng cá nhân hoặc chủ doanh nghiệp.",
    features: [
      "Khảo sát công việc hiện tại và thiết lập bộ công cụ AI tối ưu riêng",
      "Hướng dẫn tự động hóa quy trình công việc thực tế của chính bạn",
      "Hỗ trợ xây dựng thương hiệu cá nhân số trên Internet",
      "Được cô Trịnh Thị An đồng hành, giải đáp mọi vướng mắc 24/7"
    ],
    priceNote: "Số lượng nhận giới hạn mỗi tháng",
    isHot: false
  },
  {
    id: "c-3",
    badge: "Sáng Tạo Đỉnh Cao",
    title: "Lớp Chuyên Đề: Sáng Tạo Nghệ Thuật & Video Âm Nhạc AI",
    format: "Thực Hành Trực Tuyến",
    duration: "4 Buổi Chuyên Sâu",
    desc: "Dành cho những ai yêu thích nghệ thuật, muốn tự tay làm nên những bức tranh tuyệt mỹ, sáng tác bài hát và làm kênh YouTube.",
    features: [
      "Làm chủ Midjourney và Fooocus để vẽ tranh theo mọi phong cách",
      "Cách viết lời và tạo bài hát trọn vẹn bằng Suno AI & Udio",
      "Kỹ thuật dựng video chuyển động với Runway và CapCut",
      "Cách xây dựng kênh YouTube An Nhiên thu hút hàng nghìn lượt xem"
    ],
    priceNote: "Thỏa sức đam mê sáng tạo",
    isHot: false
  },
  {
    id: "c-4",
    badge: "Dịch Vụ Trọn Gói",
    title: "Dịch Vụ Thiết Kế Ảnh AI & Sáng Tạo Nội Dung Theo Yêu Cầu",
    format: "Bàn Giao Tận Tay",
    duration: "Theo đơn đặt hàng",
    desc: "Nhận thiết kế bộ ảnh chân dung cao cấp, tranh phong thủy tâm an, phục dựng ảnh kỷ niệm gia đình và sản xuất MV ca nhạc theo mẫu.",
    features: [
      "Phục dựng và nâng cấp ảnh chân dung sắc nét độ phân giải 8K",
      "Thiết kế tranh trang trí phòng thờ, phòng khách mang năng lượng an lành",
      "Sản xuất bài hát và MV ca nhạc cá nhân hóa theo câu chuyện riêng",
      "Chỉnh sửa không giới hạn cho đến khi quý khách hoàn toàn hoan hỷ"
    ],
    priceNote: "Chi phí linh hoạt theo gói mẫu",
    isHot: false
  }
];

const DEFAULT_STORIES = [
  {
    id: "s-1",
    title: "Sống Chậm Lại Để Cảm Nhận Sự Đủ Đầy",
    date: "Tháng 10, 2026",
    quote: "Hạnh phúc không nằm ở những điều lớn lao xa vời, mà hiện diện trong từng hơi thở bình yên và sự biết ơn mỗi sớm mai.",
    author: "Trịnh Thị An"
  },
  {
    id: "s-2",
    title: "Học Hỏi Ở Tuổi Xế Chiều: Chưa Bao Giờ Là Muộn",
    date: "Tháng 09, 2026",
    quote: "Khi ta mở lòng đón nhận tri thức mới, tuổi tác chỉ là một con số. Sự tò mò và niềm vui khám phá sẽ giữ cho tâm hồn luôn tươi trẻ.",
    author: "Trịnh Thị An"
  },
  {
    id: "s-3",
    title: "Lan Tỏa Sự Tử Tế: Cho Đi Là Còn Mãi",
    date: "Tháng 08, 2026",
    quote: "Mỗi hạt mầm tri thức ta gieo xuống, mỗi nụ cười ta trao đi sẽ tạo nên những dòng chảy bình an lan xa khắp muôn nơi.",
    author: "Trịnh Thị An"
  }
];

// DATA MANAGER OBJECT
window.AnNhienData = {
  // Get data with fallback
  getBrand: function() {
    const saved = localStorage.getItem(STORAGE_KEYS.BRAND);
    if (!saved) return DEFAULT_BRAND;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.phone === '0912 345 678' || !parsed.phone) {
        parsed.phone = DEFAULT_BRAND.phone;
        parsed.zalo = DEFAULT_BRAND.zalo;
        localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(parsed));
      }
      return { ...DEFAULT_BRAND, ...parsed };
    } catch {
      return DEFAULT_BRAND;
    }
  },
  saveBrand: function(brandData) {
    localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(brandData));
  },

  getArtworks: function() {
    const saved = localStorage.getItem(STORAGE_KEYS.ARTWORKS);
    return saved ? JSON.parse(saved) : DEFAULT_ARTWORKS;
  },
  saveArtworks: function(items) {
    localStorage.setItem(STORAGE_KEYS.ARTWORKS, JSON.stringify(items));
  },

  getPosts: function() {
    const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
    return saved ? JSON.parse(saved) : DEFAULT_POSTS;
  },
  savePosts: function(items) {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(items));
  },

  getPrompts: function() {
    const saved = localStorage.getItem(STORAGE_KEYS.PROMPTS);
    return saved ? JSON.parse(saved) : DEFAULT_PROMPTS;
  },
  savePrompts: function(items) {
    localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(items));
  },

  getVideos: function() {
    const saved = localStorage.getItem(STORAGE_KEYS.VIDEOS);
    return saved ? JSON.parse(saved) : DEFAULT_VIDEOS;
  },
  saveVideos: function(items) {
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(items));
  },

  getCourses: function() {
    const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
    return saved ? JSON.parse(saved) : DEFAULT_COURSES;
  },
  saveCourses: function(items) {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(items));
  },

  getStories: function() {
    const saved = localStorage.getItem(STORAGE_KEYS.STORIES);
    return saved ? JSON.parse(saved) : DEFAULT_STORIES;
  },
  saveStories: function(items) {
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(items));
  },

  getWorkGuides: function() {
    return DEFAULT_WORK_GUIDES;
  },

  // Student registrations
  getRegistrations: function() {
    const saved = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    return saved ? JSON.parse(saved) : [];
  },
  addRegistration: function(reg) {
    const list = this.getRegistrations();
    const newReg = {
      id: 'reg-' + Date.now(),
      createdAt: new Date().toLocaleString('vi-VN'),
      ...reg
    };
    list.unshift(newReg);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(list));
    return newReg;
  },
  deleteRegistration: function(id) {
    let list = this.getRegistrations();
    list = list.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(list));
    return list;
  },

  // Art design requests
  getArtRequests: function() {
    const saved = localStorage.getItem(STORAGE_KEYS.ART_REQUESTS);
    return saved ? JSON.parse(saved) : [];
  },
  addArtRequest: function(req) {
    const list = this.getArtRequests();
    const newReq = {
      id: 'art-req-' + Date.now(),
      createdAt: new Date().toLocaleString('vi-VN'),
      ...req
    };
    list.unshift(newReq);
    localStorage.setItem(STORAGE_KEYS.ART_REQUESTS, JSON.stringify(list));
    return newReq;
  },
  deleteArtRequest: function(id) {
    let list = this.getArtRequests();
    list = list.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.ART_REQUESTS, JSON.stringify(list));
    return list;
  },

  // Admin PIN management
  getAdminPin: function() {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || DEFAULT_BRAND.adminPin;
  },
  setAdminPin: function(newPin) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, newPin);
  },

  // Full Backup & Restore
  exportBackupJSON: function() {
    const fullBackup = {
      exportedAt: new Date().toISOString(),
      brand: this.getBrand(),
      artworks: this.getArtworks(),
      posts: this.getPosts(),
      prompts: this.getPrompts(),
      videos: this.getVideos(),
      courses: this.getCourses(),
      stories: this.getStories(),
      registrations: this.getRegistrations(),
      artRequests: this.getArtRequests()
    };
    return JSON.stringify(fullBackup, null, 2);
  },

  importBackupJSON: function(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.brand) this.saveBrand(data.brand);
      if (data.artworks) this.saveArtworks(data.artworks);
      if (data.posts) this.savePosts(data.posts);
      if (data.prompts) this.savePrompts(data.prompts);
      if (data.videos) this.saveVideos(data.videos);
      if (data.courses) this.saveCourses(data.courses);
      if (data.stories) this.saveStories(data.stories);
      if (data.registrations) localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(data.registrations));
      if (data.artRequests) localStorage.setItem(STORAGE_KEYS.ART_REQUESTS, JSON.stringify(data.artRequests));
      return { success: true, message: "Khôi phục dữ liệu thành công!" };
    } catch (e) {
      return { success: false, message: "Lỗi cấu trúc file dữ liệu: " + e.message };
    }
  },

  resetToDefault: function() {
    localStorage.removeItem(STORAGE_KEYS.BRAND);
    localStorage.removeItem(STORAGE_KEYS.ARTWORKS);
    localStorage.removeItem(STORAGE_KEYS.POSTS);
    localStorage.removeItem(STORAGE_KEYS.PROMPTS);
    localStorage.removeItem(STORAGE_KEYS.VIDEOS);
    localStorage.removeItem(STORAGE_KEYS.COURSES);
    localStorage.removeItem(STORAGE_KEYS.STORIES);
  }
};
