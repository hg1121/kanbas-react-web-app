import { Link } from "react-router-dom";
import * as db from "./Database";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";
import store from "./store";
import { useEffect, useState} from "react";
import { addEnrollment, deleteEnrollment } from "./reducer";
import * as courseClient from "./Courses/client";

export default function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment  }: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; enrolling: boolean; setEnrolling: (enrolling: boolean) => void; 
  updateEnrollment: (courseId: string, enrolled: boolean) => void })
  { 
    const dispatch = useDispatch();
    const {currentUser } = useSelector((state: any) => state.accountReducer);
    const {enrollments} = useSelector((state: any) => state.enrollmentsReducer);
    
    const handleUpdateButton = () => {
      updateCourse();
      setCourse({ ...course, name: "New Course", description: "New Description", src: "/images/AncientChinese.jpg" }); 
    }

    const handleAddButton = (e: React.FormEvent) => {
      e.preventDefault();
      addNewCourse();  
    } 

    const handleDeleteCourseButton = (e: any, course: any) => {
      e.preventDefault();
      // Delete the corresponding enrollment
      // dispatch(deleteEnrollment({ userId: currentUser._id, cid: cid }));
      updateEnrollment(course._id, false);
      deleteCourse(course._id);
    }
    
    const [enrollmentStatuses, setEnrollmentStatuses] = useState<{ [key: string]: boolean }>({});

    const fetchEnrollmentStatuses = async (courseId: any) => {
      const response = await courseClient.checkUserEnrollment(currentUser._id, courseId);
      return response;
    };

    useEffect(() => {
      const fetchEnrollments = async () => {
        const statuses: { [key: string]: boolean } = {};

        // Use Promise.all to await all the async operations concurrently
        await Promise.all(
          courses.map(async (course) => {
            const isEnrolled = await fetchEnrollmentStatuses(course._id);
            statuses[course._id] = isEnrolled;
          })
        );

        setEnrollmentStatuses(statuses); // Update the state with enrollment statuses
      };

      fetchEnrollments(); // Fetch enrollments when component mounts or courses change
    }, [currentUser, courses]);

  return (
    <Provider store={store}>
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary rounded-1" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      {currentUser.role === "FACULTY" && <><h5>New Course
          <button className="btn btn-primary float-end rounded-1 me-2"
                  id="wd-add-new-course-click"
                  type="button"
                  onClick={(e) => {handleAddButton(e)}} > Add </button>
          <button className="btn btn-warning float-end me-2 rounded-1"
                  onClick={handleUpdateButton} id="wd-update-course-click">
            Update
          </button>
      </h5><hr /> 
      <input value={course.name} className="form-control mb-2"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <textarea value={course.description} className="form-control"
             onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
      </>}
      <h2 id="wd-dashboard-published"> Published Courses ({courses.length})</h2> 
      
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
          courses.map((course, index) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }} key={index}>
              <div className="card rounded-3 overflow-hidden">
                <Link to={`/Kanbas/Courses/${course._id}/Home` }
                      className="wd-dashboard-course-link text-decoration-none text-dark" 
                      state={{ currentUser }}>
                  <img src={course.src} width="100%" height={160} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                        {enrolling && (
                          <button className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} 
                          onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !course.enrolled);
                          }}
    >
                            {course.enrolled ? "Unenroll" : "Enroll"}
                          </button>
                        )}
                      {course.name}
                    </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description}
                    </p>
                    <button className="btn btn-primary rounded-1"> Go </button>

                    {currentUser.role === "FACULTY" && 
                    <>
                    <button onClick={(event) => {handleDeleteCourseButton(event, course)}} className="btn btn-danger float-end rounded-1"
                    id="wd-delete-course-click">
                    Delete
                   </button>

                   <button id="wd-edit-course-click"
                    onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                    }}
                    className="btn btn-warning me-2 float-end rounded-1" >
                    Edit
                  </button>
                  </>
                  }
                  </div>
                </Link>
              </div>
            </div>
          )))}

          {(currentUser.role === "STUDENT" || currentUser.role === "USER") &&
            courses.map((course:any) => {
              const isEnrolled = enrollmentStatuses[course._id];
              return (
                <div className="wd-dashboard-course col" style={{ width: "300px" }} key={course._id}>
                  <div className="card rounded-3 overflow-hidden">
                      <img src={course.src} width="100%" height={160} />
                      <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title">
                          {course.name}</h5>
                        <p
                          className="wd-dashboard-course-title card-text overflow-y-hidden"
                          style={{ maxHeight: 100 }}
                        >
                          {course.description}
                        </p>
                        <Link
                          to={isEnrolled ? `/Kanbas/Courses/${course._id}/Home` : "#"}
                          className={`wd-dashboard-course-link text-decoration-none text-dark ${
                            !isEnrolled && "disabled-link"
                          }`}
                          state={{ currentUser }}
                          onClick={(e) => {
                            // if (!isEnrolled) {
                            //   e.preventDefault(); // Prevent navigation
                            //   alert("You need to enroll in this course first.");
                            // }
                          }}
                        >
  <button className="btn btn-primary rounded-1">Go</button>
</Link>
                        {enrolling && (
                          <button className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} 
                          onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !course.enrolled);
                          }}
    >
                            {course.enrolled ? "Unenroll" : "Enroll"}
                          </button>
                        )}
                      </div>
                   
                  </div>
                </div>
              );
            })}

        </div>
      </div>
    </div>
    </Provider>
  );
}

export {};
