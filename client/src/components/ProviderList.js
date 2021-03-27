import React, {useEffect} from "react";
import ProviderCard from "./ProviderCard";
import {Backdrop, CircularProgress, Container, Grid, makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {useProviderApi} from "../api/useProviderAPI";
import {useAuth0} from "@auth0/auth0-react";

/* eslint-disable react-hooks/exhaustive-deps */
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    btn: {
        marginBottom: 25,
    }
}));

const ProviderList = () => {

    const classes = useStyles();
    const [{data, isLoading, isError}, doFetch] = useProviderApi();
    const {isAuthenticated} = useAuth0();
    const {companies} = data ? data._embedded : [];

    useEffect(() => {
            doFetch("http://localhost:8080/api/companies");
        }
    )

    return (
        isAuthenticated &&
        <React.Fragment>

            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <div className={classes.btn}>
                <Button variant="outlined">
                    <Link to="/create">Create new provider</Link>
                </Button>
            </div>
            <Grid container spacing={1}>
                {companies ?
                    companies.map(d =>
                        <Grid item xs={6} md={3} lg={2} key={d._links.self.href}>
                            <ProviderCard name={d.name} profile={d.profile} url={d._links.self.href}/>
                        </Grid>) :
                    <h2>no companies</h2>
                }
            </Grid>
        </React.Fragment>
    )
};

export default ProviderList;
