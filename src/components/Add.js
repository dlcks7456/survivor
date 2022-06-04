import Youtube from "./Youtube"
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import REST_API from "../config"
import {Button} from "react-bootstrap";
import Modal from "react-modal";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function Add({updateDate, filt, setFilt, sort, setSort}){
    const [addModal, setAddModal] = useState(false);
    const [notisType, setNotisType] = useState("");
    const [linkText, setLinkText] = useState("");
    const [youtubeLink, setYoutubeLink] = useState({flag:false, url:""});

    const [fomrFlag, setFomrFlag] = useState(false);

    const filtHandle = (event) => {
        setFilt(event.target.value);
    };

    const sortHandle = (event) => {
        setSort(event.target.value);
    };

    const clickType = (event) =>{
        const selectedValue = parseInt(event.target.value);
        setNotisType(selectedValue);
        setFomrFlag(true);

        if( selectedValue === 1 ){
            setLinkText("Youtube Link")
        }
        else if( selectedValue === 2 ){
            setLinkText("Link")
        }
        else{
            setLinkText("")
        }
    }
    const closeModal = () => {
        setAddModal(false);
        setFomrFlag(false);
        setYoutubeLink({flag:false, url:""});
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        fetch(`${REST_API}/add`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "user_name": event.target.user_name.value,
                "subject": event.target.subject.value,
                "type": event.target.type.value,
                "notis": event.target.notis.value
            })
        }).then((res) => {
                if(res.ok){
                    closeModal();
                    const dates = new Date();
                    updateDate(dates.getTime());
                }
            });
        }

    return (
        <div className={"container"}>
            <div style={{width: "100%", display: "grid", gridTemplateColumns: "20% 80%"}}>
                <div style={{position: "relative"}}>
                    <Button variant="primary" style={{position: "absolute", top: "25%", left: "10%"}} onClick={()=>{setAddModal(true)}}>Add</Button>
                </div>
                <div style={{textAlign: "right"}}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }} style={{textAlign: "center"}}>
                        <InputLabel id="filt">Filter</InputLabel>
                        <Select
                            labelId="filt"
                            id="filts"
                            value={filt}
                            onChange={filtHandle}
                            label="Filter"
                        >
                            <MenuItem value="all">전체</MenuItem>
                            <MenuItem value="confirm">확인된 컨탠츠</MenuItem>
                            <MenuItem value="notconfirm">미확인 컨탠츠</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }} style={{textAlign: "center"}}>
                        <InputLabel id="sort">Sort</InputLabel>
                        <Select
                            labelId="sort"
                            id="sorts"
                            value={sort}
                            onChange={sortHandle}
                            label="Sort"
                        >
                            <MenuItem value="asc">최신 순</MenuItem>
                            <MenuItem value="desc">오래된 순</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <Modal isOpen={addModal} style={{
                overlay:{
                    backgroundColor: "rgb(58, 57, 57, 0.56)"
                },
                content:{
                    border: "1px solid black",
                    backgroundColor: "white",
                    top: "40px",
                    maxWidth: "500px",
                    margin: "0 auto"
                }
            }}>
                <div style={{marginBottom:"10px"}}>
                    <Button style={{float:"right"}} variant="danger" onClick={closeModal}>Close</Button>
                </div>
                <div>
                    <form method="POST" onSubmit={onSubmit}>
                        <input type="hidden" name="user_name" value={sessionStorage.getItem("user_name")}/>
                        <TextField required label="제목" variant="standard" style={{width:"100%", paddingBottom:"20px"}} name="subject"/>
                        <FormControl>
                            <FormLabel id="selectType">타입</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="selectType"
                                name="type"
                                onClick={(event)=>{clickType(event)}}>
                                <FormControlLabel value={1} control={<Radio />} label="Youtube" />
                                <FormControlLabel value={2} control={<Radio />} label="Link" />
                            </RadioGroup>
                        </FormControl>
                        { !fomrFlag ? null  : (
                            <div>
                                <div>
                                    <TextField required label={linkText} variant="standard" name="notis" style={{width:"100%"}} onChange={(event)=>{setYoutubeLink({flag:true, url:event.target.value});}}/>
                                </div>
                                <div>
                                    {notisType === 1 ? 
                                        youtubeLink.flag ? (<Youtube src={youtubeLink.url}/>) : null
                                    : null}
                                </div>
                                <div style={{marginTop: "10px"}}>
                                    <Button variant="primary" type="submit" style={{width: "100%"}}>Upload</Button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default Add;