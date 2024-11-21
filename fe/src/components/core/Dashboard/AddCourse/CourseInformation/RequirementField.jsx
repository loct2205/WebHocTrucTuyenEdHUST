import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function RequirementsField({ name, label, register, setValue, errors }) {
  // Lấy dữ liệu từ Redux store
  const { editCourse, course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  // Khởi tạo danh sách yêu cầu khi chỉnh sửa
  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions || []);
    }
    register(name, { required: true, validate: (value) => value.length > 0 }, requirementsList);
  }, [editCourse, course, name, register, requirementsList]);

  // Cập nhật giá trị mỗi khi danh sách thay đổi
  useEffect(() => {
    setValue(name, requirementsList);
  }, [requirementsList, setValue, name]);

  // Thêm yêu cầu
  const handleAddRequirement = () => {
    if (requirement && !requirementsList.includes(requirement)) {
      setRequirementsList([...requirementsList, requirement]);
      setRequirement("");
    }
  };

  // Xóa yêu cầu
  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList];
    updatedRequirements.splice(index, 1);
    setRequirementsList(updatedRequirements);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          placeholder="Nhập yêu cầu và nhấn Thêm"
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Thêm
        </button>
      </div>

      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300"
                onClick={() => handleRemoveRequirement(index)}
              >
                <RiDeleteBin6Line className="text-pink-200 text-sm hover:scale-125 duration-200" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} là bắt buộc
        </span>
      )}
    </div>
  );
}
