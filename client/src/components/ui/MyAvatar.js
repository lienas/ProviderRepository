import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Avatar} from "@material-ui/core";

const MyAvatar = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <Avatar alt = {user.name} src={user.picture} />
        )
    );
};

export default MyAvatar;
