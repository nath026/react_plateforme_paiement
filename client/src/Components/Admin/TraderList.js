import {Title} from "@material-ui/icons";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {useEffect, useState} from "react";
import axios from "axios";

export default function TraderList() {
    const [listOfTraders, setListOfTraders] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3000/traders").then((response) => {
            setListOfTraders(response.data);
        })
    }, [])
    return (
        <>
            <Title> Liste des Marchands</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell> Nom </TableCell>
                        <TableCell> Devise</TableCell>
                        <TableCell> Mail de contact</TableCell>
                        <TableCell> Statut </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listOfTraders.map((value, key) => {
                        return (
                            <TableRow key={value.id}>
                                <TableCell> {value.username} </TableCell>
                                <TableCell> {value.devise}</TableCell>
                                <TableCell> {value.contactEmail}</TableCell>
                                <TableCell> {value.role} </TableCell>
                                {value.role === 'PENDING' &&
                                <button> Accepter </button>
                                }
                            </TableRow>);
                        })}
                </TableBody>
            </Table>
        </>
    );
}