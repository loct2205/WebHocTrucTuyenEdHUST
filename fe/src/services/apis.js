const BASE_URL = 'http://localhost:8080'; 
// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/send-otp", //DONE
    SIGNUP_API: BASE_URL + "/auth/signup", //DONE
    LOGIN_API: BASE_URL + "/auth/login", //DONE
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token", //DONE
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password", //DONE
    CHANGE_PASSWORD: BASE_URL + "/auth/change-password", //DONE
}


// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profiles", //DONE
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profiles/course-enrolled", //DONE
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profiles/instructor-dashboard", //DONE
}

// ADMIN ENDPOINTS
export const adminEndPoints = {
  GET_ALL_STUDENTS_DATA_API: BASE_URL + "/profiles/all-student", //DONE
  GET_ALL_INSTRUCTORS_DATA_API: BASE_URL + "/profiles/all-instructor", //DONE
}


// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payments/submit-order", //DONE
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  // course
  GET_ALL_COURSE_API: BASE_URL + "/courses",
  COURSE_DETAILS_API: BASE_URL + "/courses/", // + /id
  EDIT_COURSE_API: BASE_URL + "/courses/edit/", // + /id
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/courses/instructor", // + /id
  DELETE_COURSE_API: BASE_URL + "/courses/delete/", // + /id
  CREATE_COURSE_API: BASE_URL + "/courses/create",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",

  // section 
  CREATE_SECTION_API: BASE_URL + "/sections/create", // ?courseId=123
  UPDATE_SECTION_API: BASE_URL + "/sections/update-name/", // + /id?newName=sectionName
  DELETE_SECTION_API: BASE_URL + "/sections/delete/", // +/id
  
  // subsection
  CREATE_SUBSECTION_API: BASE_URL + "/subsections/create",
  DELETE_SUBSECTION_API: BASE_URL + "/subsections/delete/",
  UPDATE_SUBSECTION_INFO_API: BASE_URL + "/subsections/update/",
  UPDATE_SUBSECTION_VIDEO_API: BASE_URL + "/subsections/update-video/",
  // category
  COURSE_CATEGORIES_API: BASE_URL + "/category",
  CREATE_NEW_CATEGORY: BASE_URL + "/category/create",
  DELETE_CATEGORY: BASE_URL + "/category/delete/",
  
  // course progress
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",

  // course rating
  CREATE_RATING_API: BASE_URL + "/course/createRating",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/ratings", // DONE
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/category",
}

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profiles/avatar", //DONE
  UPDATE_PROFILE_API: BASE_URL + "/profiles", //DONE
  CHANGE_PASSWORD_API: BASE_URL + "/auth/change-password", //DONE
  DELETE_PROFILE_API: BASE_URL + "/profiles", //DONE
}