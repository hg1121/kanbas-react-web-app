import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = () => {
    const user = db.users.find(
      (u: any) => u.username === credentials.username && u.password === credentials.password);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kanbas/Dashboard");
  };

  return (
    <div id="wd-signin-screen" style={{ width: "300px" }}>
      <h3>Sign in</h3>
      <form>
        <div id="wd-signin-screen" className="mb-3">
          <input
            type="text"
            className="form-control mb-3"
            id="username"
            aria-describedby="emailHelp"
            placeholder="username"
            defaultValue={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <input
            type="password"
            className="form-control"
            id="wd-password"
            placeholder="password"
            defaultValue={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>
        <div className="d-grid mb-2">
        <button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100" > Sign in </button>
          {/* <Link to="/Kanbas/Account/Profile" className="btn btn-primary text-white rounded-2">
            Sign in
          </Link> */}
        </div>

        <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
          Sign up
        </Link>
      </form>
    </div>
  );
}

export {};

