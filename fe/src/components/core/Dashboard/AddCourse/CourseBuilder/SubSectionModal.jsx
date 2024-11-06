import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload.jsx";

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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, [modalData, setValue, view, edit]);

  const isFormUpdated = () => {
    if (view) return false;
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    );
  };

  const handleEditSubsection = () => {
    if (isFormUpdated()) {
      toast.success("Thông tin bài giảng đã được cập nhật!");
    } else {
      toast.error("Không có thay đổi nào để lưu");
    }
    setModalData(null);
  };

  const onSubmit = (data) => {
    if (view) return;

    setLoading(true);
    if (edit) {
      handleEditSubsection();
    } else if (add) {
      toast.success("Bài giảng mới đã được thêm vào khóa học!");
      // Thêm logic xử lý bài giảng mới vào danh sách khóa học
    }
    setLoading(false);
    setModalData(null);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
       
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Xem"} {add && "Thêm"} {edit && "Chỉnh sửa"} Bài giảng
          </p>
          <button onClick={() => setModalData(null)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
        
          <Upload
            name="lectureVideo"
            label="Video Bài giảng"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Tiêu đề bài giảng {!view && <sup className="text-pink-200">*</sup>}
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
          
         
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Mô tả bài giảng {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Nhập mô tả bài giảng"
              {...register("lectureDesc", { required: true })}
              className="form-style resize-none min-h-[130px] w-full"
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
