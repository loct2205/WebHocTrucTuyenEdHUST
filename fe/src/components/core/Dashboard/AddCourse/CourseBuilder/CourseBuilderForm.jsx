import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";

import IconBtn from "../../../../common/IconBtn";
import NestedView from "./NestedView.jsx";

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [courseContent, setCourseContent] = useState([]);
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);

    if (editSectionName) {
      const updatedContent = courseContent.map((section) =>
        section.id === editSectionName
          ? { ...section, name: data.sectionName }
          : section
      );
      setCourseContent(updatedContent);
      toast.success("Tên phần đã được cập nhật.");
    } else {
      const newSection = {
        id: Date.now(),
        name: data.sectionName,
        subSection: [],
      };
      setCourseContent([...courseContent, newSection]);
      toast.success("Phần mới đã được thêm.");
    }

    setEditSectionName(null);
    setValue("sectionName", "");
    setLoading(false);
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
    if (loading) return;

    if (courseContent.length === 0) {
      toast.error("Vui lòng thêm ít nhất một phần.");
      return;
    }
    if (courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Vui lòng thêm ít nhất một bài giảng cho mỗi phần.");
      return;
    }
    toast.success("Chuyển sang bước tiếp theo.");
  };

  const goBack = () => {
    if (!loading) {
      toast.info("Quay lại bước trước.");
    }
  };

  return (
    <div className="space-y-8 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Xây dựng khóa học
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Tên phần <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Thêm một phần vào khóa học của bạn"
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
            text={editSectionName ? "Chỉnh sửa tên phần" : "Tạo phần"}
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

      {courseContent.length > 0 && (
        <NestedView
          courseContent={courseContent}
          handleChangeEditSectionName={handleChangeEditSectionName}
        />
      )}

      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className="rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
        >
          Quay lại
        </button>
        <IconBtn disabled={loading} text="Tiếp tục" onClick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
}
