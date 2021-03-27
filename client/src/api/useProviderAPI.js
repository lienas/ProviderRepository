import {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";

export const useProviderApi = () => {

    const [data, setData] = useState();
    const [url, setUrl] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const {getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            setIsError(false);
            const token = await getAccessTokenSilently({
                audience: `https://provider-api`
            });

            try {
                console.log("fetching data for url: ", url);
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const payload = await response.json();

                setData(payload);
            } catch (e) {
                setIsError(true)
            }
            setIsLoading(false);
        };
        url && getData();
    }, [url, getAccessTokenSilently])

    return [{data, isLoading, isError}, setUrl]
}
