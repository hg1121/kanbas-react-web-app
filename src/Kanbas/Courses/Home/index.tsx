import Modules from "../Modules";
import CourseStatus from "./Status";
import { useMatch } from "react-router";

export default function Home() {
  const match = useMatch("/Kanbas/Courses/:cid/Home");
  const cid = match?.params.cid;

  if (!cid) {
    return <div>Course not found</div>;
  }
  
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill me-lg-3">
        <Modules cid={cid}/>
      </div>
      <div className="d-none d-lg-block">
        <CourseStatus />
      </div>
    </div>
  );
}

export {};
