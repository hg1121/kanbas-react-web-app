import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} alt="React Js"/>
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link> 
          </div>
        </div>
        <br />

        <div className="wd-dashboard-course">
          <img src="/images/design.avif" width={200} alt="Design"/>
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS5010 Programming Design Paradigm
            </Link>
            <p className="wd-dashboard-course-title">
              Object Orientation Design
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>
        <br />

        <div className="wd-dashboard-course">
          <img src="/images/ai.jpg" width={200} alt="AI"/>
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS 5100 Foundations of Artificial Intelligence
            </Link>
            <p className="wd-dashboard-course-title">
            Artificial Intelligence Intro Course
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>
        <br />

        <div className="wd-dashboard-course">
          <img src="/images/ppl.png" width={200} alt="PPL"/>
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS 5400 Principles of Programming Language
            </Link>
            <p className="wd-dashboard-course-title">
              Syntax, semantic and implementation of Programming Language
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>
        <br />

        <div className="wd-dashboard-course">
          <img src="/images/teacher.jpeg" width={200} alt="'Teacher"/>
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS 5933 Advanced Computer Science Topics for Teachers.
            </Link>
            <p className="wd-dashboard-course-title">
              Offers learners intending to be certified as K–12 computer science educators an advanced programming course.
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>
        <br />

        <div className="wd-dashboard-course">
          <img src="/images/nlp.jpeg" width={200} alt="NLP"/>
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS 6120 Natural Language Processing
            </Link>
            <p className="wd-dashboard-course-title">
              Introduction to the computational modeling of human language
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>
        <br />

        <div className="wd-dashboard-course">
          <img src="/images/devOps.jpeg" width={200} alt="devOps"/>
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS 6510 Advanced Software Development
            </Link>
            <p className="wd-dashboard-course-title">
              Integrate academic concepts and practical experience of software design
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}

export {};