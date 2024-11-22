import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { TiHome } from "react-icons/ti";
import { SiGoogleanalytics } from "react-icons/si";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoMdNotifications } from "react-icons/io";
{
  /* Find more icons */
}
export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <button className="btn btn-lg btn-secondary w-100 text-nowrap rounded-2">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish{" "}
          </button>
        </div>
        <div className="w-50">
          <button className="btn btn-lg btn-success w-100 rounded-2">
            <FaCheckCircle className="me-2 fs-5" /> Publish{" "}
          </button>
        </div>
      </div>
      <br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start rounded-2">
        <BiImport className="me-2 fs-5" /> Import Existing Content{" "}
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start rounded-2">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons{" "}
      </button>
      {/* Complete the rest of the buttons */}
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start rounded-2">
        <TiHome className="me-2 fs-5" />
        Choose Home Page
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start rounded-2">
        <SiGoogleanalytics className="me-2 fs-5" />
        View Course Stream
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start rounded-2">
        <TfiAnnouncement className="me-2 fs-5" />
        New Announcement
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start rounded-2">
        <SiGoogleanalytics className="me-2 fs-5" />
        New Analytics
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start rounded-2">
        <IoMdNotifications className="me-2 fs-5" />
        View Course Notifications
      </button>

    </div>
  );
}
