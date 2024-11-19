import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([
    {
      _id: "1",
      courseName: "Khóa học Lập trình Cơ bản",
      courseDescription: "Học cách viết mã với ngôn ngữ lập trình cơ bản và phát triển kỹ năng lập trình.",
      thumbnail: "https://via.placeholder.com/270",
      createdAt: "2024-01-01",
      updatedAt: "2024-11-01",
      status: "published",
      duration: "2 giờ",
      price: "500.000",
    },
    {
      _id: "2",
      courseName: "Khóa học Thiết kế Web",
      courseDescription: "Xây dựng và thiết kế các trang web từ cơ bản đến nâng cao.",
      thumbnail: "https://via.placeholder.com/270",
      createdAt: "2023-06-01",
      updatedAt: "2024-06-15",
      status: "draft",
      duration: "3 giờ",
      price: "1.000.000",
    },
  ])
  const [loading, setLoading] = useState(false)

  // Cuộn lên đầu trang khi component được tải
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <div className="mb-14 flex justify-between">
        <h1 className="text-4xl font-medium text-richblack-5 font-boogaloo text-center lg:text-left">
          Khóa học của tôi
        </h1>
        <IconBtn
          text="Thêm Khóa học"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {/* Bảng khóa học */}
      {courses && (
        <CoursesTable
          courses={courses}
          setCourses={setCourses}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  )
}
