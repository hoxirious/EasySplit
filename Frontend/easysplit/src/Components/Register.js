import React from "react"
import easysplitlogo from '../Resources/divided.png'
function Register() {
    return (
        <div className="register-container">
            <nav id="mainNavbar" className="navbar navbar-dark bg-dark py-0 px-0 fixed-top d-flex">
                <div className="nav-btns">
                    <button className="btn btn-success my-2 mx-2 login-btn">Log In</button>
                </div>
            </nav>
            <div className="container-fluid register-content">
                <img src={easysplitlogo} alt="easysplitlogo" className="img-fluid logo" />
                <h1>Sign Up</h1>
                <form action="none">
                    <div className="form-group register">
                        <label htmlFor="name">Full Name</label>
                        <input type="name" className="form-control" id="name" placeholder="ligma" />
                    </div>
                    <div className="form-group register">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="" />
                    </div>
                    <div className="form-group register">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="" />
                    </div>
                </form>
                <button className="btn btn-success my-2 mx-2 register-btn">Sign Up</button>
            </div>
        </div>

    )
}

export default Register
