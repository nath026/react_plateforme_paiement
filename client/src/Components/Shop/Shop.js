import React, {useContext} from "react";
import {Add, Delete} from '@material-ui/icons';
import {
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import {ArticleContext} from "../../Contexts/ArticleContext";

export default function Shop() {

    const { article } = useContext(ArticleContext);
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List>
            {article.map((articles) => {
                return (
                    <ListItem key={articles} role={undefined} dense button onClick={handleToggle(articles)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(articles) !== -1}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText primary={articles.label}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end">
                                <Add/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}