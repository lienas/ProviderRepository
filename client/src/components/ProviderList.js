import {Component} from "react";
import {_getAllProviders} from "../api/provider-api";
import ProviderCard from "./ProviderCard";
import {Grid} from "@material-ui/core";

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
            <div>
                <h1>Provider-Repository</h1>
                <Grid container spacing={2}>
                    {this.state.companies.map(d =>
                        <Grid item xs={3}>
                            <ProviderCard name={d.name} profile={d.profile}/>
                        </Grid>)
                        // <div key={{d._links.self.href}}>
                        //     <h2 key={d._links.self.href}>{d.name}</h2>
                        //     <p>{d.profile}</p>
                        // </div>
                    }
                </Grid>
            </div>
        )
    }
};
