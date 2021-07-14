import axios from "axios";
import { useEffect } from "react";

export default function TraderDisplayAll(){
    useEffect(() => {
        axios.get("http://localhost:3000/traders").then((response) => {
            console.log(response);
        })
    }, [])
    return (
    <>
    </>
    );
}