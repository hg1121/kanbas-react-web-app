// import courses from "./courses.json";
// export {  courses  };

import coursesJson from './courses.json';
import modulesJson from './modules.json'
import assignmentsJson from './assignments.json'
import enrollJson from './enrollments.json'
import usersJson from './Users.json'
import { Course } from './Course'; 
import { Module } from './Module'; 
import { Assignment } from './Assignment';
import { Enroll } from './Enroll';
import {User} from './User'


// Assert that courses is of type Course[]
const courses: Course[] = coursesJson as Course[];
const modules: Module[] = modulesJson as Module[];
const assignments: Assignment[] = assignmentsJson as Assignment[];
const users: User[] = usersJson as User[];
const enrollments: Enroll[] = enrollJson as Enroll[];
export { courses, modules, assignments, users, enrollments};