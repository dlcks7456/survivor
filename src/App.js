import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import {useState, useEffect} from "react"
import Home from "./routes/Home"
import Detail from "./routes/Detail"
import Signup from "./routes/Signup"
import Goto from "./routes/Goto"
import Login from "./routes/Login"
import Modal from "react-modal";
import TypeIt from "typeit-react";

function App() {
  Modal.setAppElement('#root');

  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState(null);

  useEffect(()=>{
    if( sessionStorage.getItem("user_name")===null ){
      setIsLogin(false);
    }else{
      setUserName(sessionStorage.getItem("user_name"));
    }
  },[]);
  
  const loginTrue = (flag)=>{
    setIsLogin(flag);
  }

  return (
      <>
      <div style={{width:"100%", textAlign:"center", marginBottom: "10px"}}>
          <div style={{fontSize:"50px", fontWeight:"bold"}}>SURVIVOR</div>
          <div><TypeIt options={{
            strings: ["<span style='color: #0d6efd'>써</span>니 이거 <span style='color: #0d6efd'>봐</span>! <span style='color: #0d6efd'>이</span>거 안보면 <span style='color: #0d6efd'>벌</span>받아 😉"],
            speed: 50,
            waitUntilVisible: true,
            afterComplete: (instance)=>{
              instance.destroy();
              setTimeout( ()=>{
                instance.reset().go();
              }, 15000 );
            }
          }} /></div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/redirect" element={<Goto loginTrue={loginTrue} setUserName={setUserName}/>}/>
          <Route path="/auth/login" element={isLogin ? <Navigate to="/"/> : <Login loginTrue={loginTrue} setUserName={setUserName}/>}/>
          <Route path="/auth/signup" element={<Signup/>}/>
          <Route path="/detail/:id" element={isLogin ? <Detail/> : <Navigate to="/auth/login"/>}/>
          <Route path="/" element={isLogin ? <Home userName={userName}/> : <Navigate to="/auth/login"/>}/>
        </Routes>
      </BrowserRouter>
      <footer style={{width: "80%", textAlign: "center", position: "absolute", bottom: 15, left: "10%", fontSize: "12px"}}>© 2022 Copyright : <a href="mailto:dlcks17@kakao.com">dlcks17@kakao.com</a></footer>
      </>
  );
}

export default App;
