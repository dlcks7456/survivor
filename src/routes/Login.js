import { useState } from "react";
import REST_API from "../config"
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import styles from "./Signup.module.css"
import { useNavigate } from "react-router-dom";

function Login({loginTrue, setUserName}){
    const navigate = useNavigate();

    const [values, setValues] = useState({
        password1: '',
        showPassword1: false,
      });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword1 = () => {
        setValues({
            ...values,
            showPassword1: !values.showPassword1,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [showError, setShowError] = useState(false);
    const [errMsg, setErroMsg] = useState("");
    const [idError, setIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const onSubmit = (event)=>{
        event.preventDefault();

        setErroMsg("");
        setShowError(false);
        setIdError(false);
        setPasswordError(false);
        let msg = "";

        fetch(`${REST_API}/auth/login`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "user_name": event.target.user_name.value,
                    "password": event.target.password.value
            })
        }).then((res) => {
            return res.json();
        }).then((json)=>{
            if( json.not_user ){
                msg += "존재하지 않는 계정입니다.";
                setShowError(true);
                setIdError(true);
                setErroMsg(msg);
                return null;
            }
            else if( json.not_password ){
                msg += "비밀번호를 확인해주세요.";
                setShowError(true);
                setPasswordError(true)
                setErroMsg(msg);
                return null;
            }else{
                sessionStorage.setItem('user_name', event.target.user_name.value);
                setUserName(event.target.user_name.value);
                loginTrue(true);
                navigate("/");
            }
        });
    }

    return (
        <div className={"container"}>
            <form method="POST" className={styles.forms} onSubmit={onSubmit}>
                    {showError ? (
                        <div className={styles.errmsg}>
                            <div><FontAwesomeIcon icon={faCircleExclamation} /></div>
                            <div>
                                {errMsg}
                            </div>
                        </div>
                        ): null}
                    <div>
                        <TextField error={idError} required label="ID" variant="standard" style={{width:"100%", paddingBottom:"20px"}} name="user_name"/>
                    </div>
                    <div>
                        <FormControl sx={{width: "100%" }} variant="standard">
                            <InputLabel htmlFor="password1">Password</InputLabel>
                            <Input
                                error={passwordError}
                                id="password1"
                                name="password"
                                required
                                type={values.showPassword1 ? 'text' : 'password'}
                                value={values.password1}
                                onChange={handleChange('password1')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword1}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {values.showPassword1 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                    <div style={{marginTop: "30px"}}>
                        <Button variant="primary" type="submit" style={{width:"100%"}}>LOGIN</Button>
                    </div>
            </form>
        </div>
    )
}

export default Login