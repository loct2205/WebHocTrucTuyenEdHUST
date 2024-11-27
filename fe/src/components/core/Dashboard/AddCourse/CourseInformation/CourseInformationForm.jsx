import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { setCourse, setStep } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload";
import ChipInput from "./ChipInput";
import RequirementsField from "./RequirementField";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI"
export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const token = JSON.parse(localStorage.getItem("token"));
  // const [loading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch data for categories
  const [courseCategories, setCourseCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchCourseCategories(token);
        const categories = data.map((category) => ({
          _id: category.id.toString(),
          name: category.name,
        }));
        console.log(categories);
        setCourseCategories(categories);
      } catch (error) {
        console.error("Failed to fetch course categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);
  useEffect(() => {
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
  }, [editCourse, course, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Create a new FormData instance
      const formData = new FormData();
  
      // Append the course data as a stringified JSON
      const courseDto = {
        courseName: data.courseTitle,
        courseDescription: data.courseShortDesc,
        whatYouWillLearn: data.courseBenefits,
        categoryName: data.courseCategory,
        instructions: data.courseRequirements,
        price: data.coursePrice,
        tag: data.courseTags,
      };
      formData.append("courseDto", new Blob([JSON.stringify(courseDto)], { type: "application/json" }));
  
      // Append the course image file
      if (data.courseImage && data.courseImage) {
        formData.append("file", data.courseImage);
      } else {
        throw new Error("Course image is required.");
      }
  
      // Check for edit mode and updated form
      if (editCourse && isFormUpdated()) {
        alert("Khóa học đã được cập nhật!");
        dispatch(setStep(2));
        dispatch(setCourse({ ...course }));
      } else if (editCourse) {
        alert("Không có thay đổi nào để lưu.");
      } else {
        console.log("Data to be added:", courseDto);
        console.log("Submitting FormData:", formData);
  
        const response = await addCourseDetails(formData, token);
        console.log("Course added successfully:", response);
        dispatch(setStep(2));
        dispatch(setCourse(response)); 
      }
    } catch (error) {
      console.error("Failed to add course:", error);
      alert("Failed to add course.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Tên khóa học */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Tên khóa học <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Nhập tên khóa học"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Tên khóa học là bắt buộc
          </span>
        )}
      </div>

      {/* Mô tả ngắn gọn */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Mô tả ngắn gọn <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Nhập mô tả ngắn gọn"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Mô tả khóa học là bắt buộc
          </span>
        )}
      </div>

      {/* Giá khóa học */}
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
            className="form-style w-full !pl-12"
          />
          <span className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400">
            ₫
          </span>
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Giá khóa học là bắt buộc
          </span>
        )}
      </div>

      {/* Danh mục khóa học */}
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
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?.name}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Danh mục khóa học là bắt buộc
          </span>
        )}
      </div>

      {/* Thẻ khóa học */}
      <ChipInput
        label="Thẻ"
        name="courseTags"
        placeholder="Nhập thẻ và nhấn Enter hoặc dấu phẩy"
        register={register}
        errors={errors}
        setValue={setValue}
      />

      {/* Ảnh đại diện khóa học */}
      <Upload
        name="courseImage"
        label="Ảnh đại diện khóa học"
        register={register}
        setValue={setValue}
        errors={errors}
        video={false}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Lợi ích của khóa học */}
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
            Lợi ích của khóa học là bắt buộc
          </span>
        )}
      </div>

      {/* Yêu cầu/Chỉ dẫn */}
      <RequirementsField
        name="courseRequirements"
        label="Yêu cầu/Chỉ dẫn"
        register={register}
        setValue={setValue}
        errors={errors}
      />

      {/* Nút tiếp theo */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md py-[8px] px-[20px] font-semibold
              text-richblack-900 bg-richblack-300 hover:bg-richblack-900 hover:text-richblack-300 duration-300`}
          >
            Tiếp tục không lưu
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Tiếp theo" : "Lưu thay đổi"}
          onClick={handleSubmit(onSubmit)}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
}