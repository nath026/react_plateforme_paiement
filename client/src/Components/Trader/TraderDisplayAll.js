import axios from "axios";
import { useEffect } from "react";

export default function TraderDisplayAll(){
    return (
       useEffect(() => {
           axios.get("http://localhost:3000/traders").then((response) => {
               console.log(response);
           })
       }, [])
    );
}