import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../../common/IconBtn";

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courseStatus, setCourseStatus] = useState("DRAFT");

  useEffect(() => {
    if (courseStatus === "PUBLISHED") {
      setValue("public", true);
    }
  }, [courseStatus, setValue]);

  const goBack = () => {
    console.log("Quay lại bước trước");
  };

  const goToCourses = () => {
    // navigate("/dashboard/my-courses");
    navigate("/dashboard");
  };

  const handleCoursePublish = () => {
    setLoading(true);
    const newStatus = getValues("public") ? "PUBLISHED" : "DRAFT";
    setCourseStatus(newStatus);
    setLoading(false);
    goToCourses();
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Cài đặt xuất bản</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">Công khai khóa học này</span>
          </label>
        </div>

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
