import React from "react"
import easysplitlogo from '../Resources/divided.png'
function Register() {
    return (
        <div className="register-container">
            <div className="container-fluid register-content">
                <img src={easysplitlogo} alt="easysplitlogo" className="img-fluid logo" />
                <h1>Register</h1>
                <form action="none">
                    <div class="form-group register">
                        <label for="name">Full Name</label>
                        <input type="name" class="form-control" id="name" placeholder="ligma" />
                    </div>
                    <div class="form-group register">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="" />
                    </div>
                    <div class="form-group register">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="" />
                    </div>
                </form>
                <button className="btn btn-success my-2 mx-2 register-btn">Register</button>
            </div>
        </div>

    )
}

export default Register
