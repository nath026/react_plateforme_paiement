// import { Select, TextField, MenuItem, Button } from '@material-ui/core';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import { useState } from "react";
import * as Yup from 'yup';

export default function TraderRegister(){
    
    const [value, setValue] = React.useState('')
    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const initialValues = {
        companyName: "",
        kbis: "",
        devise: "EUR",
        contactEmail: "",
        username: "",
        password: "",
        updatedAt:"",
        createdAt:""
    }

    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required,
        kbis: Yup.number().required,
        contactEmail: Yup.string().required,
        username: Yup.string().required,
        password: Yup.string().required,
        updatedAt:Yup.date().required,
        createdAt:Yup.date().required
    })


    const [listOfTraders, setListOfTraders] = useState([]);
    const onSubmit = (data) => {
        console.log(data);
        axios.post("http://localhost:3000/traders", data).then((response) => {
            setListOfTraders(response.data);
            // console.log("DONE ENVOIE");
        })

    }
    return (
        <>
        <div className="registerTraderContainer">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
       {/* validationSchema={validationSchema} */}
            <Form>
                <label>Nom de la company : </label>
                <ErrorMessage name="companyName" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="companyName"
                    placeholder="Company Name"
                />
                <label>KBIS </label>
                <ErrorMessage name="companyName" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="kbis"
                    placeholder="kbis"
                />
                <label>Devise </label>
                <Field  id="inputRegisterTrader"
                    name="devise" as="select"
                    >
                    <option value="EUR">EUR</option>
                    <option value="YEN">YEN</option>
                    <option value="USD">USD</option>
                </Field>
                <label>Contact Email </label>
                <ErrorMessage name="contactEmail" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="contactEmail"
                    placeholder="abc@abc.fr"
                />
                <label>Username </label>
                <ErrorMessage name="username" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="username"
                    placeholder="abc@abc.fr"
                />
                <label>password </label>
                <ErrorMessage name="password" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="password"
                    placeholder="password"
                    type="password"
                />
                <label>CreatedAt </label>
                <ErrorMessage name="createdAt" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="createdAt"
                    placeholder="2020-12-21"
                    type="date"
                />
                <label>Updated At </label>
                <ErrorMessage name="updatedAt" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="updatedAt"
                    placeholder="2020-12-21"
                    type="date"
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