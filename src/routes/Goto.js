import { useState, useEffect } from "react";
import REST_API from "../config"
import { useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faFileCircleXmark } from '@fortawesome//free-solid-svg-icons'

function Goto({loginTrue, setUserName}){
    const navigate = useNavigate();
    const [goFlag, setGoFlag] = useState(false);

    const query = queryString.parse(window.location.search);
    fetch(`${REST_API}/auth/source`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "source": query.source
        })
    }).then((res) => {
        return res.json();
    }).then((json)=>{
        loginTrue(true);
        setGoFlag(true);
        setUserName(json[0].user_name);
        sessionStorage.setItem('user_name', json[0].user_name);
        navigate("/");
    });

    return (
        <div className={"container"}>
            <div className={"loading"}><FontAwesomeIcon icon={faSpinner} pulse/></div>
        </div>
    )
}

export default Goto