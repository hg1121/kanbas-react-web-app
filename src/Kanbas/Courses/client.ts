import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const USERS_API = `${REMOTE_SERVER}/api/users`;


//***** courses
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

//*** Modules */
export const findModulesForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
    const response = await axios.post(
      `${COURSES_API}/${courseId}/modules`,
      module
    );
    return response.data;
};
  
// **** Assignments
export const fetchAssignments = async (courseId: string) => {
    // console.log("API URL:", `${COURSES_API}/${courseId}/assignments`);
    const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
}

export const createAssignment = async (courseId: string, assignment: any) => {
    // console.log("new assignment:", assignment);
    // console.log("url:", );
    const response = await axios.post(`${COURSES_API}/${courseId}/assignments/${assignment._id}`, assignment);
    return response.data;
}

export const updateAssignment = async (courseId: string, assignment: any) => {
    const { data } = await axios.put(`${COURSES_API}/${courseId}/assignments/${assignment._id}`, assignment);
    return data;
}

export const deleteAssignment = async (courseId: string, assignmentId: any) => {
    // console.log("assignmentId", assignmentId);
    const { data } = await axios.delete(`${COURSES_API}/${courseId}/assignments`, {
        data: { assignmentId },
    });
    // console.log(data);
    return data;
}


// ****** Enrollments
export const addEnrollment = async (userId: string, courseId: string) => {
    await axios.post(`${USERS_API}/${userId}/courses/${courseId}`)
}

export const deleteEnrollment = async(userId: string, courseId: string) => {
    // console.log('here', courseId, `${USERS_API}/${courseId}`)
    await axios.delete(`${USERS_API}/${userId}/courses/${courseId}`)
}
