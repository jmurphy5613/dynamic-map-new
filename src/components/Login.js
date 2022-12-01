import React, { useState } from "react";
import "./Login.css";

function Login(props) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return (
        <div id="login">
            <div className="loginCard">
                <h2>Login</h2>
                <p>Sign in to manage the map.</p>
                {props.failed && (
                    <div className="alert">Invalid email or password</div>
                )}
                <input
                    type="email"
                    className="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="pass"
                    placeholder="Password"
                    onChange={(e) => setPass(e.target.value)}
                />
                <button
                    className="login button--primary"
                    onClick={() => props.authenticate(email, pass)}
                >
                    Log In
                </button>
            </div>
        </div>
    );
}

export default Login;
