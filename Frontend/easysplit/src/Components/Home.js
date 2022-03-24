import React from "react"
import easysplitlogo from '../Resources/divided.png'
function Home() {
    return (

        <div>
            <nav id="mainNavbar" className="navbar navbar-dark bg-dark py-0 px-0 fixed-top d-flex">
                <div className="nav-btns">
                    <button className="btn btn-success my-2 mx-2 login-btn">Log In</button>
                    <button className="btn btn-success my-2 mx-2 signup-btn">Sign Up</button>
                </div>
            </nav>
            <div className="container-fluid home-content">
                <img src={easysplitlogo} alt="easysplitlogo" className="img-fluid logo" />
                <h1>EasySplit</h1>
                <ul>
                    <li>Tracks Balances for you!</li>
                    <li>Easily Add and Organize Expenses</li>
                    <li>Pay and Request</li>
                </ul>
            </div>
        </div>
    )
}

export default Home