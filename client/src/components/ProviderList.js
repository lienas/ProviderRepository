import React, {useEffect, useState} from "react";
import {_getAllProviders} from "../api/provider-api";
import ProviderCard from "./ProviderCard";
import {Grid, makeStyles} from "@material-ui/core";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

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

    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [companies, setCompanies] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const classes = useStyles();


    useEffect(() => {
            const getData = async () => {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://provider-api`
                });
                const provider = await _getAllProviders(accessToken);
                if (provider) setCompanies(provider.companies)
                setIsLoading(false)
            };
            getData();
        }, []
    )

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated &&
        <React.Fragment>
            <div className={classes.btn}>
                <Button variant="outlined">
                    <Link to="/create" >Create new provider</Link>
                </Button>
            </div>
            <Grid container spacing={1}>
                {companies ?
                    companies.map(d =>
                        <Grid item xs={6} md={3} lg={2} key={d._links.self.href}>
                            <ProviderCard name={d.name} profile={d.profile}/>
                        </Grid>) :
                    <h2>no companies</h2>
                }
            </Grid>
        </React.Fragment>
    )
};

export default ProviderList;
