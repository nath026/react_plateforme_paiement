import React from 'react';
import { useContext } from "react";
import { ListContext } from "../Contexts/ListContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import { useState } from "react";
import * as Yup from 'yup';

export default function Transaction(){
    // const { totalPrice } = useContext(ListContext);
    const [transaction, setTransaction] = React.useState('');
    const [setValue] = useState([]);

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const initialValues = {
        firstName: "",
        lastName: "",
        price: "",
        addressFacturation: "",
        addressLivraison: "",
        date: "",
        currency: "",
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
                <Field id="inputTransactionCurrency"
                    name="currency" as="select">
                    <option value="red">EUR</option>
                    <option value="green">YEN</option>
                    <option value="blue">USD</option>
                </Field>
                <button type="submit"> Valider la transaction </button>
            </Form>
        </Formik>
        </div>
        </>
    );
}