import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome//free-solid-svg-icons'
import REST_API from "../config"
import Notis from "../components/Notis"

function Detail(){
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [lists, setLists] = useState([]);

    const dates = new Date();
    const [updateDate, setUpdateDate] = useState(dates.getTime());

    const getData = async () => {
        const json = await (
            await fetch(`${REST_API}/detail/${id}/`)
        ).json();
        setLists(json);
        setLoading(false);
    }
    useEffect( () => {
        getData();
    },[updateDate])

    const confirmUpdateDate = (updateDate) => {
        setUpdateDate(updateDate)
    }

    return (
        <div>
            {loading ? <div className={"loading"}><FontAwesomeIcon icon={faSpinner} pulse/></div> :  lists.map( (items) => (
                <Notis
                    key={items.id}
                    id={items.id}
                    userName={items.user_name}
                    subject={items.subject}
                    create_date={items.create_date}
                    confirm={items.confirm}
                    notisType={items.notis_type}
                    notis={items.notis}
                    comment={items.comment}
                    rating={items.rating}
                    updateDate={confirmUpdateDate}
                />
            ))
            }
        </div>
    );
}

export default Detail;