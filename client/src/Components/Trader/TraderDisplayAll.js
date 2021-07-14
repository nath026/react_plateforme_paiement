import axios from "axios";
import { useEffect, useState } from "react";

export default function TraderDisplayAll(){
    const [listOfTraders, setListOfTraders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/traders").then((response) => {
            setListOfTraders(response.data);
        })
    }, [])
    return (
    <>
    <div>
        {listOfTraders.map((value, key) => {
            return ( <div className="traderShow"> 
                <div className="id">Fiche trader : {value.id}</div>
                <div className="username"> Username : {value.username}</div>
                <div className="name">Nom du marchand : {value.companyName}</div>
                <div className="kbis">KBIS : {value.kbis}</div>
                <div className="devise">Devis : {value.devise}</div>
                <div className="contact">Contact :{value.contactEmail}</div>
                <br></br>
            </div>
            );
        })}
    </div>
    </>
    );
}