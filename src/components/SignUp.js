import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"

const SignUp =()=>{
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const navigate = useNavigate();
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/")
        }
    })
    const collectData= async()=>{
        console.warn(name, email, password);
        let result = await fetch("http://localhost:5000/register", {
            method: 'post',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-Type':'application/json'
            }
        })
        result = await result.json()
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result.result))// data store in local storage
        localStorage.setItem("token", JSON.stringify(result.auth))
        navigate('/');
        // if(result){
        //     navigate('/')
        // }
        
    }
    return(
        <div className="wrapper">
            <h1>Register</h1>
            <input className="input-box" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" />
            <input className="input-box" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
            <input className="input-box" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            <button className="btn" type="button" onClick={collectData}>Sign Up</button>
        </div>
    )
}

export default SignUp;

