import React from "react"
import easysplitlogo from '../Resources/divided.png'
function Login() {
    return (
        <div className="login-container">
            <div className="container-fluid login-content">
                <img src={easysplitlogo} alt="easysplitlogo" className="img-fluid logo" />
                <h1>Log In</h1>
                <form action="none">
                    <div class="form-group login">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="" />
                    </div>
                    <div class="form-group login">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="" />
                    </div>
                </form>
                <button className="btn btn-success my-2 mx-2 login-btn">Log In</button>
            </div>
        </div>

    )
}

export default Login