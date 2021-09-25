import customAxios from "../ultis/custom-axios";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useQueryString} from "../hooks/ultis.hook";

export function Login() {
    const history = useHistory()
    const queryString = useQueryString();
    const base64Msg = queryString.get('message');
    const redirectURL = queryString.get('redirectURL');
    const callbackURL = queryString.get('callbackURL');

    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const handle = function (e) {
        e.preventDefault();

        customAxios().post("/login", values).then(r => {
            if (r.data.data) {
                window.localStorage.setItem("token", r.data.data.token);
                history.push(`${callbackURL}?${base64Msg !== null ? `message=${base64Msg}` : ""}&${redirectURL !== null ? `redirectURL=${redirectURL}` : ""}`);
            }

        });

    };

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }

    return (
        <div>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <h2 className="active"> Sign In </h2>
                    <form onSubmit={handle}>
                        <input onChange={handleChange} type="text" id="login" className="fadeIn first"
                               name="username" placeholder="login"/>
                        <input onChange={handleChange} type="password" id="password" className="fadeIn second"
                               name="password" placeholder="password"/>
                        <input type="submit" className="fadeIn third" value="Log In"/>
                    </form>

                </div>
            </div>
        </div>
    );
}
