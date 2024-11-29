import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createSection, updateSection, fetchCourseDetails } from "../../../../../services/operations/courseDetailsAPI"

import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";

import IconBtn from "../../../../common/IconBtn";
import NestedView from "./NestedView";

export default function CourseBuilderForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Đảm bảo `course` luôn có giá trị mặc định
  const { course } = useSelector((state) => state.course || { course: { courseContent: [] } });
  const token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null); // ID của phần đang chỉnh sửa

  // Xử lý khi submit form
  const onSubmit = async (data) => {
    try {
      if (editSectionName) {
        // Update section name
        const updatedStatus = await updateSection(editSectionName, data.sectionName, token);
        if (updatedStatus === 200) {
          const courseDetails = await fetchCourseDetails(course.id, token);
          if (courseDetails) {
            dispatch(setCourse(courseDetails));
          } else {
            throw new Error("Failed to fetch updated course details");
          } 
        } else {
          throw new Error("Failed to update section name");
        }
        setEditSectionName(null); // Reset edit mode
      } else {
        // Add new section
        const courseId = course.id;
  
        const newSection = {
          sectionName: data.sectionName,
        };
  
        console.log("New Section Data:", newSection);
  
        // Create new section
        const responseSection = await createSection(
          JSON.stringify(newSection),
          token,
          courseId
        );
  
        if (responseSection) {
          // Fetch updated course details
          const courseDetail = await fetchCourseDetails(courseId, token);
          if (courseDetail) {
            dispatch(setCourse(courseDetail));
            // Clear the input field
            setValue("sectionName", "");
          }
        } else {
          throw new Error("Failed to create new section.");
        }
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      alert(error.message || "An unexpected error occurred.");
    }
  };
  
  // Hủy chỉnh sửa
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  // Đổi sang chế độ chỉnh sửa phần
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  // Chuyển đến bước tiếp theo
  const goToNext = () => {
    console.log("courseContent: ", course?.courseContent);
    if (!course?.courseContent || course.courseContent.length === 0) {
      alert("Vui lòng thêm ít nhất một phần");
      return;
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      alert("Vui lòng thêm ít nhất một bài giảng trong mỗi phần");
      return;
    }
    dispatch(setStep(3));
  };

  // Quay lại bước trước
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  return (  
    <div className="space-y-8 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Xây dựng khóa học</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Tên phần */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Tên phần <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Thêm một phần để xây dựng khóa học"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Tên phần là bắt buộc
            </span>
          )}
        </div>

        {/* Chỉnh sửa hoặc tạo phần */}
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Chỉnh sửa tên phần" : "Tạo phần mới"}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Hủy chỉnh sửa
            </button>
          )}
        </div>
      </form>

      {/* Hiển thị danh sách các phần và bài giảng */}
      {course?.sections?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      {/* Nút Tiếp theo và Quay lại */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Quay lại
        </button>

        <IconBtn disabled={loading} text="Tiếp theo" onClick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
}
