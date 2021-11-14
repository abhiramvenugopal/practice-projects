import './signup.css'
import React, {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Nav from "../nav/nav";
import axios from 'axios'
function Signup(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [wrongPassword, setWrongPassword] = useState(true)
    var navigate=useNavigate();
    useEffect(() => {
        window.localStorage.clear()
    }, [])

    function createUser(e){
        e.preventDefault()
        let reqObject={username,password}
        axios.post(
            'http://localhost:3005/api/v1/signup',reqObject
        )
        .then(res=>{
            console.log(res)
            navigate("/login")

        })
        .catch(err=>{console.log('err')})

    }

    return(
        <div>
            <div>
                <Nav signup={true} />
            </div>
            <div className="container-center">
                <form className="col-md-3">
                    <div className="form-group">
                        <label >Email address</label>
                        <input type="email" onChange={(e)=>{setUsername(e.target.value)}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label >Confirm Password</label>
                        <input type="password" onChange={(e)=>{setWrongPassword(e.target.value===password)}} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    {
                        !wrongPassword &&
                        <div className="alert alert-danger" role="alert">
                        Password is not matching
                        </div>
                    }
                    
                    <button onClick={(e)=>{createUser(e)}} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
       
    )
}
export default Signup