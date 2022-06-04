import {useState} from "react"
import {Link} from "react-router-dom";
import setDate from "../SetDate"
import styles from "./Notis.module.css"
import Youtube from "../components/Youtube"
import {Button} from "react-bootstrap";
import Modal from "react-modal";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import REST_API from "../config"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome//free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

function Notis({id, userName, subject, notisType, notis, create_date, confirm, comment, rating, updateDate}){
    const [addModal, setAddModal] = useState(false);
    const [commentError, setCommentError] = useState(false);
    const [commentErrorMsg, setCommentErrorMsg] = useState("");
    const [chk, setChk] = useState(true);
    const navigate = useNavigate();

    const closeModal = () => {
        setAddModal(false);
    }
    const onSubmit = (event) =>{
        event.preventDefault();
        if( chk ){
            if(event.target.comment.value === ""){
                setCommentError(true);
                setCommentErrorMsg("정말 아무 것도 안남길거야...? 😥 맞다면 다시 Update를 클릭해줘요.");
                setChk(false);
                return null;
            }
        }

        fetch(`${REST_API}/update`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "id": event.target.id.value,
                "answer_name": event.target.answerName.value,
                "rating": event.target.rating.value,
                "comment": event.target.comment.value
            })
        }).then((res) => {
                if(res.ok){
                    closeModal();
                    const dates = new Date();
                    updateDate(dates.getTime());
                }
        });

        setChk(true);
        closeModal();
    }

    const labels = {
        1: '😠',
        2: '🙁',
        3: '😐',
        4: '🙂',
        5: '😍',
      };
    
      const getLabelText = (value) => {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
      }
      const [value, setValue] = useState(rating !== null ? rating : 3);
      const [hover, setHover] = useState(-1);

      const [delectCheck, setDelectCheck] = useState(false);

      const deleteList = ()=>{
        fetch(`${REST_API}/delete`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "id": id
            })
        }).then((res) => {
                if(res.ok){
                    navigate("/");
                }
        });
      }

    return (
        <div className={styles.container}>
            <div style={{marginBottom: "10px"}}><Link to={`/`} className={styles.href}><Button variant="primary">GO List</Button></Link></div>
            {confirm ? (<div style={{fontSize: "20px", color:"#2FA4FF"}}>
                    <FontAwesomeIcon icon={faCheckSquare}/><span> 확인이 완료된 컨탠츠 (★ {rating}점)</span>
                </div>) : null}
            <div className={styles.subject}>
                <div className={styles.name}>{subject}</div>
                <div className={styles.user}>
                    <div>{userName}</div>
                    <div>{setDate(create_date)}</div>
                </div>
            </div>
            <div style={{marginBottom: "10px"}}>
                <div>
                    {delectCheck ? (
                            <>
                                <Button variant="danger" onClick={deleteList}>Yes 😅</Button>
                                <Button variant="danger" onClick={()=>setDelectCheck(false)} style={{marginLeft:"5px"}}>No 😆</Button>
                            </>
                        ) : (<Button variant="danger" onClick={()=>setDelectCheck(true)}>Delete</Button>)}
                    <Button variant="primary" style={{float: "right"}} onClick={()=>{setAddModal(true)}}>{confirm ? "Modify" :"Confirm"}</Button>
                </div>
                <div style={{height: "30px"}}>{delectCheck ? (<span style={{color: "red", verticalAlign: "middle"}}>정말 삭제할거야...? 😥</span>) : null}</div>
                <Modal isOpen={addModal} style={{
                    overlay:{
                        backgroundColor: "rgb(58, 57, 57, 0.56)"
                    },
                    content:{
                        border: "1px solid black",
                        backgroundColor: "white",
                        top: "40px",
                        maxWidth: "500px",
                        maxHeight: "400px",
                        margin: "0 auto"
                    }
                }}>
                    <form method="POST" onSubmit={onSubmit}>
                        <div style={{marginBottom:"10px"}}>
                            <Button variant="primary" type="submit">Update</Button>
                            <Button style={{float:"right"}} variant="danger" onClick={closeModal}>Close</Button>
                        </div>
                        <div>
                            <input type="hidden" name="id" value={id}/>
                            <input type="hidden" name="answerName" value={sessionStorage.getItem("user_name")}/>
                            <div>
                                <Box>
                                    <div>
                                        <Rating
                                            name="rating"
                                            value={value}
                                            precision={1}
                                            getLabelText={getLabelText}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                            onChangeActive={(event, newHover) => {
                                                setHover(newHover);
                                            }}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        {value !== null && (
                                            <Box sx={{ ml: 2 }} style={{display:"inline", verticalAlign:"top"}}>{labels[hover !== -1 ? hover : value]}</Box>
                                        )}
                                    </div>
                                    <TextField
                                        error={commentError}
                                        helperText={commentErrorMsg}
                                        name="comment"
                                        label="Comment"
                                        placeholder="코맨트 작성"
                                        style={{width: "100%"}}
                                        defaultValue={comment}
                                        multiline
                                    />
                                </Box>
                            </div>
                        </div>
                        </form>
                </Modal>
            </div>
            {/* Youtube */}
            <div>{notisType === 1 ? <Youtube src={notis}/> : null}</div>
            {/* Link */}
            <div>{notisType === 2 ? <a href={notis} target="_blank">{notis}</a> : null}</div>
            {/* comment */}
            <div>{comment !== null ? (
                <div>
                    <div style={{fontSize: "20px", borderBottom: "1px solid black"}}>Comment</div>
                    <div>{comment}</div>
                </div>)
                : <div style={{color: "#FF6B6B"}}>아직 코맨트가 없어요 😅</div> }</div>
        </div>
    );
}

export default Notis;