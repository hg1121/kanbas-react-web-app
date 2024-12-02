import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { addModule, editModule, updateModule, deleteModule, setModules} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/'); // Split path by "/"
  const courseId = pathSegments[3];
  
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  const createModuleForCourse = async () => {
    if (!courseId) return;
    const newModule = {
      _id: new Date().getTime().toString(),
      lessons: [],
      name: moduleName,
      course: courseId,
    };
    const module = await coursesClient.createModuleForCourse(courseId, newModule);
    dispatch(addModule(newModule));
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(courseId as string);
    dispatch(setModules(modules));
  };

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };


  useEffect(() => {
    // Fetch modules only when `courseId` changes or on component mount
    if (courseId) {
      fetchModules();
    }
  }, [courseId]); // Depend only on `courseId`

  return (
    <div>
      <ModulesControls 
        setModuleName={setModuleName} 
        moduleName={moduleName} 
        addModule={createModuleForCourse}
      />
      <br />
      <br />
      <br />
      <br />
      <ul id="wd-modules"  className="list-group rounded-0">
      {modules
          // .filter((module: any) => module.course === courseId)
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
                          saveModule({ ...module, editing: false });
                        }
                      }}
                      value={module.name}/>
              )}
              <ModuleControlButtons 
                moduleId={module._id} 
                // deleteModule={(moduleId) => {
                //   dispatch(deleteModule(moduleId));
                // }}
                deleteModule={(moduleId) => removeModule(moduleId)}
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
