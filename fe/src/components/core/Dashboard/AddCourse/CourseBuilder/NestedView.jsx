import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { deleteSection, fetchCourseDetails} from "../../../../../services/operations/courseDetailsAPI"

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
          throw new Error("Failed to fetch updated course details");
        }
      } else {
        throw new Error("Failed to delete section");
      }
      console.log("Deleted section:", sectionId);
      setConfirmationModal(null);
    } catch (error) {
      console.error("Failed to delete section:", error);
    }
  };

  // Handle subsection deletion
  const handleDeleteSubSection = (subSectionId, sectionId) => {
    const updatedSections = course.sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            subSections: section.subSections.filter((sub) => sub.id !== subSectionId),
          }
        : section
    );
    const updatedCourse = { ...course, sections: updatedSections };
    dispatch(setCourse(updatedCourse));
    console.log("Deleted subsection:", subSectionId);
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
                      text1: "Delete this section?",
                      text2: "All subsections within this section will be deleted.",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
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
                          text1: "Delete this subsection?",
                          text2: "This subsection will be deleted.",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
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
                onClick={() => setAddSubsection(section.id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus className="text-lg" />
                <p>Add Subsection</p>
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
