import { useEffect, useState } from "react";
import IconBtn from '../../common/IconBtn';

import { IoIosAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

// loading skeleton
const LoadingSkeleton = () => {
  return (
    <div className="flex  flex-col gap-6 ">
      <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
      <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
      <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
      <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
    </div>
  );
};

const CreateCategory = () => {
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [description, setDescription] = useState('');

  // Dữ liệu mẫu ban đầu
  const initialCategories = [
    { _id: "1", name: "Lập trình", description: "Khóa học lập trình cơ bản" },
    { _id: "2", name: "Thiết kế", description: "Khóa học về thiết kế đồ họa" },
    { _id: "3", name: "Phân tích dữ liệu", description: "Khóa học phân tích dữ liệu nâng cao" },
  ];

  // Giả lập fetch dữ liệu
  useEffect(() => {
    const fetchSublinks = async () => {
      setLoading(true);
      // Giả lập thời gian tải dữ liệu
      setTimeout(() => {
        setSubLinks(initialCategories);
        setLoading(false);
      }, 1000);
    };

    fetchSublinks();
  }, []);

  // Thêm danh mục mới
  const handleCreateCategory = () => {
    const newCategoryData = {
      _id: `${Date.now()}`, // Tạo ID giả
      name: newCategory,
      description,
    };
    setSubLinks((prev) => [...prev, newCategoryData]);
    setNewCategory('');
    setDescription('');
  };

  // Xóa danh mục
  const handleDeleteCategory = (categoryId) => {
    setSubLinks((prev) => prev.filter((category) => category._id !== categoryId));
  };

  return (
    <div className="border-[1px] border-richblack-700 rounded-2xl bg-richblack-800 p-8 px-7 sm:px-12">
      <h1 className="mb-14 text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
        Tạo Danh Mục
      </h1>

      <div className='flex flex-col sm:flex-row gap-5 items-center'>
        <div className="flex flex-col w-full gap-5">
          <input
            type='text'
            value={newCategory}
            placeholder="Nhập tên danh mục"
            onChange={(e) => setNewCategory(e.target.value)}
            className="text-white pl-4 w-full h-10 bg-transparent border-2 border-yellow-500 focus:border-none outline-yellow-10 rounded-2xl"
          />
          <input
            type='text'
            value={description}
            placeholder="Nhập mô tả danh mục"
            onChange={(e) => setDescription(e.target.value)}
            className="text-white pl-4 w-full h-20 bg-transparent border-2 border-yellow-500 focus:border-none outline-yellow-10 rounded-2xl"
          />
        </div>

        <IconBtn
          text="Thêm"
          onclick={handleCreateCategory}
          disabled={!newCategory || !description}
        >
          <IoIosAdd />
        </IconBtn>
      </div>

      <div className="mt-10 flex flex-col gap-6 text-white">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          subLinks?.map((subLink, i) => (
            <div key={i} className="flex justify-between gap-10">
              <p>{subLink.name}</p>
              <button onClick={() => handleDeleteCategory(subLink._id)}>
                <RiDeleteBin6Line className="hover:text-pink-200" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CreateCategory;
