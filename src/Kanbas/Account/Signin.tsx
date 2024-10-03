import { Link } from "react-router-dom";
export default function Signin() {
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
            Sign in
          </Link>
        </div>

        <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
          Sign up
        </Link>
      </form>
    </div>
  );
}

export {};
// import { Link } from "react-router-dom";
// export default function Signin() {
//   return (
//     <div id="wd-signin-screen">
//       <h1>Sign in</h1>
//       <input id="wd-username"
//              placeholder="username"
//              className="form-control mb-2"/><br />
//       <input id="wd-password"
//              placeholder="password" type="password"
//              className="form-control mb-2"/><br />
//       <Link id="wd-signin-btn"
//             to="/Kanbas/Account/Profile"
//             className="btn btn-primary w-100">
//             Sign in </Link><br />
//       <Link id="wd-signup-link" to="/Kanbas/Account/Signup">Sign up</Link>
//     </div>
// );}


