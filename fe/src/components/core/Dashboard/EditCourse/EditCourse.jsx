import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import RenderSteps from "../AddCourse/RenderSteps"
import Loading from './../../../common/Loading';

export default function EditCourse() {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { course } = useSelector((state) => state.course)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Giả lập thời gian tải dữ liệu
    setLoading(true)
    setTimeout(() => {
      dispatch({ type: "setEditCourse", payload: true }) // Giả lập chỉnh sửa
      dispatch({ type: "setCourse", payload: { name: "Khóa học mẫu" } }) // Giả lập dữ liệu khóa học
      setLoading(false)
    }, 1000)
  }, [])

  // Hiển thị màn hình chờ khi đang tải
  if (loading) {
    return <Loading />
  }

  return (
    <div className="flex w-full items-start gap-x-6">
      <div className="flex flex-1 flex-col">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5 text-center sm:text-left">
          Chỉnh sửa khóa học
        </h1>

        {loading ? (
          <Loading />
        ) : (
          <div className="flex-1">
            {course ? (
              <RenderSteps />
            ) : (
              <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                Không tìm thấy khóa học
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
