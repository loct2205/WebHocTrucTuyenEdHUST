import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { createSection, updateSection, fetchCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";

import IconBtn from "../../../../common/IconBtn";
import NestedView from "./NestedView";

export default function CourseBuilderForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const { course } = useSelector((state) => state.course);
  const token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (editSectionName) {
        const updatedStatus = await updateSection(editSectionName, data.sectionName, token);
        if (updatedStatus === 200) {
          const courseDetails = await fetchCourseDetails(course.id, token);
          if (courseDetails) {
            dispatch(setCourse(courseDetails));
            toast.success("Tên phần đã được cập nhật thành công.");
          } else {
            throw new Error("Không thể tải thông tin khóa học.");
          }
        } else {
          throw new Error("Không thể cập nhật tên phần.");
        }
        setEditSectionName(null);
      } else {
        const courseId = course.id;

        const newSection = { sectionName: data.sectionName };
        const responseSection = await createSection(JSON.stringify(newSection), token, courseId);

        if (responseSection) {
          const courseDetail = await fetchCourseDetails(courseId, token);
          if (courseDetail) {
            dispatch(setCourse(courseDetail));
            setValue("sectionName", "");
            toast.success("Phần mới đã được tạo thành công.");
          }
        } else {
          throw new Error("Không thể tạo phần mới.");
        }
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error(error.message || "Đã xảy ra lỗi.");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  const goToNext = () => {
    if (!Array.isArray(course.sections) || course.sections.length === 0) {
      toast.error("Vui lòng thêm ít nhất một phần.");
      return;
    }

    if (course.sections.some((section) => !Array.isArray(section.subSections) || section.subSections.length === 0)) {
      toast.error("Vui lòng thêm ít nhất một bài giảng trong mỗi phần.");
      return;
    }

    dispatch(setStep(3));
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  return (
    <div className="space-y-8 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Xây dựng khóa học</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      {course?.sections?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

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
