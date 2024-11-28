import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

// Component chức năng ChipInput
export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
}) {
  // Trạng thái cho các thẻ (chips)
  const [chips, setChips] = useState([]);

  // Lấy dữ liệu từ Redux
  const { editCourse, course } = useSelector((state) => state.course);

  useEffect(() => {
    // Nếu đang chỉnh sửa, gán giá trị mặc định từ Redux
    if (editCourse && course?.tag?.length > 0) {
      setChips(course.tag); // Gán các thẻ (chips) từ course.tag
    }

    // Đăng ký trường với React Hook Form
    if (register) {
      register(name, {
        required: true,
        validate: (value) => value.length > 0,
      });
    }
  }, [editCourse, course?.tag, register, name]); // Không thêm `course` vào dependency để tránh gọi lại không cần thiết

  // Cập nhật giá trị mỗi khi trạng thái chips thay đổi
  useEffect(() => {
    if (setValue) {
      setValue(name, chips);
    }
  }, [chips, setValue, name]);

  // Xử lý khi người dùng nhập thẻ mới
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();
      if (
        chipValue &&
        !chips.some((chip) => chip.toLowerCase() === chipValue.toLowerCase())
      ) {
        setChips([...chips, chipValue]);
        event.target.value = "";
      }
    }
  };

  // Xóa một thẻ
  const handleDeleteChip = (chipIndex) => {
    const updatedChips = chips.filter((_, index) => index !== chipIndex);
    setChips(updatedChips);
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* Nhãn của trường input */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      {/* Vùng hiển thị thẻ và ô nhập liệu */}
      <div className="flex w-full flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}

        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder || "Nhập và nhấn Enter"}
          onKeyDown={handleKeyDown}
          maxLength={50}
          className="form-style w-full"
        />
      </div>

      {/* Hiển thị lỗi nếu có */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} là bắt buộc
        </span>
      )}
    </div>
  );
}
