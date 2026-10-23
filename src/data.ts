import { BlogPost, Author } from "./types";

export const defaultAuthor: Author = {
  name: "Trịnh Thị An",
  avatar: "images/avatar-trinh-an.jpg",
  bio: "Nhà sáng tạo nội dung số, chuyên gia huấn luyện AI thực chiến cho người trung niên và doanh nghiệp. Với phương châm 'Tâm an – Vạn sự an', tôi đồng hành giúp mọi người làm chủ công nghệ trí tuệ nhân tạo một cách mộc mạc, gần gũi và hiệu quả nhất.",
  role: "Nhà Sáng Tạo Nội Dung & Huấn Luyện AI – An Nhiên AI"
};

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Hướng Dẫn Người Trung Niên Bắt Đầu Với Trí Tuệ Nhân Tạo (AI) Trong 15 Phút",
    excerpt: "Nhiều người nghĩ AI là thứ gì đó cao siêu của giới trẻ. Nhưng thực ra, AI giống như một người trợ lý cần mẫn và lịch thiệp, bạn chỉ cần biết cách trò chuyện mộc mạc.",
    content: `Chào bạn, tôi là **Trịnh Thị An**. 

Khi bước qua tuổi 45, tôi cũng từng mang trong mình nỗi e dè lớn trước thế giới công nghệ luôn đổi thay chóng mặt. Tôi tự hỏi: *"Liệu ở tuổi này mình có thể học được trí tuệ nhân tạo không? Liệu nó có quá phức tạp đối với mình?"*

Và hôm nay, khi đã tự tay sáng tác hàng nghìn tác phẩm nghệ thuật, sản xuất các MV âm nhạc và tự động hóa toàn bộ công việc văn phòng bằng AI, tôi có thể khẳng định với bạn: **AI không hề khó, chỉ là bạn chưa có người đồng hành chỉ dẫn bằng ngôn ngữ gần gũi nhất!**

---

### Bước 1: Hiểu đúng về AI – Người trợ lý mộc mạc
Đừng coi AI là máy móc phức tạp. Hãy tưởng tượng AI (như ChatGPT, Gemini hay DeepSeek) giống như một **người thư ký riêng vô cùng thông thái và kiên nhẫn**:
- Người thư ký này đọc hàng triệu cuốn sách trên thế giới.
- Bạn hỏi bất cứ điều gì, người thư ký sẽ trả lời ngay lập tức.
- Bạn nhờ viết một lá thư, một bản báo cáo, hoặc sửa bài phát biểu, người ấy làm chỉ trong 3 giây.
- Đặc biệt, người ấy không bao giờ cáu giận hay mệt mỏi!

---

### Bước 2: 3 Công cụ AI miễn phí tốt nhất hiện nay
1. **ChatGPT (OpenAI):** Rất giỏi trò chuyện, viết văn bản, làm thơ, tóm tắt bài viết.
2. **DeepSeek:** Trợ lý thông minh với khả năng suy luận logic xuất sắc, hiểu sâu sắc văn hóa và ngữ cảnh tiếng Việt.
3. **Google Gemini:** Kết nối trực tiếp với tìm kiếm Google, hỗ trợ cập nhật tin tức mới nhất.

Hãy bắt đầu ngay hôm nay để thấy cuộc sống mở ra bao điều kỳ diệu!`,
    coverImage: "images/anh-08.jpg",
    date: "2026-10-20",
    author: defaultAuthor,
    tags: ["Học AI", "Người Trung Niên", "Khởi Đầu"],
    views: 1840,
    readTime: "7 phút"
  },
  {
    id: "post-2",
    title: "Công Thức 5 Bước Đặt Câu Lệnh (Prompt) Chuẩn Xác: Biến AI Thành Trợ Lý Xuất Sắc",
    excerpt: "Chất lượng câu trả lời của AI phụ thuộc hoàn toàn vào cách bạn đặt câu hỏi. Khám phá công thức 5 chữ vàng giúp bạn yêu cầu bất cứ điều gì AI cũng hiểu đúng 100%.",
    content: `Chào các bạn, tôi là **Trịnh Thị An**.

Nhiều anh chị học viên thường than thở với An: *"Cô An ơi, sao tôi bảo AI viết cho tôi bài văn hay tóm tắt văn bản mà nó viết chung chung quá?"*

Nguyên nhân rất đơn giản: **Bạn hỏi chung chung thì AI sẽ trả lời chung chung.**

---

### Công thức 5 Bước Đặt Lệnh Chuẩn Xác:
1. **Vai trò (Role):** Bạn muốn AI đóng vai ai?
2. **Bối cảnh (Context):** Tình huống cụ thể của bạn là gì?
3. **Nhiệm vụ cụ thể (Task):** Bạn cần AI làm gì?
4. **Định dạng kết quả (Format):** Trình bày như thế nào?
5. **Giọng điệu (Tone):** Giọng văn ấm áp, chân thành hay trang trọng?

Áp dụng đúng công thức này, bạn sẽ làm chủ mọi trợ lý AI một cách xuất sắc nhất!`,
    coverImage: "images/anh-05.jpg",
    date: "2026-10-18",
    author: defaultAuthor,
    tags: ["Prompt AI", "Kỹ Năng", "Thực Chiến"],
    views: 1520,
    readTime: "8 phút"
  },
  {
    id: "post-3",
    title: "Tâm An Thì Vạn Sự An: Nuôi Dưỡng Năng Lượng Tích Cực Giữa Đời Thường",
    excerpt: "Bình an không phải là một nơi không có giông bão hay không có lo toan. Bình an là ngay giữa những ồn ào ấy, ta vẫn giữ được sự tĩnh tại trong tim.",
    content: `Cuộc sống hiện đại luôn cuộn chảy với tốc độ chóng mặt. Những lo toan cơm áo gạo tiền đôi lúc khiến chúng ta kiệt sức và cảm thấy bất an.

Đã bao lâu rồi bạn chưa ngồi lại, nhấp một ngụm trà ấm và lắng nghe nhịp thở của chính mình?

---

### 3 Bài học giữ tâm an:
1. **Biết ơn những điều giản dị:** Mỗi sáng mai thức dậy là một món quà.
2. **Buông bỏ những điều không thể kiểm soát:** Ta chỉ có thể kiểm soát thái độ sống của chính mình.
3. **Học tập không ngừng để làm mới tâm hồn:** Khi ta học điều mới, tâm trí sẽ luôn tươi trẻ và an vui.

> *"Tâm bình thế giới bình. Tâm an vạn sự an. Hãy đối xử tử tế với chính mình!"*`,
    coverImage: "images/anh-02.jpg",
    date: "2026-10-12",
    author: defaultAuthor,
    tags: ["Tâm An", "Sống Đẹp", "Bình Yên"],
    views: 2130,
    readTime: "5 phút"
  }
];
