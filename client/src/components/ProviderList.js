import React, {useEffect, useState} from "react";
import {_getAllProviders} from "../api/provider-api";
import ProviderCard from "./ProviderCard";
import {Grid} from "@material-ui/core";
import {useAuth0} from "@auth0/auth0-react";


const ProviderList = () => {

    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [companies, setCompanies] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

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
        <Grid container spacing={1}>
            {companies ?
                companies.map(d =>
                    <Grid item xs={6} md={3} lg={2} key={d._links.self.href}>
                        <ProviderCard name={d.name} profile={d.profile}/>
                    </Grid>) :
                <h2>no companies</h2>
            }
        </Grid>
    )
};

export default ProviderList;
