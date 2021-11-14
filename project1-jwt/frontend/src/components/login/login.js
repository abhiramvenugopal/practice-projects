import './login.css'
import React,{useEffect, useState} from 'react';
import Nav from "../nav/nav";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    var navigate=useNavigate();
    useEffect(() => {
        window.localStorage.clear()
    }, [])

    function login(e){
        e.preventDefault()
        let reqObject={username,password}
        axios.post(
            'http://localhost:3005/api/v1/login',reqObject
        )
        .then(res=>{
            window.localStorage.setItem("Token",res.data.token)
            console.log(res)
            navigate("/city")
        })
        .catch(err=>{console.log('err')})
    }

    return(
        <div>
            <div>
                <Nav login={true} />
            </div>
            <div className="container-center">
                <form className="col-md-3">
                    <div className="form-group">
                        <label >Email address</label>
                        <input onChange={(e)=>{setUsername(e.target.value)}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <button onClick={(e)=>{login(e)}}  type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
       
    )
}
export default Login