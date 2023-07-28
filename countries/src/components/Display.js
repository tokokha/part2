import Country from "./Country"
import countryservice from '../services/countries'
import { useState } from 'react'

const Display = ({ data, effect }) => {
    const [weather, setWeather] = useState({})
    if (data.flag) {
        countryservice.getWeather(data.capital).then(response => setWeather(response))
        if (Object.keys(weather).length > 0) {
        return (
            <div>
                <h1>{data.name.common}</h1>
                <p>{data.capital}</p>
                <p>area {data.area}</p>
                <h3>languages:</h3>
                <ul>
                    {Object.values(data.languages).map(lang => <li key={lang}>{lang}</li>)}
                </ul>
                <img alt="country flag" src={data.flags.png}/>
                    <h3>Weather in {data.capital}</h3>
                    <p>temperature {weather.main.temp}</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
                    <p>wind {weather.wind.speed}</p>
            </div>
        )}
    } else if (Array.isArray(data) && data.length > 1) {
        return (
            <div>
                <ul>
                    {data.map(country => <Country key={country} country={country} effect={effect}/>)}
                </ul>
            </div>
        )
    } else {
        return <div>{data}</div>
    }
}

export default Display