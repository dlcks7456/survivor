import styles from "./Blank.module.css"

function Blank(){
    return (
        <div className={styles.lists}>
            <div className={styles.subject}>
                <div className={styles.name}></div>
                <div>
                </div>
                <div className={styles.user}>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        );
}

export default Blank;