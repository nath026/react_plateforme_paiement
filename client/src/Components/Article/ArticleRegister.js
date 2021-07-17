import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import { useState } from "react";


export default function ArticleRegister(){
    const [value, setValue] = React.useState('')
    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const initialValues = {
        name: "",
        description: "",
        price: "",
        quantity: "",
        updatedAt:"",
        createdAt:"",
        token: localStorage.getItem("jwt"),
    }

    const [listOfArticles, setListOfArticles] = useState([]);
    const onSubmit = (data) => {
        console.log(data);
        axios.post("http://localhost:3000/articles", data)
        .then((response) => {
            setListOfArticles(response.data);
            console.log(response);
        })
        .catch((e) => { 
            console.log(JSON.stringify(e));
        })

    }
    return (
       <>
       <div className="registerTraderContainer">
       <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
                <label>Name : </label>
                <Field 
                    autocomplete="off"
                    id="inputSaveArticle"
                    name="name"
                    placeholder="name"
                />
                 <label>description </label>
                <Field 
                    autocomplete="off"
                    id="inputSaveArticle"
                    name="description"
                    placeholder="description"
                />
                 <label>price</label>
                <Field 
                    autocomplete="off"
                    id="inputSaveArticle"
                    name="price"
                    placeholder="12"
                />
                 <label>quantity</label>
                <Field 
                    autocomplete="off"
                    id="inputSaveArticle"
                    name="quantity"
                    placeholder="quantity"
                />
                  <label>CreatedAt </label>
                <Field 
                    autocomplete="off"
                    id="inputSaveArticle"
                    name="createdAt"
                    placeholder="2020-12-21"
                />
                  <label>Updated At </label>
                <Field 
                    autocomplete="off"
                    id="inputSaveArticle"
                    name="updatedAt"
                    placeholder="2020-12-21"
                />
                <button type="submit"> Envoyer </button>
            </Form>
       </Formik>
       </div>
       </>
    );
}

