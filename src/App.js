import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "./firebase";
import "leaflet/dist/leaflet.css";
import "./App.css";
import Leaflet from "./components/Leaflet";
import Login from "./components/Login";

function App() {
    const [user, setUser] = useState("");
    const [failed, setFailed] = useState(false);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            setUser(user);
        }
    });

    function authenticate(email, password) {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                setFailed(true);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // some display for bad logins...
            });
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Leaflet />
                </Route>
                <Route path="/admin">
                    {!user.isAnonymous ? (
                        <Leaflet admin user={user} />
                    ) : (
                        <Login authenticate={authenticate} failed={failed} />
                    )}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
