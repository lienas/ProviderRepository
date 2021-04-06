import React, {Fragment} from "react";
import {AppBar, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import {useAuth0} from "@auth0/auth0-react";
import MyAvatar from "./MyAvatar";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export function Header() {
    const classes = useStyles();
    const {isAuthenticated} = useAuth0()
    console.log('user is logged in = ' + isAuthenticated)
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton}
                                color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Provider-Repo
                    </Typography>
                    {isAuthenticated ?
                        <Fragment>
                            <LogoutButton/>
                            <MyAvatar/>
                        </Fragment>
                        : <LoginButton/>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
