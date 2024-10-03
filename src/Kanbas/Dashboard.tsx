import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-course col me-4" style={{ width: "270px", marginTop: "30px" }}>
            <div className="card h-100 rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/reactjs.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h6 className="wd-dashboard-course-title card-title">
                    CS1234 React JS
                  </h6>
                  <p className="wd-dashboard-course-title card-text">
                    Full Stack software developer
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col me-4" style={{ width: "270px", marginTop: "30px" }}>
            <div className="card h-100 rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/design.avif" width="100%" height={160} />
                <div className="card-body">
                  <h6 className="wd-dashboard-course-title card-title">
                    CS5010 Programming Design Paradigm
                  </h6>
                  <p className="wd-dashboard-course-title card-text">
                    Object Orientation Design
                    <small className="text-body-secondary">Test</small>
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col me-4" style={{ width: "270px", marginTop: "30px" }}>
            <div className="card h-100 rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/ai.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h6 className="wd-dashboard-course-title card-title">
                    CS 5100 Foundations of Artificial Intelligence
                  </h6>
                  <p className="wd-dashboard-course-title card-text">
                    Artificial Intelligence Intro Course
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col me-4" style={{ width: "270px", marginTop: "30px" }}>
            <div className="card h-100 rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/ppl.png" width="100%" height={160} />
                <div className="card-body">
                  <h6 className="wd-dashboard-course-title card-title">
                    CS 5400 Principles of Programming Language
                  </h6>
                  <p className="wd-dashboard-course-title card-text">
                    Syntax, semantic and implementation of Programming Language
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col me-4" style={{ width: "270px", marginTop: "30px" }}>
            <div className="card h-100 rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/teacher.jpeg" width="100%" height={160} />
                <div className="card-body">
                  <h6 className="wd-dashboard-course-title card-title">
                    CS 5933 Advanced Computer Science Topics for Teachers.
                  </h6>
                  <p className="wd-dashboard-course-title card-text">
                    Offers learners intending to be certified as K–12 computer
                    science educators an advanced programming course.
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col me-4" style={{ width: "270px", marginTop: "30px" }}>
            <div className="card h-100 rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/nlp.jpeg" width="100%" height={160} />
                <div className="card-body">
                  <h6 className="wd-dashboard-course-title card-title">
                    CS 6120 Natural Language Processing
                  </h6>
                  <p className="wd-dashboard-course-title card-text">
                    Introduction to the computational modeling of human language
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col me-4 mt-5" style={{ width: "270px", marginTop: "30px"}}>
            <div className="card h-100 rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/devOps.jpeg" width="100%" height={160} />
                <div className="card-body">
                  <h6 className="wd-dashboard-course-title card-title">
                    CS 6510 Advanced Software Development
                  </h6>
                  <p className="wd-dashboard-course-title card-text">
                    Integrate academic concepts and practical experience of
                    software design
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export {};
