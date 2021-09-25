import React from 'react';
import {Route, Redirect, useLocation} from "react-router-dom";
import {useQueryString} from "../hooks/ultis.hook";

const GuardedRoute = ({component: Component, ...rest}) => {
    const queryString = useQueryString()
    const location = useLocation()
    queryString.append("callbackURL", location.pathname)
    return (
        <Route {...rest} render={(props) => (
            window.localStorage.getItem('token') !== null
                ? <Component {...props} />
                : <Redirect to={`/login?${queryString}`}/>
        )}/>
    )
}

export default GuardedRoute;