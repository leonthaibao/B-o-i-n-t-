Chào thầy,

I. Tổ chức file cơ bản CHƯA CÓ các phân hệ(Guest) người dùng bọn em như sau(hoặc thầy
có thể click vào index.html và chọn các chức năng đã được liên kết trực tiếp): 

	1. Màn hình chính(HOME): /index.html

	2. Danh sách bài viết: /category
		Trong đó gồm: 
			a) ./posts-list.html : danh sách bài viết
			b) ./nong-san.html, ./haisan.html : danh sách bài viết theo chuyên mục
			c) theo tag  bọn e chưa làm vì nghĩ nó tương tự như danh sách bài viết theo chuyên mục

	3. Bài viết chi tiết: /postdetail
		mẫu chung của bài viết: làm 1 bài mẫu 
		/postdetail/post3.html

	4. Đăng nhập: 
		/signin/signin.html

	5. Đăng ký: 
		/signup/signup.html

	6. Quên mật khẩu: 
		/forgotpassword/forgotpassword.html

	thư mục /img chứa ảnh của web, thư mục /css chứa mã nguồn .css của web

II. Tổ chức file CÓ phân hệ người dùng

	1. Phân hệ độc giả - subscriber: (/subcriber)
		/subcriber/subs-index.html : home của phân hệ subscriber sau khi đăng nhập vào
		/subcriber/subs-posts-list : danh sách bài viết của phân hệ này 

	2. Phân hệ phóng viên - writer: (/writerpage)
		/writerpage/writer.html : giao diện chính của phân hệ writer sau khi đăng nhập

	3. Phân hệ biên tập viên - editor: (/editorpage)
		/editorpage/editor-tag-vandenhanong.html: giao diện chính editor của phân hệ sau khi đăng nhập

	4. Phân hệ quản trị viên - administrator: (/adminpage)
		mặc định sau khi đăng nhập: /adminpage/admin-category.html (quản lý danh sách category)
		/adminpage/admin-post.html (quản lý danh sách bài viết)
		/adminpage/admin-tag.html (quản lý danh sách tag)
		/adminpage/admin-user.html (quản lý danh sách user)
	
	5. Chức năng cập nhật thông tin: (/updateinfo)
		/updateinfo/update.html : cập nhật thông tin người dùng