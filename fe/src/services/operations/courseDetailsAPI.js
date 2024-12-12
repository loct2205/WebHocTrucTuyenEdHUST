import { toast } from "react-hot-toast"

//import { updateCompletedLectures } from "../../slices/viewCourseSlice"
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"

const {
  PUBLISH_COURSE_API,
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_INFO_API,
  UPDATE_SUBSECTION_VIDEO_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
  CREATE_NEW_CATEGORY,
  DELETE_CATEGORY
} = courseEndpoints


// ================ createNewCategory ================
export const createNewCategory = async (name, description, token) => {
  const toastId = toast.loading("Đang tải...")

  try {
    const response = await apiConnector("POST", CREATE_NEW_CATEGORY, { name, description }, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE_NEW_CATEGORY RESPONSE............", response)
    if (!response.data) {
      console.log("Không thể tạo danh mục mới")
    }

    toast.success("Đã tạo danh mục mới!")
  } catch (error) {
    console.log("CREATE_NEW_CATEGORY API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  toast.dismiss(toastId)
}


// ================ delete Category ================
export const deleteCategory = async (categoryId, token) => {
  const toastId = toast.loading("Đang tải...")

  try {
    const response = await apiConnector("DELETE", DELETE_CATEGORY + `${categoryId}`, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE_CATEGORY RESPONSE............", response)
    if (response.status != 200) {
      console.log("Không thể xóa danh mục")
    }

    toast.success("Đã xóa danh mục!")
  } catch (error) {
    console.log("DELETE_CATEGORY API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  toast.dismiss(toastId)
}


// ================ get All Courses ================
export const getAllCourses = async () => {
  const toastId = toast.loading("Đang tải...")
  let result = []

  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API)
    if (!response?.data?.success) {
      throw new Error("Không thể lấy thông tin các khóa học")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_COURSE_API API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ fetch Course Details ================
export const fetchCourseDetails = async (courseId, token) => {
  let result = null;

  try {
    const response = await apiConnector("GET", COURSE_DETAILS_API + `${courseId}`, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data) {
      throw new Error('Fetch course deatil failed!')
    }
    result = response.data
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error)
  }
  return result
}

// ================ fetch Course Categories ================
export const fetchCourseCategories = async () => {
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API, null);
    return response.data; 
  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error);
    toast.error("Lỗi: " + error.message);
    throw error;
  }
};


// ================ add Course Details ================
export const addCourseDetails = async (data, token) => {
  const toastId = toast.loading("Đang tải...")
  let result = null;

  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE COURSE API RESPONSE............", response)
    if (response?.status != 200) {
      throw new Error("Tạo khóa học không thành công!"); 
    }
    result = response?.data
    toast.success("Thông tin khóa học đã được thêm thành công")
    return result; 
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  } finally {
    toast.dismiss(toastId)
  }
}


// ================ edit Course Details ================
export const editCourseDetails = async (id, data, token) => {
  let result = null
  const toastId = toast.loading("Đang tải...")

  try {
    const response = await apiConnector("POST", EDIT_COURSE_API + `${id}`, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT COURSE API RESPONSE............", response)

    if (response.status != 200) {
      throw new Error("Không thể cập nhật thông tin khóa học")
    }

    result = response?.data
    toast.success("Thông tin khóa học đã được cập nhật thành công")
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const publishCourse = async (id, isPublic, token) => {
  let result = null
  const toastId = toast.loading("Đang tải...")

  try {
    const response = await apiConnector("PATCH", PUBLISH_COURSE_API, null, {
      Authorization: `Bearer ${token}`,
    }, 
    {
      id: id, 
      isPublic: isPublic
    })
    console.log("PUBLISH COURSE API RESPONSE............", response)

    if (response.status != 200) {
      throw new Error("Không thể xuất bản khóa học")
    }

    result = response?.status
    toast.success("Đã xuất bản khóa học thành công")
  } catch (error) {
    console.log("PUBLISH COURSE API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ create Section ================
export const createSection = async (data, token, courseId) => {
  let result = null
  const toastId = toast.loading("Đang tải...")

  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
      }, 
    {courseId : courseId}
    )
    console.log("CREATE SECTION API RESPONSE............", response)

    if (response?.status != 200) {
      throw new Error("Không thể tạo phần học")
    }
    
    result = response?.data
    toast.success("Đã tạo phần học thành công")
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ create SubSection ================
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Đang tải...")

  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response)

    if (response.status != 200) {
      throw new Error("Không thể thêm bài giảng")
    }

    result = response?.data
    toast.success("Bài giảng đã được thêm thành công")
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ Update Section ================
export const updateSection = async (sectionId, sectionName, token) => {
  let result = null
  const toastId = toast.loading("Đang tải...")

  try {
    const response = await apiConnector("PATCH", UPDATE_SECTION_API + `${sectionId}`, null, {
      Authorization: `Bearer ${token}`,
    }, 
    {
      newName: sectionName
    })
    console.log("UPDATE SECTION API RESPONSE............", response)

    if (response.status != 200) {
      throw new Error("Không thể cập nhật phần học")
    }

    result = response.status
    toast.success("Phần học đã được cập nhật thành công")
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ Update SubSection ================
export const updateSubSectionInfo = async (id, data, sectionId, token) => {
  let result = null

  try {
    const response = await apiConnector("PUT", UPDATE_SUBSECTION_INFO_API + `${id}`, data, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }, 
    {
      sectionId: sectionId,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)

    if (response.status != 200) {
      throw new Error("Không thể cập nhật bài giảng")
    }

    result = response?.status
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  return result
}

export const updateSubSectionVideo = async (id, formData, sectionId, token) => {
  let result = null

  try {
    const response = await apiConnector("PUT", UPDATE_SUBSECTION_VIDEO_API + `${id}`, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    }, 
    {
      sectionId: sectionId,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)

    if (!response?.status != 200) {
      throw new Error("Không thể cập nhật bài giảng")
    }

    result = response?.status
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  return result
}
  
// ================ delete Section ================
export const deleteSection = async (sectionId, token) => {
  let result = null
  const toastId = toast.loading("Đang tải...")

  try {
    const response = await apiConnector("DELETE", DELETE_SECTION_API + `${sectionId}`, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)

    if (response.status != 200) {
      throw new Error("Không thể xóa phần học")
    }

    result = response?.status
    toast.success("Đã xóa phần học")
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ delete SubSection ================
export const deleteSubSection = async (id, token) => {
  let result = null
  const toastId = toast.loading("Đang tải...")
  try {
    const response = await apiConnector("DELETE", DELETE_SUBSECTION_API + `${id}`, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (response.status != 200) {
      throw new Error("Không thể xóa bài giảng")
    }
    result = response?.status
    toast.success("Bài giảng đã được xóa")
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}

// ================ fetch Instructor Courses ================
export const fetchInstructorCourses = async (token, instructorId) => {
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      `${GET_ALL_INSTRUCTOR_COURSES_API}/${instructorId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("INSTRUCTOR COURSES API RESPONSE", response)
    if (!response?.data) {
      throw new Error("Không thể lấy thông tin các khóa học của giảng viên")
    }
    result = response?.data;
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  return result
}


// ================ delete Course ================
export const deleteCourse = async (courseId, token) => {
  const toastId = toast.loading("Đang tải...")
  let result = null
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API  + `${courseId}`, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE COURSE API RESPONSE............", response)
    if (response?.status != 200) {
      throw new Error("Không thể xóa khóa học")
    }
    toast.success("Khóa học đã bị xóa")
    result = response.status
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ get Full Details Of Course ================
export const getFullDetailsOfCourse = async (courseId, token) => {
  let result = null;

  try {
    const response = await apiConnector("GET", COURSE_DETAILS_API + `${courseId}`, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data) {
      throw new Error('Fetch course deatil failed!')
    }
    result = response.data
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error)
  }
  return result
}


// ================ mark Lecture As Complete ================
export const markLectureAsComplete = async (data, token) => {
  let result = null
  const toastId = toast.loading("Đang tải...")
  try {
    const response = await apiConnector("PUT", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("MARK_LECTURE_AS_COMPLETE_API API RESPONSE............", response)

    if (!response.data) {
      throw new Error('Cập nhật tiến độ khóa học không thành công!')
    }
    toast.success("Bài giảng đã hoàn thành")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error("Lỗi: " + error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}


// ================ create Course Rating  ================
export const createRating = async (data, token) => {
  const toastId = toast.loading("Đang tải...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data || !response?.data?.id) {
      throw new Error("Không thể tạo đánh giá")
    }
    toast.success("Đánh giá đã được tạo")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error("Lỗi: " + error.message)
  }
  toast.dismiss(toastId)
  return success
}
