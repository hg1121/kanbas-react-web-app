import { FiChevronDown } from "react-icons/fi";
import AssignTo from "./AssignTo";
import { useMatch, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addAssignment, updateAssignment } from "./reducer";
import { useState } from "react";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  };
  return date.toLocaleString('en-US', options).replace(',', '');
};

export default function AssignmentEditor() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/'); // Split path by "/"
  const cid = pathSegments[3];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newassignment, editing, originalPath } = location.state || {};
  // console.log("newassignment", newassignment, "editing", editing)
  
  // const assignments = db.assignments;
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const match = useMatch("/Kanbas/Courses/:cid/Assignments/:aid")
  const a_id = match?.params.aid;
  // console.log(course_id);
  // console.log(assignment_id);

  const [assignment, setAssignment] = useState(assignments.find((assignment: { _id: any; }) => assignment._id === a_id) || newassignment);
  // console.log("assignment", assignment);

  const handleSave = () => {
    // console.log(editing);
    if (editing){
      dispatch(updateAssignment(assignment));
    }else{
      // console.log("assignment", assignment);
      dispatch(addAssignment(assignment));
    }

    setTimeout(() => {
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
      // /Kanbas/Courses/RS101/Assignments
    }, 100);
  }

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  }


  return (
    <div className="mx-5 w-60">
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          <h4>Assignment Name</h4>
        </label>
        <input
          type="text"
          className="form-control form-control-lg"
          id="exampleFormControlInput1"
          // placeholder="A1"
          value={assignment.title}
          onChange = {(e)=> {setAssignment((prevAssignment: any) => ({
            ...prevAssignment,
            title: e.target.value,
          }))}}
        />
      </div>

      <table className="w-100" style={{ tableLayout: "fixed" }}>
        <tbody>
          <tr>
            <td colSpan={3}>
              <textarea
                className="form-control fs-5 mb-3"
                id="exampleFormControlTextarea1"
                rows={10}
                onChange = {(e)=> {setAssignment((prevAssignment: any) => ({
                  ...prevAssignment,
                  desciption: e.target.value,
                }))}}
              >
                {assignment.description}
              </textarea>
            </td>
          </tr>

          <tr className="spacing">
            <td className="text-end align-middle fs-5 mb-3">
              <label htmlFor="wd-points" className="me-1">
                Points
              </label>
            </td>
            <td colSpan={2} className="mb-6">
              <input
                type="text"
                className="form-control form-control-lg rounded-1 mb-3"
                id="wd-points"
                value={assignment.points}
                onChange={(e) => {setAssignment((prevAssignment: any) => ({
                  ...prevAssignment,
                  points: e.target.value,
                }))}}
              />
            </td>
          </tr>

          <tr>
            <td className="text-end align-middle fs-5  mb-3">
              <label className="me-1" htmlFor="wd-group">
                Assignment Group
              </label>
            </td>
            <td colSpan={2}>
              <div className="position-relative">
                <select
                  id="wd-group"
                  className="form-control form-control-lg rounded-1  mb-3"
                >
                  <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                </select>
                <FiChevronDown
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="text-end align-middle fs-5  mb-3">
              <label htmlFor="wd-display-grade-as" className="me-1">
                Display Grade as
              </label>
            </td>
            <td colSpan={2}>
              <div className="position-relative mb-3">
                <select
                  id="wd-display-grade-as"
                  className="form-control form-control-lg rounded-1 pe-5 mb-3"
                  style={{ appearance: "none", paddingRight: "30px" }}
                >
                  <option value="Percentage">Percentage</option>
                  <option value="Letter">Letter</option>
                </select>
                <FiChevronDown
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="text-end align-top fs-5">
              <label htmlFor="wd-submission-type" className="me-1">
                Submission Type
              </label>{" "}
              <br />
            </td>
            <td
              style={{ border: "1px solid rgb(232,232,235)", padding: "10px" }}
              colSpan={2}
              className="rounded-1"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div className="position-relative" style={{ width: "100%" }}>
                  <select
                    id="wd-display-grade-as"
                    className="form-control form-control-lg rounded-1 pe-5 mb-3"
                    style={{
                      width: "100%",
                      appearance: "none",
                      paddingRight: "30px",
                    }}
                  >
                    <option value="Online">Online</option>
                    <option value="InPerson">In Person</option>
                  </select>
                  <FiChevronDown
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
              <h5>Online Entry Options</h5>
              <input
                type="checkbox"
                name="check-online-entry"
                id="wd-text-entry"
                className="me-2 mb-3"
              />
              <label htmlFor="wd-text-entry">Text Entry</label>
              <br />
              <input
                type="checkbox"
                name="check-online-entry"
                id="wd-website-url"
                className="me-2 mb-3"
              />
              <label htmlFor="wd-website-url">Website URL</label>
              <br />
              <input
                type="checkbox"
                name="check-online-entry"
                id="wd-media-recordings"
                className="me-2 mb-3"
              />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
              <br />
              <input
                type="checkbox"
                name="check-online-entry"
                id="wd-student-annotation"
                className="me-2 mb-3"
              />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
              <br />
              <input
                type="checkbox"
                name="check-online-entry"
                id="wd-file-upload"
                className="me-2 mb-3"
              />
              <label htmlFor="wd-file-upload">File Uploads</label>
              <br />
            </td>
          </tr>
          <br />

          <tr>
            <td className="text-end align-top fs-5">
              <label className="me-1">Assign</label>
            </td>
            <td
              style={{ border: "1px solid rgb(232,232,235)", padding: "10px" }}
              colSpan={2}
              className="rounded-1"
            >
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              > */}
                <div className="position-relative" style={{ width: "100%" }}>
                  <label >Assign to</label>
                  <AssignTo />
                </div>
              {/* </div> */}

                <div className="position-relative" style={{ width: "100%" }}>
                  <label htmlFor="wd-due-date"> Due </label> <br />
                  <input
                    type="datetime-local"
                    id="wd-due-date"
                    value={assignment.due}
                    className="form-control"
                    width={100}
                    onChange = {(e)=> {setAssignment((prevAssignment: any) => ({
                      ...prevAssignment,
                      due: e.target.value,
                    }))}}
                  />
                  <br />
                </div>
                <tr className="d-flex mt-3">
                  <td className="me-1 w-50">
                    <label htmlFor="wd-available-from"> Available from </label>{" "}
                    <br />
                    <input
                      type="datetime-local"
                      id="wd-available-from"
                      value={assignment.available}
                      className="form-control"
                      onChange={(e) => {
                        console.log("assignment", assignment);
                        setAssignment((prevAssignment: any) => ({
                          ...prevAssignment,
                          available: e.target.value,
                        }));
                      }}
                    />
                  </td>

                  <td className="me-1 w-50">
                    <label htmlFor="wd-available-until"> Until </label> <br />
                    <input
                      type="datetime-local"
                      id="wd-available-until"
                      value={assignment.until}
                      className="form-control"
                      onChange = {(e)=> {setAssignment((prevAssignment: any) => ({
                        ...prevAssignment,
                        until: e.target.value,
                      }))}}
                    />
                  </td>
                </tr>
 
            </td>
          </tr>
        </tbody>
        <tr>
          <td colSpan={3}>
            <hr />
          </td>
        </tr>

        <tr>
          <td
            colSpan={3}
            className="text-end align-end"
            style={{ marginTop: "20px" }}
          >
            {/* <NavLink to={`/Kanbas/Courses/${cid}/Assignments`}> */}
            <button className="btn btn-secondary me-2" onClick = {handleCancel}>Cancel</button>
            <button className="btn btn-danger" onClick = {handleSave}>Save</button>
            {/* </NavLink> */}
            
          </td>
        </tr>
      </table>
    </div>
  );
}
