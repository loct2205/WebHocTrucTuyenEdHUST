import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload";
import {createSubSection, updateSubSectionInfo, updateSubSectionVideo, fetchCourseDetails} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast"

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const { course } = useSelector((state) => state.course);
  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, [view, edit, modalData, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    }
    return false;
  };

  const handleEditSubsection = async () => {
    const currentValues = getValues(); 
    if (isFormUpdated()) {
      if (currentValues.lectureVideo !== modalData.videoUrl) {
        const formData = new FormData();
        formData.append("file", currentValues.lectureVideo);
        const responseStatus = await updateSubSectionVideo(modalData.id, formData, modalData.sectionId, token);
        if (responseStatus !== 200) {
          throw new Error("Failed to update video");
        }
      }
      if (currentValues.lectureTitle !== modalData.title || currentValues.lectureDesc !== modalData.description) {
        const subSectionDto = {
          title : currentValues.lectureTitle,
          description : currentValues.lectureDesc,
        }
        console.log("subSectionDto: ", JSON.stringify(subSectionDto));
        const responseStatus = await updateSubSectionInfo(modalData.id, JSON.stringify(subSectionDto), modalData.sectionId, token);
        if (responseStatus !== 200) {
          throw new Error("Failed to update subsection info");
        }
      }
      const updatedCourse = await fetchCourseDetails(course.id, token);
      if (updatedCourse) {
        dispatch(setCourse(updatedCourse));
      } else {
        throw new Error("Failed to fetch updated course details");
      }
      toast.success("Lecture Updated")
    } else {
      alert("Không có thay đổi nào được thực hiện.");
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      handleEditSubsection();
      return;
    }
    const formData = new FormData(); 
    const subSectionDto = {
      title : data.lectureTitle,
      description : data.lectureDesc,
    }
    formData.append("subSectionDto", new Blob([JSON.stringify(subSectionDto)], { type: "application/json" }))
    formData.append("file", data.lectureVideo); 
    formData.append("sectionId", modalData.sectionId);
    const createdSubsection = await createSubSection(formData, token);
    if (createdSubsection) {
      const courseId = course.id;
      const courseDetail = await fetchCourseDetails(courseId, token);
      if (courseDetail) {
        dispatch(setCourse(courseDetail));
      } else {
        throw new Error("Failed to fetch updated course details");
      }
    } else {
      throw new Error("Failed to create new subsection.");
    }
    alert("Đã thêm bài giảng mới thành công!");
    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Tiêu đề Modal */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Xem"} {add && "Thêm"} {edit && "Chỉnh sửa"} bài giảng
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Nội dung Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Upload Video Bài Giảng */}
          <Upload
            name="lectureVideo"
            label="Video bài giảng"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          {/* Tiêu đề Bài Giảng */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Tiêu đề bài giảng{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Nhập tiêu đề bài giảng"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Tiêu đề bài giảng là bắt buộc
              </span>
            )}
          </div>
          {/* Mô tả Bài Giảng */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Mô tả bài giảng {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Nhập mô tả bài giảng"
              {...register("lectureDesc", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Mô tả bài giảng là bắt buộc
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={loading ? "Đang xử lý..." : edit ? "Lưu thay đổi" : "Lưu"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
