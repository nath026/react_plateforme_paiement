import { Select, TextField, MenuItem, Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';



export default function TraderRegister(){
    const useStyles = makeStyles((theme) => ({
    }))
    const [value, setValue] = React.useState('')
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return (
       <>
       <div className="registerTraderContainer">
        <form className="registerTrader" noValidate autoComplete="off">
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
            <Button color="primary">S'inscrire</Button>
        </form>
       </div>
       </>
    );
}