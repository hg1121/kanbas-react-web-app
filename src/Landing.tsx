import { Link } from "react-router-dom";

export default function Landing(){
    return(
        // your name, section, links to labs, source code, and the Kanbas application, 
        <div>
            <h2>Name: Hong Guo</h2>
            <h2>Section: 02</h2>
            <ul>
                <li><Link to='/Labs'>Labs</Link></li>
                <li><Link to='https://github.com/hg1121/kanbas-react-web-app/tree/a1'>GitHub</Link></li>
                <li><Link to='/Kanbas'>Kanbas</Link></li>
            </ul>
        </div>
        
    );
}