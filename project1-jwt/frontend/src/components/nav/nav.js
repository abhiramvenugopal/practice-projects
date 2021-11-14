import './nav.css'
import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
function Nav(props){
    var navigate=useNavigate();
    return(
        <nav className="navbar navbar-light bg-light justify-content-between">
            <h1>JWT</h1>
            <form className="form-inline">
                { props.login && 
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={()=>{navigate("/signup")}} >SignUp</button> 
                }
                {
                    props.signup &&
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={()=>{navigate("/login")}}>LogIn</button>
                }
                {
                    props.logout &&
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={()=>{navigate("/login")}}>Logout</button>
                }
                
            </form>
        </nav>
       
    )
}
export default Nav