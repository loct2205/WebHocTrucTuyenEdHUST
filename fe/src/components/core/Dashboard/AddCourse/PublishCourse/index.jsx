import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === "ĐÃ XUẤT BẢN") {
      setValue("public", true);
    }
  }, [course, setValue]);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = () => {
    // Giả lập xử lý xuất bản khóa học
    if (
      (course?.status === "ĐÃ XUẤT BẢN" && getValues("public") === true) ||
      (course?.status === "NHÁP" && getValues("public") === false)
    ) {
      goToCourses();
      return;
    }
    alert("Khóa học đã được cập nhật trạng thái!");
    goToCourses();
  };

  const onSubmit = (data) => {
    handleCoursePublish();
  };

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Cài đặt xuất bản
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Đặt khóa học này ở chế độ công khai
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Quay lại
          </button>
          <IconBtn disabled={loading} text="Lưu thay đổi" />
        </div>
      </form>
    </div>
  );
}
