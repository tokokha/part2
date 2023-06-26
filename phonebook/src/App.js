import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Form from './components/Form'
import PhoneBook from './components/PhoneBook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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
    } else {
      alert('Please fill the form again')
    }
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={newFilter} onChange={handleFilterChange} />
      <Form onSubmit={addPerson} inputs={[
        { text: 'name', value: newName, onChange: handleNameChange},
        { text: 'number', value: newNumber, onChange: handleNumberChange}
      ]}/>
      <PhoneBook data={display} />
    </div>
  )
}

export default App