import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  let display = []
  newFilter === '' ? display = persons : display = persons.filter(person => person.name.toLowerCase().includes(newFilter))

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
      <input value={newFilter} onChange={handleFilterChange} />
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
      {display.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App