import React, { useState } from "react";
import Button from "../lib/Button";
import axios from "axios";


const defaultV = {
  token: "",
  secret: "",
};

export default function CredentialsForm({ onSubmit, defaultValues }) {
  const [values, setValues] = useState(defaultValues || defaultV);
  const [listOfCredentials, setListOfCredentials] = useState([]);

  const _onSubmit = () => {
    onSubmit({ ...values });
    axios.post("http://localhost:3000/credentials", values).then((response) => {
      setListOfCredentials(response.values);
    })
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // Vanilla JS approch
        const formData = new FormData(event.target);
        const data = Array.from(formData.keys).reduce((acc, key) => {
          acc[key] = formData.get(key);
          return acc;
        }, {});
        console.log("submit Vanilla", data);
        _onSubmit();
      }}
    >
      <input value={values.token} onChange={handleChange} name="token" />
      <input
        value={values.secret}
        onChange={handleChange}
        type="password"
        name="secret"
      />
      <Button title="submit form"/>
    </form>
  );
}