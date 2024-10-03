import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FiPlus } from "react-icons/fi";
export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <FiPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
