import React, { useState } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const defaultV = {
  token: "",
  secret: "",
};

export default function CredentialsForm({ onSubmit, defaultValues }) {
  const [values, setValues] = useState(defaultValues || defaultV);

  const _onSubmit = () => {
    onSubmit({ ...values });
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
      <button > Générer les credentials</button>
    </form>
  );
}