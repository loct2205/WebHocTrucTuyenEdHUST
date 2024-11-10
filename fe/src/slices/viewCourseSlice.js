import { createSlice } from "@reduxjs/toolkit"

// Dữ liệu mẫu
const initialState = {
  courseSectionData: [
    {
      _id: "section1",
      sectionName: "Section 1",
      subSection: [
        { _id: "sub1", title: "Subsection 1-1" },
        { _id: "sub2", title: "Subsection 1-2" },
      ],
    },
    {
      _id: "section2",
      sectionName: "Section 2",
      subSection: [
        { _id: "sub3", title: "Subsection 2-1" },
        { _id: "sub4", title: "Subsection 2-2" },
      ],
    },
  ],
  courseEntireData: {
    courseName: "Example Course",
    thumbnail: "example-thumbnail-url",
  },
  completedLectures: ["sub1"], // Đã hoàn thành
  totalNoOfLectures: 4,
}

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload
    },
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
    },
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload]
    },

    setFakeData: (state) => {
      state.courseSectionData = initialState.courseSectionData
      state.courseEntireData = initialState.courseEntireData
      state.completedLectures = initialState.completedLectures
      state.totalNoOfLectures = initialState.totalNoOfLectures
    },
  },
})

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
  setFakeData, 
} = viewCourseSlice.actions

export default viewCourseSlice.reducer
