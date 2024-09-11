import { Link } from "react-router-dom";
export default function AccountNavigation() {
  return (
    <ul id="wd-kanbas-navigation">
      <li><a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank">Northeastern</a><br/></li>
      <li><Link to="/Kanbas/Account" id="wd-account-link">Account</Link><br/></li>
      <li><Link to="/Kanbas/Dashboard" id="wd-dashboard-link">Dashboard</Link><br/></li>
      <li><Link to="/Kanbas/Courses" id="wd-course-link">Courses</Link><br/></li>
      <li><Link to="/Kanbas/Calendar" id="wd-calendar-link">Calendar</Link><br/></li>
      <li><Link to="/Kanbas/Inbox" id="wd-inbox-link">Inbox</Link><br/></li>
      <li><Link to="/Labs" id="wd-labs-link">Labs</Link><br/></li>
    </ul>

);}

export {};