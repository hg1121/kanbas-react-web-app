import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useLocation } from "react-router";
import { useState } from "react";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/'); // Split path by "/"
  const courseId = pathSegments[3];
  
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  const addNewModule = () => {
    const newModule = {
      _id: new Date().getTime().toString(),
      lessons: [],
      name: moduleName,
      course: courseId,
    };
    dispatch(addModule(newModule));
    setModuleName("");
  };

  return (
    <div>
      <ModulesControls 
        setModuleName={setModuleName} 
        moduleName={moduleName} 
        addModule={addNewModule}
      />
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
              <BsGripVertical className="me-2 fs-md-2 fs-lg-3" /> 
              {/* <span className="fs-md-2 fs-lg-3">{module.name}</span>  */}
              {!module.editing && module.name}
              { module.editing && (
                <input className="form-control w-50 d-inline-block"
                      onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      defaultValue={module.name}/>
              )}
              <ModuleControlButtons 
                moduleId={module._id} 
                deleteModule={(moduleId) => {
                  dispatch(deleteModule(moduleId));
                }}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
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
