import { useState } from 'react'
import '../components/navbar.css'

function Navbar(){

    const [activeTab, setActiveTab] = useState("ALL")

    return(
        <div id="tab-container">
            <ul>
                <li className={activeTab == "ALL" ? "all tab active" : "all tab"}><a onClick={() => alert("HELLO")}>All Categories</a></li>
                <li className={activeTab == "PD" ? "pd tab active" : "pd tab"}><a>Product Design</a></li>
                <li className={activeTab == "ENG" ? "eng tab active" : "eng tab"}><a>Engineering</a></li>
                <li className={activeTab == "MUS" ? "mus tab active" : "mus tab"}><a>Music</a></li>
                <li className={activeTab == "EXP" ? "exp tab active" : "exp tab"}><a>Exploration</a></li>
                <li className='about tab'><a>About Me</a></li>
            </ul>
        </div>
    )

}

export default Navbar