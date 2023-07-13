import { useState, useEffect } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import PhoneBook from './components/PhoneBook'
import nameService from './services/names'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    nameService.getAll().then(initialNotes => {
      setPersons(initialNotes)
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
  
  const handlePersonRemoval = (id) => {
    const individual = persons.filter(person => person.id === id)
    const individualName = individual[0].name
    const individualId = individual[0].id
    if (window.confirm(`Do you really want to delete ${individualName} ?`)){
      nameService.remove(individualId)
      setPersons(persons.filter(person => person.id !== individualId))
      console.log("removed")
    }
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
      nameService.create(personObject).then(returnedName => {
        setPersons(persons.concat(returnedName))
        setNewName('')
        setNewNumber('')
      })
    } else {
      alert('Please fill the form again')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={newFilter} onChange={handleFilterChange} />
      <Form onSubmit={addPerson} inputs={[
        { text: 'name', value: newName, onChange: handleNameChange},
        { text: 'number', value: newNumber, onChange: handleNumberChange}
      ]}/>
      <PhoneBook data={display} removeExpression={handlePersonRemoval} />
    </div>
  )
}

export default App