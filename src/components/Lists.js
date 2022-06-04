import styles from "./Lists.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import setDate from "../SetDate"

function Lists({id, userName, subject, notisType, create_date, confirm}){
    return (
            <Link to={`/detail/${id}`} className={styles.href}>
                <div className={styles.lists}>
                    <div className={styles.subject}>
                        <div className={styles.name}>{subject}</div>
                        <div className={styles.icon}>
                            {confirm ? <FontAwesomeIcon icon={faCheckSquare} /> : <FontAwesomeIcon icon={faSquare} />}
                        </div>
                        <div className={styles.user}>
                            <div>{userName}</div>
                            <div>{setDate(create_date)}</div>
                        </div>
                    </div>
                </div>
            </Link>
    );
}

export default Lists;