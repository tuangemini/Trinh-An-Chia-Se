# CẨM NANG TOÀN TẬP: HƯỚNG DẪN TẠO, QUẢN TRỊ & CHUYỂN GIAO WEBSITE TRÊN GITHUB

> **Dành cho:** Người mới bắt đầu hoàn toàn, người trung niên, công chức, trí thức và mọi người muốn làm chủ website cá nhân 100% mà không cần biết lập trình.  
> **Xem bản giao diện web tương tác & in PDF tại:** [huong-dan-chuyen-giao-github.html](huong-dan-chuyen-giao-github.html) hoặc [https://trinhan.life/huong-dan-chuyen-giao-github.html](https://trinhan.life/huong-dan-chuyen-giao-github.html)

---

## 🎯 BỘ ĐỊNH VỊ BẢN THÂN: BẠN ĐANG Ở GIAI ĐOẠN NÀO?

Trước khi đọc, hãy xác định bạn đang ở giai đoạn nào để nhảy thẳng vào Module tương ứng:

- 🟢 **Giai đoạn 1 (Mới bắt đầu):** Bạn chưa từng có tài khoản GitHub, chưa biết GitHub là gì ➔ **Đọc Module 1**.
- 🔵 **Giai đoạn 2 (Xuất bản website):** Bạn đã có tài khoản GitHub, muốn đưa website Trịnh An lên mạng ➔ **Đọc Module 2**.
- 🟣 **Giai đoạn 3 (Tự quản trị & vận hành):** Web đã online, bạn muốn đăng bài viết, sửa tranh, đổi số Zalo ➔ **Đọc Module 3**.
- 🟠 **Giai đoạn 4 (Chuyển giao & nhân bản):** Bạn muốn nhân bản, tặng lại web này cho học viên hoặc đối tác ➔ **Đọc Module 4**.
- 🔴 **Giai đoạn 5 (Cứu hộ & sửa lỗi):** Bạn đang gặp lỗi (web 404, kéo nhầm folder con, sửa mà web chưa đổi,...) ➔ **Đọc Module 5**.

---

## 🟢 MODULE 1: KHỞI ĐẦU CHO NGƯỜI MỚI TOÀN TẬP (GIAI ĐOẠN 1)

### 1.1 Hiểu Đúng & Đơn Giản Về GitHub (Không Sợ Kỹ Thuật)
- **GitHub là gì?** GitHub giống như một **"Két sắt an toàn & Sổ đỏ kỹ thuật số"** thuộc tập đoàn Microsoft. Mọi hình ảnh, bài viết, mã nguồn trang web của bạn được cất giữ ở đây trọn đời, không bao giờ bị mất.
- **GitHub Pages là gì?** Là tính năng phát sóng miễn phí đi kèm, giúp đưa các file trong két sắt đó thành trang web sống động trên Internet với chi phí **0 đồng** trọn đời.

### 1.2 3 Bước Đăng Ký Tài Khoản GitHub Miễn Phí (Mất 3 Phút)
1. **Truy cập:** Mở trình duyệt vào link: [https://github.com/signup](https://github.com/signup)
2. **Điền 3 thông tin:**
   - **Email:** Nhập Gmail bạn dùng hàng ngày.
   - **Password:** Mật khẩu từ 8 ký tự (chữ và số).
   - **Username (Tên người dùng):** Đặt tên thương hiệu viết liền không dấu (ví dụ: `annhienai`, `trinhan-ai`). Tên này sẽ xuất hiện trong đường link website miễn phí của bạn!
3. **Xác thực:** Mở Gmail lấy mã số 6 chữ số GitHub gửi về và nhập vào màn hình. Bạn đã có tài khoản GitHub chính chủ!

---

## 🔵 MODULE 2: TIẾP NHẬN & XUẤT BẢN WEBSITE LÊN INTERNET (GIAI ĐOẠN 2)

### 2.1 Chọn 1 Trong 2 Cách Đưa Code Sang GitHub Của Bạn

#### ★ CÁCH A (KHUYÊN DÙNG NHẤT – 1 CLICK BẰNG NÚT FORK)
1. Đăng nhập GitHub của bạn.
2. Mở link dự án gốc: [https://github.com/tuangemini/Trinh-An-Chia-Se](https://github.com/tuangemini/Trinh-An-Chia-Se)
3. Nhìn góc trên bên phải, bấm vào nút **Fork** (hình chiếc nĩa).
4. Bấm nút xanh **"Create fork"**. Trong 3 giây, toàn bộ trang web đã sang tài khoản của bạn chuẩn 100%!

#### CÁCH B (TỰ TẢI TỪ MÁY TÍNH LÊN KHO MỚI)
1. Trên GitHub của bạn, bấm **New repository** để tạo kho mới.
2. **NGUYÊN TẮC VÀNG:** Mở thư mục dự án trên máy tính ra, nhấn **`Ctrl + A`** để bôi đen tất cả các file bên trong (`index.html`, `data.js`, `admin.js`, thư mục `images`,...).
3. Bấm **Add file** ➔ **Upload files** trên GitHub ➔ Kéo các file đã chọn thả vào.
4. Kéo xuống dưới bấm nút xanh **Commit changes**.
> *(Tuyệt đối không kéo cả thư mục cha bên ngoài để tránh bị lọt vào thư mục con!)*

### 2.2 Kích Hoạt Xuất Bản Website (GitHub Pages)
1. Tại kho GitHub của bạn, bấm thẻ **⚙️ Settings** ở menu trên cùng.
2. Ở cột menu bên trái, tìm và bấm vào chữ **📄 Pages**.
3. Tại mục **Build and deployment**:
   - Ô **Branch**: Bấm vào chữ `None ▾` và chọn **`main`**.
   - Ô thư mục bên cạnh: Giữ nguyên **`/(root)`**.
   - Bấm nút **Save** (Lưu).
4. Đợi khoảng 1 đến 2 phút rồi nhấn **F5** tải lại trang, bạn sẽ thấy đường link website màu xanh lá xuất hiện trên đỉnh!

### 2.3 Cấu Hình Tên Miền (File CNAME)
- **Nếu dùng link MIỄN PHÍ của GitHub** (dạng `https://tên-bạn.github.io/tên-kho/`): Hãy bấm vào file có tên **`CNAME`** trên GitHub ➔ Bấm icon thùng rác để **XÓA file này đi**!
- **Nếu dùng TÊN MIỀN RIÊNG** (mua ngoài như `trinhan.life`): Mở file **`CNAME`**, bấm icon cây bút chì ✏️ sửa thành tên miền của bạn và cấu hình DNS theo hướng dẫn.

---

## 🟣 MODULE 3: TỰ QUẢN TRỊ & CẬP NHẬT WEBSITE HÀNG NGÀY (GIAI ĐOẠN 3)

### 3.1 Cách 1: Quản Trị Trực Tiếp Trên Web (An Nhiên CMS Studio)
- Bấm nút **🔐 Quản Trị** ở góc trên thanh menu web (hoặc ấn `Ctrl + Shift + A`).
- Nhập mã PIN bảo mật mặc định: **`1979`**.
- Giao diện quản trị sẽ mở ra: Chọn tab **Bài Viết**, **Kho Tranh**, **Video**, **Prompt** để thêm/sửa/xóa dễ dàng như dùng Word.

### 3.2 Cách 2: Ra Lệnh Cho Trợ Lý AI (Gemini Spark) Tự Động Làm
1. **Lấy chìa khóa kết nối GitHub Token:**
   - Vào link: [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)
   - Đặt tên token, chọn thời hạn *No expiration*, tích chọn ô **☑️ repo** ➔ Bấm **Generate token** và lưu mã `ghp_...` lại.
2. **Mẫu câu lệnh gửi cho Gemini Spark:**
   ```text
   Chào bạn Gemini Spark,
   Đây là thông tin kho GitHub website của tôi:
   - Repository: [TÊN_GITHUB_CỦA_BẠN/TÊN_KHO]
   - GitHub Token: [DÁN MÃ TOKEN ghp_... CỦA BẠN VÀO ĐÂY]

   Hôm nay hãy giúp tôi cập nhật website:
   1. Đăng bài viết mới tiêu đề: "[TIÊU ĐỀ BÀI VIẾT]" thuộc chuyên mục "Thư Viện Học AI".
   2. Thêm một bức tranh nghệ thuật mới: Tiêu đề "[TÊN TRANH]".
   3. Cập nhật số điện thoại Hotline / Zalo của tôi thành: [SỐ ĐIỆN THOẠI CỦA BẠN].

   Hãy commit và push trực tiếp lên nhánh main giúp tôi. Xin cảm ơn!
   ```

### 3.3 Cách 3: Sửa Nhanh Trực Tiếp Trên GitHub
- **Sửa 1 file:** Bấm vào file `data.js` ➔ Bấm icon cây bút chì ✏️ ở góc phải ➔ Sửa số điện thoại hoặc link YouTube ➔ Bấm nút xanh **Commit changes**.
- **Sửa nhiều file:** Nhấn phím dấu chấm **`.`** trên bàn phím để mở trình soạn thảo VS Code Web trực quan.

---

## 🟠 MODULE 4: CHUYỂN GIAO & NHÂN BẢN DỰ ÁN CHO NGƯỜI KHÁC (GIAI ĐOẠN 4)

### 4.1 Quy Trình 3 Bước Bàn Giao
1. **Gửi nguồn:** Gửi link kho GitHub của bạn bảo người nhận bấm nút **Fork** (hoặc gửi file nén `TrinhAn-Life-Website.zip`).
2. **Bật Pages:** Hướng dẫn họ vào *Settings ➔ Pages ➔ chọn Branch main ➔ Save*.
3. **Bàn giao quyền:** Cung cấp mã PIN `1979` để họ tự mở trang quản trị thay đổi thông tin cá nhân của họ.

### 4.2 Checklist 5 Mục Cần Kiểm Tra Trước Khi Bàn Giao
- [ ] Số điện thoại Hotline & Zalo trong `data.js` đã đổi đúng chưa?
- [ ] Kênh YouTube & mạng xã hội đã đổi chưa?
- [ ] Đã xóa file `CNAME` nếu người nhận dùng link miễn phí của GitHub chưa?
- [ ] Đã thu hồi/xóa mã Token cá nhân cũ của bạn chưa?
- [ ] Hướng dẫn người nhận đổi mã PIN quản trị mới để bảo mật.

---

## 🔴 MODULE 5: SỔ TAY XỬ LÝ SỰ CỐ & SỬA LỖI TRONG 1 PHÚT (TROUBLESHOOTING)

### ❓ Lỗi 1: Lỡ kéo cả thư mục cha lên GitHub khiến web bị lỗi 404?
- **Nguyên nhân:** File `index.html` bị nằm lọt thỏm trong thư mục con (ví dụ: `Test-TrinhAn/Trinh-An-Chia-Se/index.html`). GitHub Pages chỉ nhận file ở thư mục gốc (Root).
- **Cách sửa trong 30 giây (Không cần upload lại):**
  1. Tại trang GitHub của bạn, nhấn phím **dấu chấm `.`** trên bàn phím để mở VS Code Web.
  2. Mở thư mục con bên trái, chọn các file (`index.html`, `data.js`, thư mục `images`,...) kéo thả thẳng ra ngoài thư mục gốc trên cùng.
  3. Chuột phải vào thư mục con rỗng vừa chuyển xong ➔ Chọn **Delete**.
  4. Bấm biểu tượng Source Control (hình nhánh cây bên trái) ➔ Gõ chữ lưu ➔ Bấm nút tích xanh **Commit & Push**. Xong!

### ❓ Thắc mắc 2: Bấm vào nút "Add a README file" thấy trang trắng tinh có phải bị mất code?
- **Giải thích:** Nút này là để bạn **tạo mới** một file giới thiệu từ đầu nên GitHub mở trang trắng để bạn tự gõ chữ. Đây là bình thường, không phải bị mất code!
- Để xem lại toàn bộ file code của bạn, chỉ cần bấm vào chữ **`<> Code`** ở góc trên bên trái.

### ❓ Lỗi 3: Đã sửa nội dung trên GitHub nhưng mở web vẫn thấy bài cũ?
- **Cách sửa:** Nhấn tổ hợp phím **`Ctrl + F5`** (trên máy tính) hoặc mở bằng **Tab Ẩn Danh** trên điện thoại để ép trình duyệt tải phiên bản mới nhất từ GitHub Pages về.

### ❓ Lỗi 4: Video YouTube trong khung phát không chịu chạy?
- **Cách sửa:** Khung phát video YouTube cần một **Mã ID video gồm 11 ký tự** (ví dụ: trong link `https://www.youtube.com/watch?v=133gUdvBls8` thì mã ID là `133gUdvBls8`). Nếu chỉ dán link kênh (`@annhienaimusictta`) thì YouTube sẽ chặn không cho phát trong khung hình.
