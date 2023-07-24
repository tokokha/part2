import Country from "./Country"

const Display = ({ data, effect }) => {
    if (data.flag) {
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
            </div>
        )
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