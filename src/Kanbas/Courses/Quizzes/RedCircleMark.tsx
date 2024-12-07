import { TbForbid } from "react-icons/tb";
export default function RedCircleMark() {
    return (
      <span className="me-1 position-relative">
        <TbForbid
          style={{ top: "2px", color: "red" }} // Dynamic color
          className="me-1 fs-5"
        />
      </span>
    );
  }