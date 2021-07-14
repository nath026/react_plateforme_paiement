import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const TraderContext = createContext();



export default function TraderProvider({children}){
    const [trader, setTrader] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/traders").then((response) => {
            setTrader(response.data);
        })

    }, []);
    return(
        <TraderContext.Provider value={{trader}}>
            {children}
        </TraderContext.Provider>
    );
}