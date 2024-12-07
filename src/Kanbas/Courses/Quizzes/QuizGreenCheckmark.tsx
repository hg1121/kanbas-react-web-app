import { FaCheckCircle, FaCircle } from "react-icons/fa";
export default function QuizGreenCheckmark() {
    return (
      <span className="me-1 position-relative">
        <FaCheckCircle
          style={{ top: "2px", color: "#28a745"}} // Dynamic color
          className="me-1 position-absolute fs-5"
        />
        <FaCircle className="text-white me-1 fs-6" />
      </span>
    );
  }