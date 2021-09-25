import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "./pages/login";
import {Connect} from "./pages/connect";
import GuardedRoute from "./components/guardedRoute";
import {Success} from "./pages/success";
import React, {useState} from "react";
import {Data} from "./pages/data";

export function Routes() {
    const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem('token'));

    const logout = () => {
        window.localStorage.removeItem('token')
        setLoggedIn(window.localStorage.getItem('token'))
    }

    return (
        <>
            {loggedIn !== null ?
                <div>
                    <div className="wrapper fadeInDown">
                        <form onSubmit={logout}>
                            <input type="submit" className="fadeIn first" value="Log out"/>
                        </form>
                    </div>
                </div> : <></>}
            <Switch>
                <Route exact path='/'>
                    {loggedIn !== null ? <></> : <Redirect to="/login"/>}
                </Route>
                <Route path="/login">
                    {loggedIn !== null ? <Redirect to="/login"/> : <Login/>}
                </Route>
                <GuardedRoute path="/link" component={Connect}/>
                <Route path="/data" component={Data}/>
                <Route path="/success" component={Success}/>
            </Switch>
        </>

    )
}