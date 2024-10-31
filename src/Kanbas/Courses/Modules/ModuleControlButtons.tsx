import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FiPlus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function ModuleControlButtons(
  { moduleId, deleteModule, editModule}: 
  { moduleId: string; 
    deleteModule: (moduleId: string) => void; 
    editModule: (moduleId: string) => void;}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div className="float-end">
      {currentUser.role == "FACULTY" && 
      <> 
        <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-2" />
        <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>
      </> }
      <GreenCheckmark />
      <FiPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}