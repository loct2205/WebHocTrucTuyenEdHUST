import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
}) {
  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (register) {
      register(name, { required: true, validate: (value) => value.length > 0 });
    }
  }, [register, name]);

  // Lưu thay đổi vào form
  useEffect(() => {
    setValue(name, chips);
  }, [chips, setValue, name]);

  // Thêm thẻ mới
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        setChips([...chips, chipValue]);
        event.target.value = "";
      }
    }
  };

  // Xóa thẻ
  const handleDeleteChip = (chipIndex) => {
    setChips((prevChips) => prevChips.filter((_, index) => index !== chipIndex));
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

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
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
      </div>

      {errors?.[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} là bắt buộc
        </span>
      )}
    </div>
  );
}
