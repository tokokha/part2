const PhoneBook = ({ data }) => {
    return (
            <div>
                <h2>Numbers</h2>
                {data.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
            </div>
    )
}

export default PhoneBook