import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";

import ConfirmationModal from "../../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal.jsx";

export default function NestedView({ handleChangeEditSectionName }) {
  // Fake data
  const [courseContent, setCourseContent] = useState([
    {
      id: 1,
      sectionName: "Phần 1: Giới thiệu",
      subSection: [
        { id: 1, title: "Bài giảng 1.1: Giới thiệu về khóa học" },
        { id: 2, title: "Bài giảng 1.2: Lịch trình khóa học" },
      ],
    },
    {
      id: 2,
      sectionName: "Phần 2: Nội dung chính",
      subSection: [{ id: 3, title: "Bài giảng 2.1: Kiến thức cơ bản" }],
    },
  ]);

  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = (sectionId) => {
    const updatedContent = courseContent.filter(
      (section) => section.id !== sectionId
    );
    setCourseContent(updatedContent);
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = (subSectionId, sectionId) => {
    const updatedContent = courseContent.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            subSection: section.subSection.filter(
              (sub) => sub.id !== subSectionId
            ),
          }
        : section
    );
    setCourseContent(updatedContent);
    setConfirmationModal(null);
  };

  return (
    <>
      <div
        className="rounded-2xl bg-richblack-700 p-6 px-8"
        id="nestedViewContainer"
      >
        {courseContent.map((section) => (
          <details key={section.id} open>
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(section.id, section.sectionName)
                  }
                >
                  <MdEdit className="text-xl text-richblack-300" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Xóa phần này?",
                      text2: "Toàn bộ bài giảng trong phần này sẽ bị xóa",
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
                <AiFillCaretDown className="text-xl text-richblack-300" />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {section.subSection.map((data) => (
                <div
                  key={data.id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section.id })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Xóa bài giảng này?",
                          text2: "Bài giảng này sẽ bị xóa",
                          btn1Text: "Xóa",
                          btn2Text: "Hủy",
                          btn1Handler: () =>
                            handleDeleteSubSection(data.id, section.id),
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
                onClick={() => setAddSubsection(section.id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus className="text-lg" />
                <p>Thêm bài giảng</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
