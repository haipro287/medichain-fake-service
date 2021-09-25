import React, {useEffect, useState} from "react";
import customAxios from "../ultis/custom-axios";
import {useQueryString} from "../hooks/ultis.hook";

export function Data() {
    const queryString = useQueryString();
    const [data, setData] = useState('');

    const getData = function () {
        const base64Msg = queryString.get('message');
        customAxios().get(`data?message=${base64Msg}`).then(r => {
            console.log(r.data.data.data)
            if (r.data.data.data) {
                setData(r.data.data.data)
            }
            else {
                setData('Can\'t not get data :(')
            }

        });
    }

    useEffect(getData, [queryString]);

    return (
        <div>
            <div className="wrapper fadeInDown">
                {data}
            </div>
        </div>
    )
}