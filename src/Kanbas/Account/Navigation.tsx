import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0 me-5">
      <NavLink
        to={`/Kanbas/Account/Signin`}
        className={({ isActive }) =>
          `list-group-item border border-0 ${isActive ? "active" : "inactive"}`
        }
      >
        Signin{" "}
      </NavLink>{" "}
      <br />
      <NavLink
        to={`/Kanbas/Account/Signup`}
        className={({ isActive }) =>
          `list-group-item border border-0 ${isActive ? "active" : "inactive"}`
        }
      >
        Signup{" "}
      </NavLink>{" "}
      <br />
      <NavLink
        to={`/Kanbas/Account/Profile`}
        className={({ isActive }) =>
          `list-group-item border border-0 ${isActive ? "active" : "inactive"}`
        }
      >
        Profile{" "}
      </NavLink>{" "}
      <br />
    </div>
  );
}

export {};
