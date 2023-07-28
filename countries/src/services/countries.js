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

const getWeather = (capital) => {
    const request = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    return request.then(response => response.data)
}

export default { requestCountry, getAll, getWeather }