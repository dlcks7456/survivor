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

function Signup(){
    const navigate = useNavigate();

    const [values, setValues] = useState({
        password1: '',
        password2: '',
        showPassword1: false,
        showPassword2: false
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

    const handleClickShowPassword2 = () => {
        setValues({
            ...values,
            showPassword2: !values.showPassword2,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const [showError, setShowPassword] = useState(false);
    const [errMsg, setErroMsg] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const onSubmit = (event)=>{
        event.preventDefault();
        setErroMsg("");
        let msg = "";
        if( !(values.password1 === values.password2) ){
            setShowPassword(true);
            msg += "비밀번호를 확인해주세요.";
            setPasswordError(true);
            setErroMsg(msg)
            return null;
        }

        fetch(`${REST_API}/auth/signup`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "user_name": event.target.user_name.value,
                    "password": event.target.password.value
            })
        }).then((res) => {
            return res.json();
        }).then((json)=>{
            if( json.in_user ){
                msg += "이미 존재하는 유저입니다.";
                setShowPassword(true);
                setErroMsg(msg);
                return null;
            }
        });

        setShowPassword(false);
        navigate("/auth/login");
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
                        <TextField required label="ID" variant="standard" style={{width:"100%", paddingBottom:"20px"}} name="user_name"/>
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
                    <div>
                        <FormControl sx={{width: "100%" }} variant="standard">
                            <InputLabel htmlFor="password2">Check Password</InputLabel>
                            <Input
                                error={passwordError}
                                id="password2"
                                required
                                type={values.showPassword2 ? 'text' : 'password'}
                                value={values.password2}
                                onChange={handleChange('password2')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword2}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {values.showPassword2 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                    <div style={{marginTop: "30px"}}>
                        <Button variant="primary" type="submit" style={{width:"100%"}}>Sign Up</Button>
                    </div>
            </form>
        </div>
    )
}

export default Signup