import {useAuth0} from "@auth0/auth0-react";

export async function GetBearer(){
    const {getAccessTokenSilently} = await useAuth0()
    return getAccessTokenSilently
}
