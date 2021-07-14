import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {TraderContext} from "../../Contexts/TraderContext";

export default function Home() {
    const { trader } = useContext(TraderContext);
    return (
        <>
            <h1>Chez qui souhaitez vous faire vos achats ?</h1>
            <List>
                {trader.map((traders) => (
                    <ListItem key={traders}
                              dense
                              button
                              component={Link} to={`/${traders.username}/shop`}
                    >
                        <ListItemText primary={traders.companyName}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}

            </List>
        </>
    );
}