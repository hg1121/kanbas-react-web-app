import EnvironmentVariables from "./EnvironmentVariables";
import HttpClient from "./HttpClient";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";

export default function Lab5() {
    return (
      <div id="wd-lab5" className="m-3">
        <h2>Lab 5</h2>
        <div className="list-group">
          {/* <a href="http://localhost:4000/lab5/welcome"          
             className="list-group-item">
             Welcome
          </a> */}
          <a href="https://kanbas-node-server-app-1-n0tk.onrender.com/lab5/welcome"          
             className="list-group-item">
             Welcome
          </a>
        </div><hr/>

        <EnvironmentVariables />
        <PathParameters />
        <QueryParameters />
        <WorkingWithObjects />
        <WorkingWithArrays />
        <HttpClient />
        <WorkingWithObjectsAsynchronously />
        <WorkingWithArraysAsynchronously />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
  