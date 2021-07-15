import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import { useState } from "react";
import * as Yup from 'yup';

export default function TraderArticle(){
    const [value, setValue] = React.useState('')
    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const initialValues = {
        name: "",
        description: "",
        price: "",
        quantity: "",
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required,
        description: Yup.string().required,
        price: Yup.number().required,
        quantity: Yup.number().required,
    })

    const [listOfTraderArticles, setListOfTraderArticles] = useState([]);
    const onSubmit = (data) => {
        console.log(data);
        axios.post("http://localhost:3000/articles", data).then((response) => {
            setListOfTraderArticles(response.data);
            // console.log("DONE ENVOIE");
        })

    }
    return (
       <>
       <div className="newTraderArticleContainer">
       <Formik initialValues={initialValues} onSubmit={onSubmit}>
       {/* validationSchema={validationSchema} */}
            <Form>
                <label>Product name </label>
                <ErrorMessage name="name" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputNewArticle"
                    name="name"
                    placeholter="Product name"
                />
                 <label>Description </label>
                 <ErrorMessage name="description" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputNewArticle"
                    name="description"
                    placeholter="Description"
                />
                 <label>Price</label>
                <Field 
                    autocomplete="off"
                    id="inputNewArticle"
                    name="price"
                    placeholter="Price"
                />
                 <label>Quantity </label>
                 <ErrorMessage name="quantity" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputNewArticle"
                    name="quantity"
                    placeholter="Quantity"
                />
                <button type="submit">Sumbit</button>
            </Form>
       </Formik>
       </div>
       </>
    );
}


