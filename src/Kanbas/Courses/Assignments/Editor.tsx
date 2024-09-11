export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <tr>
          <td align="right" valign="top">
            <h2>
              <label htmlFor="wd-name">Assignment Name</label>
            </h2>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
          </td>
        </tr>
        
        
        <table>
        <textarea id="wd-description" style={{width: '100%'}}>
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <tr>
          <td align="right" valign="top" style={{marginTop: '20px'}}>
            <label htmlFor="wd-points">Points</label>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        {/* Complete on your own */}
        <tr>
          <td align="right" valign="top" style={{marginTop: '20px'}}>
            <label htmlFor="wd-group">AssignmentGroup</label>
            <select id="wd-group">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            {/* <option value="DRAMA">Drama</option>
            <option selected value="SCIFI"> Science Fiction</option>
            <option value="FANTASY">Fantasy</option> */}
          </select>
          </td>
         
        </tr>
        <tr>
            <td align="right" valign="top" style={{marginTop: '20px'}}>
                <label htmlFor="wd-display-grade-as">Display Grade as</label>
                <select id="wd-display-grade-as">
                    <option value="Percentage">Percentage</option>
                    <option value='Letter'>Letter</option>
                </select>
            </td>
        </tr>
        <tr>
            <td align="right" valign="top" style={{marginTop: '20px'}}>
                <label htmlFor="wd-submission-type">Submission Type</label>
                <select id="wd-submission-type">
                    <option value="Online">Online</option>
                    <option value='InPerson'>In Person</option>
                </select>
            </td>
        </tr>
        <tr>
            <td align="right" valign="top" style={{marginTop: '20px'}}>
                <label>Online Entry Options</label>
                
                <input type="checkbox" name="check-online-entry" id="wd-text-entry"/>
                <label htmlFor="wd-text-entry">Text Entry</label><br/>

                <input type="checkbox" name="check-online-entry" id="wd-website-url"/>
                <label htmlFor="wd-website-url">Website URL</label><br/>

                <input type="checkbox" name="check-online-entry" id="wd-media-recordings"/>
                <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

                <input type="checkbox" name="check-online-entry" id="wd-student-annotation"/>
                <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

                <input type="checkbox" name="check-online-entry" id="wd-file-upload	"/>
                <label htmlFor="wd-file-upload">File Uploads</label><br/>

            </td>
        </tr>
        <tr>
            <td align="right" valign="top" style={{marginTop: '20px'}} >
                <label htmlFor="wd-assign-to"> Assign to</label>
                <input id='wd-assign-to'></input>
            </td>
        </tr>

        <tr>
            <td align="right" valign="top" style={{marginTop: '20px'}}>
             <label htmlFor="wd-due-date"> Due </label>
             <input type="date"
                id="wd-due-date"
                value="2024-05-13"/><br/>
            </td>
        </tr>

        <tr>
            <td align="right" valign="top" style={{marginTop: '20px'}}>
                <label htmlFor="wd-available-from"> Available from </label>
                <input type="date"
                    id="wd-available-from"
                    value="2024-05-06"/><br/>

                <label htmlFor="wd-available-until"> Until </label>
                <input type="date"
                    id="wd-available-until"
                    value="2024-05-20"/><br/>
            </td>
        </tr>

        <hr />
        <tr>
            <td align="right" valign="top" style={{marginTop: '20px'}}>
                <button>Cancel</button>
                <button>Save</button>
            </td>
        </tr>
      </table>
       

    </div>
);}

export {};