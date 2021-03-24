import {Component} from "react";
import {_getAllProviders} from "../api/provider-api";
import ProviderCard from "./ProviderCard";
import {Grid} from "@material-ui/core";
import {useAuth0} from "@auth0/auth0-react";

export class ProviderList extends Component {

    state = {
        companies: []
    }


    async componentDidMount() {
        const data = await _getAllProviders();
        if (data) this.setState({
            companies: data.companies
        })
    }

    render() {
        return (
            <Grid container>
                {this.state.companies.map(d =>
                    <Grid item xs={2} key={d._links.self.href}>
                        <ProviderCard name={d.name} profile={d.profile}/>
                    </Grid>)
                }
            </Grid>
        )
    }
};
