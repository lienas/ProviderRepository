import {GetBearer} from "./bearer";

const baseUrl = 'http://localhost:8080/api/'

export async function _getAllProviders() {

    const url = baseUrl + 'companies'
    console.log('retrieve provider-list from ' + url)
    //const bearer = await GetBearer()
    const headers = ""
    const response = await fetch(url)
    if (response.ok) {
        console.log('response status:' + response.status)
        const data = await response.json()
        console.log('response content:' + JSON.stringify(data._embedded))
        return data._embedded
    }

}
