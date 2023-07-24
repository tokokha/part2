import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getAll = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return request.then(response => response.data)
}


const requestCountry = (code) => {
    const request = axios.get(`${baseUrl}/${code}`)
    return request.then(response => response.data)
}

export default { requestCountry, getAll }