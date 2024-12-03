import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    navigate("/Kanbas/Account/Profile");
  };
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
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
              type="password"
              className="form-control"
              id="wd-password"
              placeholder="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="d-grid mb-2">
            <button onClick={signup} className="btn btn-primary text-white rounded-2">
              Sign up
            </button>
          </div>

          <Link id="wd-signup-link" to="/Kanbas/Account/Signin">
            Sign in
          </Link>
      </form>
    </div>
);}

export {};
