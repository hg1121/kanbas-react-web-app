export default function Assignments() {
    return (
      <div id="wd-assignments">
        <input id="wd-search-assignment"
               placeholder="Search for Assignments" />
        <button id="wd-add-assignment-group">+ Group</button>
        <button id="wd-add-assignment">+ Assignment</button>
        <h3 id="wd-assignments-title">
          ASSIGNMENTS 40% of Total <button>+</button>
        </h3>
        <ul id="wd-assignment-list">
          <li className="wd-assignment-list-item">
            <a className="wd-assignment-link"
              href="#/Kanbas/Courses/1234/Assignments/123">
              A1 - ENV + HTML
            </a> <br/>
            Multiple Modules | <b>Not avaliable until </b>May 6 at 12 am | <br/>
            <b>Due </b>May 13 at 23:59pm | 100 pts
          </li>
          <br />

          <li className="wd-assignment-list-item">
            {/* Complete On Your Own */}
            <a className="wd-assignment-link"
              href="#/Kanbas/Courses/1234/Assignments/123">
              A2 - CSS + BOOTSTRAP
            </a><br/>
            Multiple Modules | <b>Not avaliable until </b>May 13 at 12 am | <br/>
            <b>Due </b>May 20 at 23:59pm | 100 pts
          </li>
          <br />

          <li className="wd-assignment-list-item">
            {/* Complete On Your Own */}
            <a className="wd-assignment-link"
              href="#/Kanbas/Courses/1234/Assignments/123">
              A3 - JAVASCRPIT + REACT
            </a><br/>
            Multiple Modules | <b>Not avaliable until </b>May 20 at 12 am | <br/>
            <b>Due </b>May 27 at 23:59pm | 100 pts
          </li>
          <br />
          
        </ul>
      </div>
  );}
  
export {};  