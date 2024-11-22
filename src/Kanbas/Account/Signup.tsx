import React from "react";
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div id="wd-signup-screen"  style={{ width: "300px" }}>
      <h3>Sign up</h3>
      <form>
        <div id="wd-signin-screen" className="mb-3">
            <input
              type="text"
              className="form-control mb-3"
              id="username"
              aria-describedby="emailHelp"
              placeholder="username"
            />
            <input
              type="password"
              className="form-control"
              id="wd-password"
              placeholder="password"
            />
          </div>
          <div className="d-grid mb-2">
            <Link to="/Kanbas/Account/Profile" className="btn btn-primary text-white rounded-2">
              Sign up
            </Link>
          </div>

          <Link id="wd-signup-link" to="/Kanbas/Account/Signin">
            Sign in
          </Link>
      </form>
    </div>
);}

export {};
