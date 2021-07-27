import axios from "axios";
import { useEffect, useState } from "react";

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
                      <TableCell>Token</TableCell>
                      <TableCell align="right">Password</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listOfCredentials.map((value, key) => (
                      <TableRow>
                        <TableCell> {value.token} </TableCell>
                        <TableCell align="right">{value.secret}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell align="right"> <button>Générer des credentials </button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            );
        )
    </>
    );
}