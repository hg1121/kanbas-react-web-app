import { Link } from "react-router-dom";
import * as db from "./Database";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";
import store from "./store";
import { useEffect, useState} from "react";
import { addEnrollment, deleteEnrollment } from "./reducer";

export default function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; })

  { 
    const dispatch = useDispatch();
    const {currentUser } = useSelector((state: any) => state.accountReducer);
    const {enrollments} = useSelector((state: any) => state.enrollmentsReducer);
    
    const [displayAll, setDisplayAll] = useState(false);
    const [displayCourses, setDisplayCourses] = useState(courses.filter((course) =>
            enrollments.some(
              (enrollment:any) =>
                enrollment.user === currentUser._id &&
                enrollment.course === course._id
          )));
  // console.log(currentUser);

    const filteredCourses = courses.filter((course) =>
      enrollments.some(
        (enrollment:any) =>
          enrollment.user === currentUser._id &&
          enrollment.course === course._id
      )) 

    const handleUpdateButton = () => {
      updateCourse();
      setDisplayCourses(courses.filter((course) =>
        enrollments.some(
            (enrollment: any) =>
                enrollment.user === currentUser._id &&
                enrollment.course === course._id
        )
      ));
    }

    const handleAddButton = (event: React.FormEvent) => {
      // event.preventDefault();
      // console.log('here');
      // we need to make this coursed enrolled by current user
      dispatch(addEnrollment(
        {
          "_id": new Date().getTime().toString(), 
          "user": currentUser._id, 
          "course": course._id
      }))

      // then add the new course
      addNewCourse();  
      // console.log(course._id);
      // console.log(enrollments);

      // Update displayCourses after the new enrollment is added
      setDisplayCourses(courses.filter((course) =>
        enrollments.some(
            (enrollment: any) =>
                enrollment.user === currentUser._id &&
                enrollment.course === course._id
        )
      ));
    } 

    const handleDeleteCourseButton = (e: any, cid: any) => {
      e.preventDefault();
      deleteCourse(cid);
      console.log(currentUser._id, cid);

      // Delete the corresponding enrollment
      dispatch(deleteEnrollment({ userId: currentUser._id, cid: cid }));

      // setCourses(courses.filter(course => course._id !== cid));

      // Update displayCourses after the new enrollment is added
      setDisplayCourses(courses.filter((course) =>
        enrollments.some(
            (enrollment: any) =>
                enrollment.user === currentUser._id &&
                enrollment.course === course._id
        )
      ));

    }

    const handleEnrollmentsClick = () => {
      setDisplayAll((prevDisplayAll) => {
        const newDisplayAll = !prevDisplayAll;
        // Update displayCourses based on the new state
        if (newDisplayAll) {
          setDisplayCourses(courses);
        } else {
          setDisplayCourses(filteredCourses);
        }
    
        return newDisplayAll; // Ensure state is correctly toggled
      });
    };

    useEffect(() => {
      setDisplayCourses(
        courses.filter(course =>
          enrollments.some(
            (enrollment: any) => 
              enrollment.user === currentUser._id && 
              enrollment.course === course._id
          )
        )
      );
    }, [courses, enrollments]);
  return (
    <Provider store={store}>
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" && <><h5>New Course
          <button className="btn btn-primary float-end rounded-1"
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
      <h2 id="wd-dashboard-published"> Published Courses ({displayCourses.length})
      {currentUser.role === "STUDENT" && 
      <button className="btn btn-primary float-end rounded-1" onClick={handleEnrollmentsClick}>Enrollments</button>}
      </h2> 
      
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {currentUser.role === "FACULTY" && (displayCourses   
          .map((course, index) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }} key={index}>
              <div className="card rounded-3 overflow-hidden">
                <Link to={`/Kanbas/Courses/${course._id}/Home` }
                      className="wd-dashboard-course-link text-decoration-none text-dark" 
                      state={{ currentUser }}>
                  <img src={course.src} width="100%" height={160} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description}
                    </p>
                    <button className="btn btn-primary rounded-1"> Go </button>

                    {currentUser.role === "FACULTY" && 
                    <>
                    <button onClick={(event) => {handleDeleteCourseButton(event, course._id)}} className="btn btn-danger float-end rounded-1"
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

          {currentUser.role === "STUDENT" &&
            displayCourses.map((course) => {
              const isEnrolled = enrollments.some(
                (enrollment: any) =>
                  enrollment.user === currentUser._id && enrollment.course === course._id
              );

              return (
                <div className="wd-dashboard-course col" style={{ width: "300px" }} key={course._id}>
                  <div className="card rounded-3 overflow-hidden">
                      <img src={course.src} width="100%" height={160} />
                      <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
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
                              if (!isEnrolled) {
                                e.preventDefault(); // Prevent navigation if not enrolled
                                // alert("You need to enroll in this course first.");
                              }
                            }}
                          >
                        <button className="btn btn-primary rounded-1">Go</button>
                        </Link>
                        {isEnrolled ? (
                          <button
                            className="btn btn-danger float-end rounded-1"
                            id="wd-unenroll-course-click"
                            onClick={() => {
                              dispatch(deleteEnrollment({userId: currentUser._id, cid: course._id}))
                            }}
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success float-end rounded-1"
                            id="wd-enroll-course-click"
                            onClick={() => {
                              dispatch(
                                addEnrollment({
                                  _id: new Date().getTime().toString(),
                                  user: currentUser._id,
                                  course: course._id,
                                })
                              )
                            }}
                          >
                            Enroll
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
