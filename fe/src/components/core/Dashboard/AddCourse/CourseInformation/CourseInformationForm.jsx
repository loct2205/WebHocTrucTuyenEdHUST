import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload";
import ChipInput from "./ChipInput.jsx";
import RequirementsField from "./RequirementField.jsx";

export default function CourseInformationForm() {
  const dispatch = useDispatch();
  const { course = {}, editCourse = false } = useSelector(
    (state) => state.course || {}
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: editCourse
      ? {
          courseTitle: course.courseName || "",
          courseShortDesc: course.courseDescription || "",
          coursePrice: course.price || "",
          courseTags: course.tag || [],
          courseBenefits: course.whatYouWillLearn || "",
          courseCategory: course.category?._id || "",
          courseRequirements: course.instructions || [],
          courseImage: course.thumbnail || "",
        }
      : {},
  });

  const [loading, setLoading] = useState(false);
  const [courseCategories] = useState([
    { _id: "1", name: "Danh mục 1" },
    { _id: "2", name: "Danh mục 2" },
  ]);

  useEffect(() => {
    if (editCourse) {
      setValue("courseTitle", course.courseName || "");
      setValue("courseShortDesc", course.courseDescription || "");
      setValue("coursePrice", course.price || "");
      setValue("courseTags", course.tag || []);
      setValue("courseBenefits", course.whatYouWillLearn || "");
      setValue("courseCategory", course.category?._id || "");
      setValue("courseRequirements", course.instructions || []);
      setValue("courseImage", course.thumbnail || "");
    }
  }, [editCourse, course, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.courseTitle !== (course.courseName || "") ||
      currentValues.courseShortDesc !== (course.courseDescription || "") ||
      currentValues.coursePrice !== (course.price || "") ||
      currentValues.courseTags.toString() !== (course.tag || []).toString() ||
      currentValues.courseBenefits !== (course.whatYouWillLearn || "") ||
      currentValues.courseCategory !== (course.category?._id || "") ||
      currentValues.courseRequirements?.toString() !==
        (course.instructions || []).toString() ||
      currentValues.courseImage !== (course.thumbnail || "")
    );
  };

  const onSubmit = (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        console.log("Dữ liệu sau khi chỉnh sửa:", data);
      } else {
        console.error("Không có thay đổi nào trên form");
        return;
      }
    } else {
      console.log("Dữ liệu mới của khóa học:", data);
    }
    dispatch(setStep(2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Tiêu đề khóa học <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Nhập tiêu đề khóa học"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Tiêu đề khóa học là bắt buộc
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Mô tả ngắn gọn <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Nhập mô tả ngắn"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Mô tả khóa học là bắt buộc
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Giá khóa học <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Nhập giá khóa học"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full"
          />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Giá khóa học là bắt buộc
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Danh mục khóa học <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full cursor-pointer"
        >
          <option value="" disabled>
            Chọn danh mục
          </option>
          {courseCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Danh mục khóa học là bắt buộc
          </span>
        )}
      </div>

      <ChipInput
        label="Thẻ"
        name="courseTags"
        placeholder="Nhập thẻ và nhấn Enter hoặc dấu phẩy"
        register={register}
        errors={errors}
        setValue={setValue}
      />

      <Upload
        name="courseImage"
        label="Ảnh thu nhỏ khóa học"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Lợi ích của khóa học <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Nhập lợi ích của khóa học"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Lợi ích khóa học là bắt buộc
          </span>
        )}
      </div>

      <RequirementsField
        name="courseRequirements"
        label="Yêu cầu/Hướng dẫn"
        register={register}
        setValue={setValue}
        errors={errors}
      />

      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="flex cursor-pointer items-center gap-x-2 rounded-md py-[8px] px-[20px] font-semibold text-richblack-900 bg-richblack-300 hover:bg-richblack-900 hover:text-richblack-300 duration-300"
          >
            Tiếp tục mà không lưu
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Tiếp theo" : "Lưu thay đổi"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
}
