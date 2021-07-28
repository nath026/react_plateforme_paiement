import axios from "axios";
import { useEffect, useState } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AdminCredentialForm from '../Admin/AdminCredentialForm';


export default function TraderDisplayCredentials(){
    const [listOfCredentials, setListOfCredentials] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/credentials").then((response) => {
            setListOfCredentials(response.data);
        })
    }, [])
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
                      <TableCell><AdminCredentialForm/></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            
    </>
    );
}