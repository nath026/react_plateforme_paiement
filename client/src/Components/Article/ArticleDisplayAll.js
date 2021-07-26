import axios from "axios";
import { useEffect, useState } from "react";

export default function ArticleDisplayAll() {

    const [listOfArticles, setListOfArticles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/articles").then((response) => {
            setListOfArticles(response.data);
        })
    }, [])

    return (
    <>
    <div>
        {listOfArticles.map((value, key) => {
            return ( <div className="traderShow"> 
                <div className="id">Fiche article : {value.id}</div>
                <div className="name"> name : {value.name}</div>
                <div className="description">description: {value.description}</div>
                <div className="price">price : {value.price}</div>
                <div className="traderId">traderId : {value.traderId}</div>
                <br></br>
            </div>
            );
        })}
    </div>
    </>
    );
}