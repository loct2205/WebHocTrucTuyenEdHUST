import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { deleteSection, fetchCourseDetails, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";

export default function NestedView({ handleChangeEditSectionName }) {
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course || { course: { sections: [] } });
  const token = JSON.parse(localStorage.getItem("token"));
  // State to track modal modes [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Handle section deletion
  const handleDeleteSection = async (sectionId) => {
    try {
      const deleteStatus = await deleteSection(sectionId, token);
      if (deleteStatus === 200) {
        const courseId = course.id;
        const courseDetail = await fetchCourseDetails(courseId, token);
        if (courseDetail) {
          dispatch(setCourse(courseDetail));
        } else {
          throw new Error("Không thể lấy thông tin khóa học đã cập nhật");
        }
      } else {
        throw new Error("Không thể xóa phần học");
      }
      console.log("Đã xóa phần học:", sectionId);
      setConfirmationModal(null);
    } catch (error) {
      console.error("Xóa phần học thất bại:", error);
    }
  };

  // Handle subsection deletion
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const responseStatus = await deleteSubSection(subSectionId, token);
    if (responseStatus !== 200) {
      throw new Error("Không thể xóa bài giảng");
    }
    const updatedCourse = await fetchCourseDetails(course.id, token);
    if (updatedCourse) {
      dispatch(setCourse(updatedCourse));
    }
    console.log("Đã xóa bài giảng:", subSectionId);
    setConfirmationModal(null);
  };

  return (
    <>
      <div className="rounded-2xl bg-richblack-700 p-6 px-8" id="nestedViewContainer">
        {course?.sections?.map((section) => (
          <details key={section.id} open>
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">{section.sectionName}</p>
              </div>
              <div className="flex items-center gap-x-3">
                <button onClick={() => handleChangeEditSectionName(section.id, section.sectionName)}>
                  <MdEdit className="text-xl text-richblack-300" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Bạn có chắc chắn muốn xóa phần học này?",
                      text2: "Tất cả bài giảng trong phần này sẽ bị xóa.",
                      btn1Text: "Xóa",
                      btn2Text: "Hủy",
                      btn1Handler: () => handleDeleteSection(section.id),
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
              {section.subSections?.map((subSection) => (
                <div
                  key={subSection.id}
                  onClick={() => setViewSubSection(subSection)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">{subSection.title}</p>
                  </div>
                  <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-x-3">
                    <button onClick={() => setEditSubSection({ ...subSection, sectionId: section.id })}>
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Bạn có chắc chắn muốn xóa bài giảng này?",
                          text2: "Bài giảng này sẽ bị xóa.",
                          btn1Text: "Xóa",
                          btn2Text: "Hủy",
                          btn1Handler: () => handleDeleteSubSection(subSection.id, section.id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setAddSubsection({ sectionId: section.id })}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus className="text-lg" />
                <p>Thêm bài giảng</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {/* Modals */}
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

      {confirmationModal ? <ConfirmationModal modalData={confirmationModal} /> : null}
    </>
  );
}
