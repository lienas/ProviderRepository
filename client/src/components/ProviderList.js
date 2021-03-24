import React, {useEffect, useState} from "react";
import {_getAllProviders} from "../api/provider-api";
import ProviderCard from "./ProviderCard";
import {Grid} from "@material-ui/core";
import {useAuth0} from "@auth0/auth0-react";


const ProviderList = () => {

    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const [companies, setCompanies] = useState(null)

    useEffect(() => {
            const domain = "dev-osde.eu.auth0.com";

            const getData = async () => {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                });
                await _getAllProviders(accessToken);
                if (getData) setCompanies(getData.companies)
            };
            getData();
        }, []
    )

    return (
        <Grid container>
            {companies ?
                companies.map(d =>
                    <Grid item xs={2} key={d._links.self.href}>
                        <ProviderCard name={d.name} profile={d.profile}/>
                    </Grid>) :
                <h2>no companies</h2>
            }
        </Grid>
    )
};

export default ProviderList;
