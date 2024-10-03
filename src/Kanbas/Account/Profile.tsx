import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <div id="wd-profile-screen" style={{ width: "300px" }}>
      <h3>Profile</h3>
      <form>
        <div id="wd-signin-screen" className="mb-2">
          <input
            type="text"
            className="form-control mb-2"
            id="wd-username"
            value="alice"
            placeholder="username"
          />
          <input
            type="password"
            className="form-control"
            id="wd-password"
            placeholder="password"
            value="123"
          />
          <input
            className="form-control mb-2"
            id="wd-firstname"
            value="Alice"
            placeholder="First Name"
          />
          <input
            className="form-control mb-2"
            id="wd-lastname"
            value="Wonderland"
            placeholder="Last Name"
          />
          <input
            className="form-control mb-2"
            id="wd-dob"
            value="mm/dd/yyyy"
            type="date"
          />
          <input
            className="form-control mb-2"
            id="wd-email"
            value="alice@wonderland"
            type="email"
          />
          <select className="form-control mb-2" id="wd-role">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
        <div className="d-grid mb-2">
          <Link
            to="/Kanbas/Account/Signin"
            className="btn btn-danger text-white rounded-2"
          >
            Signout
          </Link>
        </div>
      </form>
    </div>
  );
}

export {};
