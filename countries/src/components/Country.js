const Country = ({ country, effect }) => {
    return (
            <>
            <li>{country} <button onClick={() => effect(country)}>show</button></li>
            </>
    )
}

export default Country