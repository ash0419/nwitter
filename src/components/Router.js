// import { HashRouter as Router, Navigate, Route, Routes as Switch} from "react-router-dom";
import { HashRouter as Router, Route, Routes as Switch} from "react-router-dom";
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
                    <>
                    <Route exact path="/" element = {<Home userObj={userObj} />} />
                    <Route exact path="/profile" element = {<Profile refreshUser={refreshUser} userObj={userObj} />} />
                    </>) : (
                    <Route exact path="/" element = {<Auth />} />
                )}
                {/* <Route path="*" element={<Navigate replace to="/" />}/> */}
            </Switch>
        </Router>
    )
}

export default AppRouter