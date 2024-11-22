import { Link } from "react-router-dom";

export default function TOC() {
    return (
      <ul>
        <li><Link to="/Labs">Labs</Link></li>
        <li><Link to="/Labs/Lab1">Lab 1</Link></li>
        <li><Link to="/Labs/Lab2">Lab 2</Link></li>
        <li><Link to="/Labs/Lab3">Lab 3</Link></li>
        <li><Link to="/Kanbas">Kanbas</Link></li>
        <li><Link to='https://github.com/hg1121/kanbas-react-web-app/tree/main' id='wd-github'>GitHub</Link></li>
        <li><Link to="https://kanbas-node-server-app-1-n0tk.onrender.com">Server on Render</Link></li>
        <li><Link to="https://github.com/hg1121/kanbas-node-server-app">Server GitHub</Link></li>
      </ul>
    );
  }
  
  export {}; 