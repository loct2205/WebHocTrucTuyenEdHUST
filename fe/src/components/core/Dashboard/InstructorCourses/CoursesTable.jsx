import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import ConfirmationModal from "../../../common/ConfirmationModal"
import Img from './../../../common/Img';
import { deleteCourse, fetchInstructorCourses, } from "../../../../services/operations/courseDetailsAPI"
import toast from 'react-hot-toast'

export default function CoursesTable({ courses, setCourses, loading, setLoading }) {

  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 25
  const token = JSON.parse(localStorage.getItem("token"))
  const instructorId = JSON.parse(localStorage.getItem("user"))?.id
  // Xóa khóa học
  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    // Ensure loading is false even on errors
    try {
      const responseStatus = await deleteCourse(courseId, token);
      if (responseStatus !== 200) {
        throw new Error("Failed to delete course");
      } else {
        const updatedCourses = await fetchInstructorCourses(token, instructorId);
        setCourses(updatedCourses || []);
      }
    } catch (error) {
      toast.error("Error deleting course");
    } finally {
      setLoading(false);
      setConfirmationModal(null);
    }

  }

  // Skeleton loading
  const skItem = () => {
    return (
      <div className="flex border-b border-richblack-800 px-6 py-8 w-full">
        <div className="flex flex-1 gap-x-4 ">
          <div className='h-[148px] min-w-[300px] rounded-xl skeleton '></div>

          <div className="flex flex-col w-[40%]">
            <p className="h-5 w-[50%] rounded-xl skeleton"></p>
            <p className="h-20 w-[60%] rounded-xl mt-3 skeleton"></p>

            <p className="h-2 w-[20%] rounded-xl skeleton mt-3"></p>
            <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Table className="rounded-2xl border border-richblack-800">
        {/* Tiêu đề */}
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-3xl border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Khóa học
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Thời lượng
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Giá
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Hành động
            </Th>
          </Tr>
        </Thead>

        {/* Hiển thị Skeleton khi đang tải */}
        {loading && <div>
          {skItem()}
          {skItem()}
          {skItem()}
        </div>}

        <Tbody>
          {!loading && courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                Không tìm thấy khóa học nào
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course.id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                <Td className="flex flex-1 gap-x-4 relative">
                  {/* Ảnh khóa học */}
                  <Img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] min-w-[270px] max-w-[270px] rounded-lg object-cover"
                  />

                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-richblack-5 capitalize">{course.courseName}</p>
                    <p className="text-xs text-richblack-300 ">
                      {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                        ? course.courseDescription
                          .split(" ")
                          .slice(0, TRUNCATE_LENGTH)
                          .join(" ") + "..."
                        : course.courseDescription}
                    </p>

                    {/* Thời gian tạo */}
                    <p className="text-[12px] text-richblack-100 mt-4">
                      Ngày tạo: {course.createdAt}
                    </p>

                    {/* Trạng thái khóa học */}
                    {course.status === "DRAFT" ? (
                      <p className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Đang soạn
                      </p>
                    ) : (
                      <div className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <p className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </p>
                        Đã xuất bản
                      </div>
                    )}
                  </div>
                </Td>

                {/* Thời lượng */}
                <Td className="text-sm font-medium text-richblack-100">{course.duration}</Td>
                {/* Giá */}
                <Td className="text-sm font-medium text-richblack-100">{course.price} VNĐ</Td>

                {/* Hành động */}
                <Td className="text-sm font-medium text-richblack-100 ">
                  {/* Nút chỉnh sửa */}
                  <button
                    disabled={loading}
                    onClick={() => { navigate(`/dashboard/edit-course/${course.id}`) }}
                    title="Chỉnh sửa"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>

                  {/* Nút xóa */}
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Bạn có muốn xóa khóa học này không?",
                        text2: "Mọi dữ liệu liên quan đến khóa học sẽ bị xóa",
                        btn1Text: !loading ? "Xóa" : "Đang tải...",
                        btn2Text: "Hủy",
                        btn1Handler: !loading ? () => handleCourseDelete(course.id) : () => {},
                        btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                      });
                    }}
                    title="Xóa"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {/* Modal xác nhận */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}