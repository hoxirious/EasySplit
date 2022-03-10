import React from "react"
import easysplitlogo from '../Resources/divided.png'
function Login() {
    return (
        <div className="login-container">
            <nav id="mainNavbar" className="navbar navbar-dark bg-dark py-0 px-0 fixed-top d-flex">
                <div className="nav-btns">
                    <button className="btn btn-success my-2 mx-2 signup-btn">Sign Up</button>
                </div>
            </nav>
            <div className="container-fluid login-content">
                <img src={easysplitlogo} alt="easysplitlogo" className="img-fluid logo" />
                <h1>Log In</h1>
                <form action="none">
                    <div className="htmlF-group login">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="" />
                    </div>
                    <div className="form-group login">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="" />
                    </div>
                </form>
                <button className="btn btn-success my-2 mx-2 login-btn">Log In</button>
            </div>
        </div>

    )
}

export default Login