// import { Select, TextField, MenuItem, Button } from '@material-ui/core';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import { useState } from "react";

export default function TraderRegister(){
    const [value, setValue] = React.useState('')
    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const initialValues = {
        companyName: "",
        kbis: "",
        devise: "",
        contactEmail: "",
        username: "",
        password: "",
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
       <Formik initialValues={initialValues} onSubmit={onSubmit} >
            <Form>
                <label>Nom de la company : </label>
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="companyName"
                    placeholter="Company Name"
                />
                 <label>KBIS </label>
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="kbis"
                    placeholter="kbis"
                />
                 <label>Devise </label>
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="devise"
                    as="select"
                ><option value="EUR">EUR</option>
                <option value="YEN">YEN</option>
                <option value="USD">USD</option>
             </Field>
                 <label>Contact Email </label>
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="contactEmail"
                    placeholter="Contact email"
                />
                 <label>Username </label>
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="username"
                    placeholter="username"
                />
                 <label>password </label>
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="password"
                    placeholter="password"
                    type="password"
                />
                  <label>CreatedAt </label>
                <Field 
                    autocomplete="off"
                    id="inputRegisterTrader"
                    name="createdAt"
                    placeholter="createdAt"
                />
                  <label>Updated At </label>
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