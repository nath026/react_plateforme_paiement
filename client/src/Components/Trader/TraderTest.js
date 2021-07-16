import React, {useState} from "react";
import axios from "axios";

export default function TraderLogin(){
    

    const truc = () => {
        // TODO: vérifier sur l'user est connecté 
        axios.post("http://localhost:3000/traders/test", {
            token: localStorage.getItem("jwt")
        })
        .then((response) => {
            console.log("traderId" + response.data);      
        })
        // TODO: si erreur, afficher pop up
        .catch((e) => console.log("MAUVAIS MDP"));
    }
    return (
        <>
        
        <button onClick={truc}> Truc specifique à faire d'un traider en particulier </button>
        </>
    );
}