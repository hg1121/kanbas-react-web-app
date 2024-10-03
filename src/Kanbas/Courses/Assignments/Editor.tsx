import { FiChevronDown } from "react-icons/fi";
import AssignTo from "./AssignTo";

export default function AssignmentEditor() {
  const defaultDateTime = new Date(2024, 4, 13, 14, 30)
    .toISOString()
    .slice(0, 16);
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
          placeholder="A1"
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
              >
                The assignment is available online. Submit a link to the landing
                page of your Web application running on Netlify. The landing
                page should include the following: Your full name and section
                Links to each of the lab assignments Link to the Kanbas
                application Links to all relevant source code repositories The
                Kanbas application should include a link to navigate back to the
                landing page.
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
                value={100}
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
                    value={defaultDateTime}
                    className="form-control"
                    width={100}
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
                      // value="2024-05-06"
                      className="form-control"
                    />
                  </td>

                  <td className="me-1 w-50">
                    <label htmlFor="wd-available-until"> Until </label> <br />
                    <input
                      type="datetime-local"
                      id="wd-available-until"
                      // value="2024-05-20"
                      className="form-control"
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
            <button className="btn btn-secondary me-2">Cancel</button>
            <button className="btn btn-danger">Save</button>
          </td>
        </tr>
      </table>
    </div>
  );
}
