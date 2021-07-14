import { Select, TextField, MenuItem, Button } from '@material-ui/core';
import React from 'react';
import axios from "axios";
import { useState } from "react";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';


export default function TraderRegister(){
    const [value, setValue] = React.useState('')
    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const initialvalues = {
        companyName: "",
        kbis: "",
        devise: "",
        contactEmail: "",
        username: "",
    }
    const [listOfTraders, setListOfTraders] = useState([]);
    const onSubmit = (data) => {
        axios.post("http://localhost:3000/traders", data).then((response) => {
            // setListOfTraders(response.data);
            console.log("DONE ENVOIE");
        })
    }
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    return (
       <>
       <div className="registerTraderContainer">
        <form className="registerTrader" autoComplete="off" initialvalues={initialvalues} onSubmit={onSubmit}>
            <TextField id="standard-required" name="companyName" label="Company Name" />
            <TextField id="standard-required" name="kbis" label="KBIS" />
            <Select name="devise" id="standard-select-currency" value={value} onChange={handleChange}>
                <MenuItem value={'EUR'}> EUR </MenuItem>
                <MenuItem value={'USD'}> USD </MenuItem>
                <MenuItem value={'YEN'}> YEN </MenuItem>
            </Select>
            <TextField id="standard-required" name="contactEmail" label="Contact Email" />
            <TextField id="standard-required" name="username" label="Username" />
            <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="CreatedAt"
          name="createdAt"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> </Grid>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="updatedAt"
          name="updatedAt"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> </Grid>
        </MuiPickersUtilsProvider>
            <Button type="submit" color="primary"> S'inscrire</Button>
        </form>
       </div>
       </>
    );
}