import { BlogPost, Author } from "./types";

export const defaultAuthor: Author = {
  name: "Ông Chủ Tuấn Tử Tế",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  bio: "Kết nối các nguồn lực giúp những người khát khao thay đổi có cuộc sống tốt đẹp hơn.",
  role: "Người truyền cảm hứng & Sứ mệnh kết nối"
};

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Luyện Thân: Khi Sức Khỏe Là Nền Tảng Của Mọi Ước Mơ",
    excerpt: "Muốn khai tâm hay mở trí, trước hết ta cần một cơ thể tràn đầy sinh khí. Hãy cùng bắt đầu hành trình kỷ luật bản thân qua những thói quen rèn luyện thể chất đơn giản hằng ngày.",
    content: `Chào các bạn, tôi là **Tuấn**. Trong hành trình phát triển bản thân toàn diện, nhiều người thường tập trung ngay vào việc tích lũy kiến thức hay thiền định, mà quên đi cột trụ cốt lõi nhất: **Thân thể**.

Người ta thường bảo: *"Người có sức khỏe thì có cả ngàn ước mơ, người không có sức khỏe thì chỉ có một ước mơ duy nhất là sức khỏe."* Đúng vậy, một trí tuệ minh mẫn hay một tâm hồn bình an chỉ có thể trú ngụ trong một cơ thể tràn đầy năng lượng và khỏe mạnh.

---

### Luyện Thân không chỉ là tập thể dục

Đối với tôi, rèn luyện thể chất (Luyện Thân) là một phong cách sống, một nghi thức kỷ luật bản thân hằng ngày:

1. **Lắng nghe cơ thể:** Hiểu rõ nguồn năng lượng của mình thông qua chế độ dinh dưỡng lành mạnh, hạn chế các chất kích thích và ăn nhiều thực phẩm xanh, tươi sạch.
2. **Vận động đều đặn:** Không nhất thiết phải nâng tạ nặng hay chạy marathon. Chỉ cần 30 phút đi bộ nhanh, tập yoga hoặc thực hiện các bài tập giãn cơ mỗi ngày cũng đủ để kích hoạt các hormone hạnh phúc như endorphin và dopamine.
3. **Giấc ngủ chất lượng:** Một giấc ngủ sâu và đủ giấc từ 7-8 tiếng là liều thuốc phục hồi tự nhiên tuyệt vời nhất dành cho não bộ và cơ bắp.

> *"Hãy đối xử tử tế với cơ thể của bạn, vì đó là ngôi nhà duy nhất mà bạn bắt buộc phải sống trong suốt cuộc đời này."*

---

### Bắt đầu từ những thói quen nhỏ nhất

Nếu bạn cảm thấy uể oải mỗi buổi sáng, hãy thử thay đổi bằng những hành động đơn giản này ngay hôm nay:
- Uống một ly nước ấm ngay khi thức dậy để thanh lọc cơ thể.
- Dành ra 10 phút kéo giãn cơ xương khớp trước khi ngồi vào bàn làm việc.
- Thực hiện quy tắc nghỉ ngơi: Cứ sau 45 phút làm việc, hãy đứng dậy đi lại và uống nước trong 5 phút.

Khi thể chất khỏe mạnh, dòng chảy năng lượng trong bạn sẽ thông suốt, tạo tiền đề vững chắc cho việc nuôi dưỡng tâm hồn và khai mở trí tuệ. Hãy cùng tôi luyện Thân mỗi ngày để sống một cuộc đời tràn đầy sinh khí và tử tế nhé!`,
    coverImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
    date: "2026-07-12",
    author: defaultAuthor,
    tags: ["Luyện Thân", "Sức Khỏe", "Thói Quen"],
    views: 1240,
    readTime: "5 phút"
  },
  {
    id: "post-2",
    title: "Khai Tâm: Tìm Lại Sự Bình Yên Giữa Giông Bão Cuộc Đời",
    excerpt: "Hạnh phúc thực sự không nằm ở những hào nhoáng hay thành tựu bên ngoài, mà bắt đầu từ một trái tim biết bao dung, một tâm hồn rộng mở để đón nhận sự tử tế.",
    content: `Chào các bạn, hôm nay tôi muốn cùng mọi người ngồi lại, nhâm nhi một tách trà và trò chuyện về một góc rất sâu thẳm trong mỗi chúng ta: **Tâm hồn**.

Cuộc sống hiện đại luôn cuốn chúng ta đi với tốc độ chóng mặt. Áp lực công việc, sự so sánh trên mạng xã hội, và những mối lo toan cơm áo gầy dựng khiến tâm trí chúng ta luôn trong trạng thái căng thẳng và bất an. Đã bao lâu rồi bạn chưa tự hỏi bản thân: *"Hôm nay mình có thực sự ổn không?"*

---

### Khai Tâm là hành trình quay về bên trong

Khai Tâm chính là việc nuôi dưỡng trí tuệ cảm xúc, vun đắp lòng trắc ẩn và sự tử tế chân thành với chính mình và mọi người xung quanh:

1. **Chấp nhận và bao dung:** Chấp nhận những khuyết điểm của bản thân và học cách tha thứ cho những lỗi lầm trong quá khứ. Tử tế với chính mình là bước đầu tiên để tử tế với thế giới.
2. **Thực hành lòng biết ơn:** Mỗi tối trước khi đi ngủ, hãy viết ra 3 điều khiến bạn cảm thấy biết ơn trong ngày. Lòng biết ơn sẽ chuyển hóa góc nhìn của bạn từ sự thiếu thốn sang sự đủ đầy và trân trọng.
3. **Nuôi dưỡng các mối quan hệ chân thành:** Dành thời gian chất lượng cho gia đình, bạn bè. Lắng nghe sâu bằng cả trái tim thay vì chỉ nghe để phản hồi.

> *"Bình yên không phải là một nơi không có tiếng ồn, không có rắc rối hay không có việc cực nhọc. Bình yên là ngay giữa những thứ đó, ta vẫn giữ được sự tĩnh lặng trong tim."*

---

### Sứ mệnh tử tế và sự kết nối

Khi tâm hồn bạn đủ rộng lớn và an yên, bạn sẽ tự nhiên muốn lan tỏa năng lượng tích cực đó đến mọi người. Sự tử tế không cần phải là điều gì đó vĩ đại. Đó có thể chỉ là một nụ cười ấm áp với người bảo vệ, một lời cảm ơn chân thành gửi tới đồng nghiệp, hay sự lắng nghe chia sẻ với một người đang gặp khó khăn.

Hãy để trái tim dẫn đường, sống chậm lại một chút để cảm nhận vẻ đẹp của sự kết nối và tình yêu thương quanh ta. Chúc bạn luôn tìm thấy sự bình an và tử tế trong từng hơi thở hằng ngày!`,
    coverImage: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80",
    date: "2026-07-10",
    author: defaultAuthor,
    tags: ["Khai Tâm", "Tâm Hồn", "Tử Tế", "Bình An"],
    views: 890,
    readTime: "4 phút"
  },
  {
    id: "post-3",
    title: "Mở Trí: Học Tập Suốt Đời Để Không Ngừng Nâng Cao Nhận Thức",
    excerpt: "Nhận thức là giới hạn của thế giới mà bạn đang sống. Muốn kiến tạo một cuộc đời tự do và ý nghĩa, hãy bắt đầu bằng việc thay đổi tư duy và duy trì tinh thần tự học không ngừng nghỉ.",
    content: `Chào các bạn, tôi là **Tuấn**. Trong ba trụ cột THÂN - TÂM - TRÍ, nếu Thân là bệ đỡ, Tâm là la bàn thì **Trí** chính là ngọn hải đăng soi sáng con đường chúng ta đi. 

Nhiều người nghĩ rằng việc học sẽ kết thúc sau khi nhận tấm bằng tốt nghiệp đại học. Nhưng thực tế, thế giới luôn biến đổi không ngừng. Nếu ngừng học hỏi, tư duy của chúng ta sẽ nhanh chóng trở nên xơ cứng và lạc hậu. Mở Trí là một hành trình trọn đời để nâng cao nhận thức và khai phóng tư duy.

---

### Bản chất của việc Mở Trí

Mở Trí không đơn thuần là nhồi nhét thật nhiều thông tin hay kiến thức khô khan. Đó là sự rèn luyện năng lực tư duy độc lập và nâng cao thế giới quan của bản thân:

1. **Tư duy mở (Growth Mindset):** Sẵn sàng đón nhận những góc nhìn mới, không ngần ngại thừa nhận những gì mình chưa biết và coi thất bại là những bài học quý giá để trưởng thành.
2. **Kỷ luật tự học:** Dành ra ít nhất 30 phút mỗi ngày để đọc sách, nghe podcast phát triển bản thân, hoặc tham gia các khóa học chuyên sâu. Đọc sách là cách nhanh nhất để ta đứng trên vai những người khổng lồ.
3. **Quan sát và đúc rút:** Học từ thực tế cuộc sống, từ những người xung quanh và cả từ những trải nghiệm của chính mình thông qua việc viết nhật ký phản tư (Reflection).

> *"Nhận thức của bạn tới đâu, thế giới của bạn rộng lớn tới đó. Đừng hạn chế bản thân trong chiếc hộp của những định kiến cũ kỹ."*

---

### Hành động để khai phóng trí tuệ

Để bắt đầu hành trình Mở Trí đầy thú vị này, bạn có thể thực hiện những bước nhỏ sau:
- Thay vì lướt mạng xã hội vô định trước khi ngủ, hãy đọc 5 trang sách thuộc chủ đề tư duy hoặc khoa học hành vi.
- Luôn đặt câu hỏi *"Tại sao?"* và *"Như thế nào?"* trước mọi thông tin bạn tiếp nhận để rèn luyện tư duy phản biện.
- Tham gia vào các cộng đồng học tập tích cực để cùng thảo luận, chia sẻ tri thức và nâng đỡ nhau cùng tiến bộ.

Trí tuệ là tài sản duy nhất không ai có thể lấy đi của bạn. Hãy không ngừng mở rộng nhận thức, nâng tầm tư duy để tự tin làm chủ cuộc sống của chính mình. Chúc các bạn luôn giữ được ngọn lửa hiếu kỳ và đam mê khám phá tri thức!`,
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    date: "2026-07-08",
    author: defaultAuthor,
    tags: ["Mở Trí", "Tư Duy", "Học Tập", "Nhận Thức"],
    views: 1560,
    readTime: "6 phút"
  }
];
