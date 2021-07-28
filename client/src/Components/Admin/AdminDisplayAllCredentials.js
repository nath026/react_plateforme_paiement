import axios from "axios";
import React from 'react';
import { useEffect, useState, useContext } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AdminCredentialForm from '../Admin/AdminCredentialForm';
import { CredentialContext } from "../../Contexts/CredentialContext";


export default function TraderDisplayCredentials(){
    const [value, setValue] = React.useState('')
    const [listOfCredentials, setListOfCredentials] = useState([]);
    const { token, secret, save, decodeCredentials } = useContext(CredentialContext);

    const handleChange = (event) => {
      setValue(event.target.value)
    }

    const initialValues = {
      token: "",
      secret: "",
      TraderId: "",
  }

    useEffect(() => {
        axios.get("http://localhost:3000/credentials").then((response) => {
            setListOfCredentials(response.data);
        })
    }, [])

    const onSubmit = (data) => {
      console.log(data);
      axios.post("http://localhost:3000/credentials", data).then((response) => {
        setListOfCredentials(response.data);
      })

  }

    return (
    <>
            <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                        <TableCell>Id Marchand</TableCell>
                      <TableCell>Token</TableCell>
                      <TableCell >Password</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listOfCredentials.map((value, key) => (
                      <TableRow>
                          <TableCell>{value.traderId}</TableCell>
                        <TableCell> {value.token} </TableCell>
                        <TableCell >{value.secret}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                      <AdminCredentialForm
        onSubmit={(values) => save(values.token, values.secret)}
        defaultValues={decodeCredentials}
      />
                        </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <p>token {token}</p>
      <br/>
      <p> secret {secret}</p>
            
    </>
    );
}