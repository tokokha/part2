import Search from './components/Search';
import { useState, useEffect } from 'react'
import countryservice from './services/countries'
import Display from './components/Display'


const App = () => {
  const [code, setCode] = useState('')
  const [countries, setCountries] = useState([])
  const [content, setContent] = useState([])
  const [newCountry, setNewCountry] = useState([])

  const handleCountrySearch = (event) => {
    setCode(event.target.value)
  }

  useEffect(() => {
    countryservice.getAll().then(countryResponse => {
      setCountries(countryResponse.map(country => country.name.common))
    })
  }, [])

  
  useEffect(() => {
    console.log("effect run, country is now", code)

    if (code) {
      setNewCountry(countries.filter(name => name.toLowerCase().includes(code)))
    }
  }, [code, countries])

  useEffect(() => {
    if (newCountry.length > 10) {
      setContent('too many matches, specify another filter')
    }
    if (newCountry.length < 10 && newCountry.length > 1) {
      setContent(newCountry)
    } 
    if (newCountry.length === 1 && newCountry[0] !== undefined) {
      countryservice.requestCountry(newCountry).then(data => {
        setContent(data)
      })
    }
  }, [newCountry])
  
  
  console.log(content)
  return (
    <>
      <Search value={code} onChange={handleCountrySearch} />
      <Display data={content} />
    </>
  );
}

export default App;
