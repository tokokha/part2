import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    for (let i = 0; i < persons.length; i++) {
      if (JSON.stringify(persons[i].name) === JSON.stringify(personObject.name) || JSON.stringify(persons[i].number) === JSON.stringify(personObject.number)) {
        personObject.name = ""
        personObject.number = ""
        alert(`${newName} or ${newNumber} is already added to the phonebook`)
        break
      }
    }
    
    if (personObject.name !== undefined && personObject.number !== undefined && personObject.name !== '' && personObject.number !== '') {
      setPersons(persons.concat(personObject))
    }
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input placeholder='Arto Hellas' value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input placeholder='12345678' value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App