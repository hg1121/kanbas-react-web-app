export default function CourseStatus() {
    return (
      <div id="wd-course-status">
        <div style={{marginBottom: '20px'}}>
          <h2>Course Status</h2>
          <button >Unpublish</button> <button>Publish</button>
        </div>
        {/* Complete on your own */}
        <tr>
          <td><button >Import Existing Content</button></td> 
        </tr>
        <tr>  
          <td><button>Import from Commons</button></td>
        </tr>
        <tr>
          <button>Choose Home Page</button>
        </tr>
        <tr>
          <button>View Course Stream</button>
        </tr>
        <tr>
          <button>New Announcement</button>
        </tr>
        <tr>
          <button>New Analytics</button>
        </tr>
        <tr>
          <button>View Course Notifications</button>
        </tr>
      </div>
  );}

export {};