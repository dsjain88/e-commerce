import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
const Login =()=>{
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    useEffect (()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/")
        }
    })
    const handleLogin = async ()=>{
        console.log(email, password);
        let result = await fetch("http://localhost:5000/login",{
            method: 'post',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type':'application/json'
            }
        });
        result = await result.json()
        console.warn(result);
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate("/");
        }else{
            alert("please enter correct Details")
        }
        // login by name
        // if(result.name){
        //     localStorage.setItem("user", JSON.stringify(result))
        //     navigate("/");
        // }else{
        //     alert("please enter correct Details")
        // }

    }
    return(
        <div className="wrapper">
            <h1>Login</h1>
            <input className="input-box" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
            <input className="input-box" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
            <button className="btn" type="button" onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;