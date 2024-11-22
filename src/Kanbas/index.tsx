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
    src: "/images/AncientChinese.jpg"
  });

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchCourses = async () => {
    try {
      // console.log("Fetching courses...");
      const courses = await userClient.findMyCourses();
      // console.log("Backend response:", courses); // Log the fetched data
      setCourses(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const addNewCourse = async () => {
    const newCourse = {
      ...course,
      _id: new Date().getTime().toString(),
    };
  
    try {
      await userClient.createCourse(newCourse); // Add course to the backend
      await fetchCourses(); // Refetch all courses
      setCourses([...courses, newCourse]);
      setCourse({ ...course, name: "New Course", description: "New Description" }); 
      // Reset form
    } catch (error) {
      console.error("Error adding new course:", error);
    }
  };

  const deleteCourse = async (courseId: string) => {
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

  useEffect(() => {
    // console.log("Current User:", currentUser);
    fetchCourses();
  }, [currentUser]);

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
