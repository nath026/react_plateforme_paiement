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
        name: "",
        description: "",
        price: "",
        quantity: "",
        updatedAt:"",
        createdAt:""
    }

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
                    placeholter="Company Name"
                />
                 <label>KBIS </label>
                 <ErrorMessage name="companyName" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="kbis"
                    placeholter="kbis"
                />
                 <label>Contact Email </label>
                 <ErrorMessage name="contactEmail" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="contactEmail"
                    placeholter="Contact email"
                />
                 <label>Username </label>
                 <ErrorMessage name="username" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="username"
                    placeholter="username"
                />
                 <label>password </label>
                 <ErrorMessage name="password" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="password"
                    placeholter="password"
                    type="password"
                />
                  <label>CreatedAt </label>
                  <ErrorMessage name="createdAt" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="createdAt"
                    placeholter="createdAt"
                />
                  <label>Updated At </label>
                  <ErrorMessage name="updatedAt" component="span" />
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="updatedAt"
                    placeholter="updatedAt"
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