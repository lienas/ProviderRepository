import {useEffect, useState} from "react";
import {UPLOAD_URL} from "../config/endpoints";
import {useAuth0} from "@auth0/auth0-react";


export const useUploadAPI = () => {

    const {getAccessTokenSilently} = useAuth0();
    const [uploadUrl, setUploadUrl] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [key, setKey] = useState();

    const getUploadURL = async () => {
        setIsLoading(true);
        const token = await getAccessTokenSilently({
            audience: `https://provider-api`
        });
        try {

            console.log('Fetch Upload-Url')
            const endpoint = UPLOAD_URL + '/logo/' + key + '/attachment';
            console.log('endpoint: ', endpoint);
            const response = await fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'post'
            })
            if (response.status === 201) {
                const payload = await response.json();
                console.log('received upload url : ' + JSON.stringify(payload));
                setUploadUrl(payload.uploadUrl.href);
            }

        } catch (err) {

            setIsError(true);
            console.log(err.message);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        if (key !== undefined) {
            getUploadURL()
        }
        return () => {
            setKey(undefined);
        }
    }, [key])

    return [{uploadUrl, isLoading, isError}, setKey]

}
