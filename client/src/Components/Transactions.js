// import { Select, TextField, MenuItem, Button } from '@material-ui/core';
import React from 'react';
import { useContext } from "react";
import { ListContext } from "../Contexts/ListContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import { useState } from "react";
import * as Yup from 'yup';

export default function Transaction(){
    const { totalPrice } = useContext(ListContext);
    const [transaction, setTransaction] = React.useState('');
    // const [setTransaction] = useState([]);

    // const handleChange = (event) => {
    //     setValue(event.target.value)
    // }

    const initialValues = {
        firstName: "",
        lastName: "",
        price: "",
        addressFacturation: "",
        addressLivraison: "",
        date: "",
        currency: "",
        state: "",
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required,
        lastName: Yup.string().required,
        price: Yup.number().required,
        addressFacturation: Yup.string().required,
        addressLivraison: Yup.string().required,
        date:Yup.date().required,
        currency:Yup.string().required,
        state:Yup.string().required
    })

    const onSubmit = (data) => {
        console.log(data);
        axios.post("http://localhost:3000/transactions", data).then((response) => {
            setTransaction(response.data);
        })

    }
    return (
       <>
       <div className="transactionForm">
       <Formik initialValues={initialValues} onSubmit={onSubmit}>
       {/* validationSchema={validationSchema} */}
            <Form>
                <label>Prénom : </label>
                <ErrorMessage name="firstName" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputTransactionFirstName"
                    name="firstName"
                    placeholder="Prénom"
                />
                 <label>Nom : </label>
                 <ErrorMessage name="firstName" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputTransactionLastName"
                    name="lastName"
                    placeholder="Nom"
                />
                 <label>Prix </label>
                <Field 
                    autocomplete="off"
                    id="inputTransactionPrice"
                    name="price"
                    // value={totalPrice}
                    // disabled
                />
                 <label>Adresse de facturation </label>
                 <ErrorMessage name="addressFacturation" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputTransactionFacturation"
                    name="addressFacturation"
                    placeholder="4 rue de Paris"
                />
                 <label>Adresse de livraison </label>
                 <ErrorMessage name="addressLivraison" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputTransactionLivraison"
                    name="addressLivraison"
                    placeholder="4 rue de Paris"
                />
                 <label>Date</label>
                 <ErrorMessage name="date" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputTransactionDate"
                    name="date"
                    placeholder="2921-07-29"
                    type="date"
                />
                  <label>currency </label>
                  <ErrorMessage name="currency" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputTransactionCurrency"
                    name="currency"
                    placeholder="Currency"
                />
                  <label>state </label>
                  <ErrorMessage name="updatedAt" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputTransactionState"
                    name="state"
                    placeholder="state"
                />
                <button type="submit"> Envoyer </button>
            </Form>
       </Formik>
       </div>
       </>
    );
}


// <Field 
// autocomplete="off"
// id="inputRegisterTrader"
// name="devise"
// as="select"
// ><option value="EUR">EUR</option>
// <option value="YEN">YEN</option>
// <option value="USD">USD</option>
// </Field>