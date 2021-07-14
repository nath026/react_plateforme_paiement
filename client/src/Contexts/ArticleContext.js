import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const ArticleContext = createContext();

export default function ArticleProvider({children}){
    const [article, setArticle] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/articles").then((response) => {
            setArticle(response.data);
        })

    }, []);
    return(
        <ArticleContext.Provider value={{article}}>
            {children}
        </ArticleContext.Provider>
    );
}