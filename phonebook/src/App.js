import { useState, useEffect } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import PhoneBook from './components/PhoneBook'
import nameService from './services/names'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('') 
  const [errorMessage, setErrorMessage] = useState('')
  const [errorStyle, setErrorStyle] = useState('')

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
    let personFound = false
    const personObject = {
      name: newName,
      number: newNumber
    }
    for (let i = 0; i < persons.length; i++) {
      if (JSON.stringify(persons[i].number) === JSON.stringify(personObject.number)) {
        personObject.name = ""
        personObject.number = ""
        alert(`${newNumber} is already added to the phonebook`)
    }
      if (JSON.stringify(persons[i].name) === JSON.stringify(personObject.name) && window.confirm(`${personObject.name} is already added to the phonebook, replace the old number with the new one?`) ) {
        const filteredPerson = persons.find(person => JSON.stringify(person.name) === JSON.stringify(personObject.name))
        const changedPerson = {...filteredPerson, number: personObject.number}
        nameService.update(filteredPerson.id, changedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          personObject.name = ""
          personObject.number = ""
          setErrorStyle('good')
          setErrorMessage(
            `${changedPerson.name} information was succesfully changed`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorStyle('bad')
          setErrorMessage(
            `${changedPerson.name} information was already deleted`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        setNewName("")
        setNewNumber("")
        personFound = true
    }
    }
    
    if (!personFound && personObject.name !== undefined && personObject.number !== undefined && personObject.name !== '' && personObject.number !== '') {
      console.log(personObject, 'aqane')
      nameService.create(personObject).then(returnedName => {
        setPersons(persons.concat(returnedName))
        setErrorStyle('good')
        setErrorMessage(
          `${personObject.name} was succesfully added`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
    } else if (!personFound) {
      alert('Please fill the form again')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} style={errorStyle}/>
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