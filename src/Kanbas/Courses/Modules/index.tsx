import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import * as db from "../../Database";
import { useMatch } from "react-router";

interface ModulesProps {
  cid?: string; // Make cid optional
}

export default function Modules({ cid }: ModulesProps) {
  // If cid is not passed as a prop, get it from the URL
  const match = useMatch("/Kanbas/Courses/:cid/Modules");
  const courseId = cid || match?.params.cid; // Use the prop first, fallback to match
  const modules = db.modules;

  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <br />
      <br />
      <ul id="wd-modules"  className="list-group rounded-0">
      {modules
          .filter((module: any) => module.course === courseId)
          .map((module: any, index: any) => (
          <li className=" list-group-item p-0 mb-5 fs-5 border-gray" key={index}>
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> {module.name} <ModuleControlButtons />
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-module wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export {};
