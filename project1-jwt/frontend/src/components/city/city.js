import './city.css'
import React,{useState,useEffect} from 'react';
import Nav from "../nav/nav";
import {getToken} from "../../util/authOperations";
import axios from 'axios'
function City(){
    const [citys, setCitys] = useState([]);
    function getData(){
        let token=getToken()
        let header={Authorization:"bearer "+token}
        axios.get('http://localhost:3005/api/v1/city',{headers:header})
        .then(function (response) {
            setCitys(response.data.citys)
            console.log(response.data.citys)
        })
        .catch(function (error) {

            console.log(error);
        })
    }
    useEffect(() => {
        getData()
    }, [])
    

    return(
        <div>
            <div>
                <Nav logout={true}/>
            </div>
            <div className="container-citys">
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citys.map((city)=>{
                            return(
                                <tr>
                                <td>{city.id}</td>
                                <td>{city.name}</td>
                                <td>{city.state}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </div>
       
    )
}
export default City