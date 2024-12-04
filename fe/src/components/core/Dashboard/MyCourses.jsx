import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"

export default function MyCourses() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const token = JSON.parse(localStorage.getItem("token"))
  const instructorId = JSON.parse(localStorage.getItem("user"))?.id
  // Cuộn lên đầu trang khi component được tải
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const result = await fetchInstructorCourses(token, instructorId)
      // console.log('Instructors all courses  ', result);
      setLoading(false);
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
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
