import React, {useState} from "react";
import axios from "axios";

export default function TraderLogin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        const data = { username: username, password: password};
        axios.post("http://localhost:3000/traders/login", data)
        .then((response) => {
            if(response.status === 200)
            {
                localStorage.setItem('jwt', response.data.token);
            }       
        })
        // TODO: si erreur, afficher pop up
        .catch((e) => console.log("MAUVAIS MDP"));
    }
    return (
        <>
        <input type="text"
        onChange={(event) => {
            setUsername(event.target.value);
        }}
        />
        <input type="password"
        onChange={(event) => {
            setPassword(event.target.value)}}
        />

        <button onClick={login}> Login </button>
        </>
    );
}