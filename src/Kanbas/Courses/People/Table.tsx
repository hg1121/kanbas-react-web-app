import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";
import * as courseClient from "../client";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import * as accountClient from "../../Account/client";

export default function PeopleTable() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/"); // Split path by "/"
  const courseId = pathSegments[3];

  const [usersInCourse, setUsersInCourse] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch users enrolled in the course
  const fetchUsers = async () => {
    try {
      setLoading(true);
      if (courseId === "Users"){
        const allUsers = await accountClient.findAllUsers();
        setUsersInCourse(allUsers);
      }else{
        const newUsers = await courseClient.findUsersForCourse(courseId);
        setUsersInCourse(newUsers);
      }

    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // console.log(usersInCourse);
  }, [courseId]);

  return (
    <div id="wd-people-table">
      <PeopleDetails />
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Login ID</th>
              <th>Section</th>
              <th>Role</th>
              <th>Last Activity</th>
              <th>Total Activity</th>
            </tr>
          </thead>
          <tbody>
            {usersInCourse.length > 0 ? (
              usersInCourse.map((user: any) => (
                <tr key={user._id}>
                  <td className="wd-full-name text-nowrap">
                    <Link
                      to={`/Kanbas/Account/Users/${user._id}`}
                      className="text-decoration-none"
                    >
                      <FaUserCircle className="me-2 fs-1 text-secondary" />
                      <span className="wd-first-name">{user.firstName}</span>
                      <span className="wd-last-name ms-1">{user.lastName}</span>
                    </Link>
                  </td>
                  <td className="wd-login-id">{user.loginId}</td>
                  <td className="wd-section">{user.section}</td>
                  <td className="wd-role">{user.role}</td>
                  <td className="wd-last-activity">{user.lastActivity}</td>
                  <td className="wd-total-activity">{user.totalActivity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No users found for this course.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}