import customAxios from "../ultis/custom-axios";
import {useQueryString} from "../hooks/ultis.hook";
import {useHistory, useLocation} from "react-router-dom";
import React from "react";

export function Connect() {
    const queryString = useQueryString();
    const history = useHistory();
    const location = useLocation()

    const handle = function (e) {
        e.preventDefault();
        const base64Msg = queryString.get('message');
        const redirectURL = queryString.get('redirectURL');
        const token = window.localStorage.getItem('token')
        if (!token) {
            queryString.append(location.pathname)
            history.push(`/login?${queryString}`)
            return
        }
        customAxios().post(`link?message=${base64Msg}&redirectURL=${redirectURL}`).then(r => {
            console.log(r.data)
            console.log(redirectURL)
            if (r.data.data.status === "LINK.SUCCESS") {
                console.log('dcm')
                window.location.href = `${redirectURL}`
            }
        });
    }

    return (
        <div>
            <div className="wrapper fadeInDown">
                <form onSubmit={handle}>
                    <input type="submit" className="fadeIn first" value="Connect"/>
                </form>
            </div>
        </div>
    );
}