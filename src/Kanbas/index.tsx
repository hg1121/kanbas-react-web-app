import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./index.css";
// import * as db from "./Database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import CourseImagesSrc from "./Courses/newCourseImage";

import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "1234",
    // _id: new Date().getTime().toString(),
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
    src: CourseImagesSrc
  });

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enrolling, setEnrolling] = useState<boolean>(false);

  const findCoursesForUser = async () => {
    try {
      // console.log("currentUser._id", currentUser._id);
      const courses = await userClient.findCoursesForUser(currentUser._id);

      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchCourses = async () => {
  //   try {
  //     // console.log("Fetching courses...");
  //     // const courses = await userClient.findMyCourses();
  //     const courses = await courseClient.fetchAllCourses();
  //     // console.log("Backend response:", courses); // Log the fetched data
  //     setCourses(courses);
  //   } catch (error) {
  //     console.error("Error fetching courses:", error);
  //   }
  // };
  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  }; 

  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteEnrollment(currentUser._id, courseId);
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
    // setCourse({...course, name: "New Course", description: "New Description"});
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    console.log("enrolled is:", enrolled);
    if (enrolled) {
      await courseClient.addEnrollment(currentUser._id, courseId);
    } else {
      await courseClient.deleteEnrollment(currentUser._id, courseId);
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  }; 

  useEffect(() => {
    // console.log("Current User:", currentUser);
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  return (
    <Session>
    <div id="wd-kanbas">
      <KanbasNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
              <Dashboard
                courses={courses}
                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}
                enrolling={enrolling} 
                setEnrolling={setEnrolling}
                updateEnrollment={updateEnrollment}
              />
              </ProtectedRoute>
            }
          />
          <Route path="/Courses/*" element={ <ProtectedRoute> <Courses courses={courses} /> </ProtectedRoute>} />
          {/* <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} /> */}
        </Routes>
      </div>
    </div>
    </Session>
    
  );
}

export {};
