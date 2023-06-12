import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    },[navigate])

    const handleLogin = async () => {
        console.log("Login", email, password)
        let result = await fetch("http://localhost:5000/login", {
            method:'POST',
            body:JSON.stringify({email, password}),
            headers:{
                "Content-type":'application/json'
            }
        });
        result = await result.json()
        console.log(result)
        if(result.auth){
            localStorage.setItem('user', JSON.stringify(result.user))
            localStorage.setItem('token', JSON.stringify(result.auth))
            navigate('/');
        }else {
            alert("Please provide correct details!")
        }
    }
    return (
        <div className="login">
            <h2 className="productList-heading">Login</h2>
            <input className="inputBox" type="text" placeholder="Enter your Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <input className="inputBox" type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
}

export default Login;