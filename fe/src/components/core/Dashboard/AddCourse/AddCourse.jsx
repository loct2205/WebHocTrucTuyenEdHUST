import { useEffect } from "react";
import RenderSteps from "./RenderSteps.jsx";

export default function AddCourse() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const editCourse= true;

  return (
    <div className="flex w-full items-start gap-x-6">

      <div className="flex flex-1 flex-col">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5 font-boogaloo text-center lg:text-left">
          Thêm Khóa Học
        </h1>

        <div className="flex-1">
          <RenderSteps />
        </div>
      </div>

      <div className="sticky top-10 hidden lg:block max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="mb-8 text-lg text-richblack-5">⚡ Mẹo Tải Lên Khóa Học</p>

        <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
          <li>Thiết lập giá khóa học hoặc để miễn phí.</li>
          <li>Kích thước chuẩn cho ảnh thu nhỏ là 1024x576.</li>
          <li>Phần video là nơi kiểm soát video tổng quan khóa học.</li>
          <li>Trình tạo khóa học là nơi bạn tạo và tổ chức khóa học.</li>
          <li>Thêm chủ đề trong phần Trình tạo khóa học để tạo bài học, câu đố và bài tập.</li>
          <li>Thông tin từ phần Dữ liệu bổ sung sẽ xuất hiện trên trang khóa học.</li>
          <li>Tạo thông báo để gửi tin quan trọng đến tất cả học viên đã đăng ký.</li>
        </ul>
      </div>
    </div>
  )
}
