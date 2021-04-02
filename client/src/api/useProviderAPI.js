import {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";

export const useProviderApi = () => {

    const [data, setData] = useState();
    const [url, setUrl] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const {getAccessTokenSilently} = useAuth0();
    const [method, setMethod] = useState(undefined)
    const [body, setBody] = useState(undefined);

    const getData = async () => {
        setIsLoading(true);
        setIsError(false);
        const token = await getAccessTokenSilently({
            audience: `https://provider-api`
        });
        try {
            console.log("fetching data for url: ", url);
            console.log("token =  ", token);

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const payload = await response.json();
            console.log(payload);
            setData(payload);

        } catch (e) {
            setIsError(true)
        }
        setIsLoading(false);
    };

    const patchData = async () => {
        setIsLoading(true);
        setIsError(false);

        const token = await getAccessTokenSilently({
            audience: `https://provider-api`
        });
        try {
            console.log("patching data for url: ", url);
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: "put",
                body: JSON.stringify(body)
            })
            const payload = await response.json();
            setData(payload);

        } catch (e) {
            setIsError(true)
        }
        setIsLoading(false);

    }

    const postData = async () => {
        setIsLoading(true);
        setIsError(false);

        const token = await getAccessTokenSilently({
            audience: `https://provider-api`
        });
        try {
            console.log("posting data for url: " + url + " with payload " + JSON.stringify(body));
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify(body)
            })
            const payload = await response.json();
            setData(payload);

        } catch (e) {
            setIsError(true)
        }
        setIsLoading(false);

    }

    const deleteData = async () => {
        setIsLoading(true);
        setIsError(false);

        const token = await getAccessTokenSilently({
            audience: `https://provider-api`
        });
        try {
            console.log("deleting data for url: " + url);
            await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "delete",
            });
            //remove from data
            const companies = data._embedded.companies;
            const updatedComp = companies.filter((c) => c._links.self.href !== url);
            const updatedData = {...data, "_embedded": {...data._embedded, companies: updatedComp}};
            setData(updatedData);

        } catch (e) {
            setIsError(true)
        }
        setIsLoading(false);
    }

    useEffect( () => {
        if (url) {
            console.log("Effect invoked")
            switch (method) {
                case "get":
                    getData()
                    break;
                case "patch":
                    patchData();
                    break;
                case "post" :
                    postData();
                    break;
                case "delete" :
                    deleteData();
                    break;
                default: //do nothing
            }

        }
    }, [url, method])

    return [{data, isLoading, isError}, setUrl, setMethod, setBody]
}
