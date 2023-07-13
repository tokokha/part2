import Person from "./Person"

const PhoneBook = ({ data, removeExpression }) => {
    return (
            <div>
                <h2>Numbers</h2>
                <ul>
                    {data.map(person => <Person key={person.name} info={person} removeHandler={removeExpression}/>)}
                </ul>
            </div>
    )
}

export default PhoneBook