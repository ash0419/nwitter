// import { HashRouter as Router, Navigate, Route, Routes as Switch} from "react-router-dom";
import React from "react";
import { HashRouter as Router, Outlet, Route, Routes as Switch } from "react-router-dom";
import Auth from "routes/Auth"
import Home from "routes/Home"
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (

                    <Route path="/" element={
                        <div style={{
                            maxWidth: 890,
                            width: "100%",
                            margin: "0 auto",
                            marginTop: 80,
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Outlet />
                        </div>
                    } >
                        <Route exact path="/" element={<Home userObj={userObj} />} />
                        <Route exact path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj} />} />
                    </Route>
                ) : (
                    <Route exact path="/" element={<Auth />} />
                )}
                {/* <Route path="*" element={<Navigate replace to="/" />}/> */}
            </Switch>
        </Router>
    )
}

export default AppRouter