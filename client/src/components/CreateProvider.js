import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export class CreateProvider extends Component {
    render() {
        return (
            <Container>
                <h2>Create new Provider</h2>
                <Button variant="outlined">
                    <Link to="/">Home</Link>
                </Button>
            </Container>
        )
    }
}
