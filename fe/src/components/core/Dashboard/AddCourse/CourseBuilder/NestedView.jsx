import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";

import { setCourse } from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";

export default function NestedView({ handleChangeEditSectionName }) {
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course || { course: { courseContent: [] } });

  // Trạng thái theo dõi chế độ của modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  // Theo dõi trạng thái của modal xác nhận
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Xử lý xóa phần
  const handleDeleteSection = (sectionId) => {
    const updatedCourseContent = course.courseContent.filter(
      (section) => section._id !== sectionId
    );
    const updatedCourse = { ...course, courseContent: updatedCourseContent };
    dispatch(setCourse(updatedCourse));
    console.log("Phần đã xóa:", sectionId);
    setConfirmationModal(null);
  };

  // Xử lý xóa bài giảng
  const handleDeleteSubSection = (subSectionId, sectionId) => {
    const updatedCourseContent = course.courseContent.map((section) =>
      section._id === sectionId
        ? {
            ...section,
            subSection: section.subSection.filter(
              (subSection) => subSection._id !== subSectionId
            ),
          }
        : section
    );
    const updatedCourse = { ...course, courseContent: updatedCourseContent };
    dispatch(setCourse(updatedCourse));
    console.log("Bài giảng đã xóa:", subSectionId);
    setConfirmationModal(null);
  };

  return (
    <>
      <div className="rounded-2xl bg-richblack-700 p-6 px-8" id="nestedViewContainer">
      {course?.courseContent?.map((section, index) => (
  <details key={section._id || index} open>
    <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
      <div className="flex items-center gap-x-3">
        <RxDropdownMenu className="text-2xl text-richblack-50" />
        <p className="font-semibold text-richblack-50">{section.sectionName}</p>
      </div>
      <div className="flex items-center gap-x-3">
        <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
          <MdEdit className="text-xl text-richblack-300" />
        </button>
        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Xóa phần này?",
              text2: "Tất cả bài giảng trong phần này sẽ bị xóa",
              btn1Text: "Xóa",
              btn2Text: "Hủy",
              btn1Handler: () => handleDeleteSection(section._id),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
        >
          <RiDeleteBin6Line className="text-xl text-richblack-300" />
        </button>
        <span className="font-medium text-richblack-300">|</span>
        <AiFillCaretDown className={`text-xl text-richblack-300`} />
      </div>
    </summary>
    <div className="px-6 pb-4">
      {section.subSection.map((data, subIndex) => (
        <div
          key={data?._id || `${section._id}-${subIndex}`}
          onClick={() => setViewSubSection(data)}
          className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
        >
          <div className="flex items-center gap-x-3 py-2">
            <RxDropdownMenu className="text-2xl text-richblack-50" />
            <p className="font-semibold text-richblack-50">{data.title}</p>
          </div>
          <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-x-3">
            <button onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
              <MdEdit className="text-xl text-richblack-300" />
            </button>
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Xóa bài giảng này?",
                  text2: "Bài giảng này sẽ bị xóa",
                  btn1Text: "Xóa",
                  btn2Text: "Hủy",
                  btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
            >
              <RiDeleteBin6Line className="text-xl text-richblack-300" />
            </button>
          </div>
        </div>
      ))}
      <button onClick={() => setAddSubsection(section._id)} className="mt-3 flex items-center gap-x-1 text-yellow-50">
        <FaPlus className="text-lg" />
        <p>Thêm bài giảng</p>
      </button>
    </div>
  </details>
))}

      </div>

      {/* Hiển thị modal */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : null}

      {/* Modal xác nhận */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : null}
    </>
  );
}
