const BASE_URL = 'http://localhost:8080'; 
// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/send-otp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    CHANGE_PASSWORD: BASE_URL + "/auth/change-password",
}


// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profiles",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profiles/course-enrolled",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profiles/instructor-dashboard",
}

// ADMIN ENDPOINTS
export const adminEndPoints = {
  GET_ALL_STUDENTS_DATA_API: BASE_URL + "/profiles/all-student",
  GET_ALL_INSTRUCTORS_DATA_API: BASE_URL + "/profiles/all-instructor",
}


// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  // course
  GET_ALL_COURSE_API: BASE_URL + "/courses",
  COURSE_DETAILS_API: BASE_URL + "/courses/", // + id
  EDIT_COURSE_API: BASE_URL + "/courses/edit/", // + id
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/courses/instructor/", // + id
  DELETE_COURSE_API: BASE_URL + "/courses/delete/", // + id
  CREATE_COURSE_API: BASE_URL + "/courses/create",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",

  // section 
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  
  // subsection
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",

  // category
  COURSE_CATEGORIES_API: BASE_URL + "/category",
  CREATE_NEW_CATEGORY: BASE_URL + "/course/createCategory",
  DELETE_CATEGORY: BASE_URL + "/course/deleteCategory",
  
  // course progress
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",

  // course rating
  CREATE_RATING_API: BASE_URL + "/course/createRating",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/ratings",
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
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profiles/avatar",
  UPDATE_PROFILE_API: BASE_URL + "/profiles",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/change-password",
  DELETE_PROFILE_API: BASE_URL + "/profiles",
}