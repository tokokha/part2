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

  const handleCountryButton = (country) => {
    countryservice.requestCountry(country).then(data => {
      setContent(data)
    })
  }

  useEffect(() => {
    countryservice.getAll().then(countryResponse => {
      setCountries(countryResponse.map(country => country.name.common))
    })
  }, [])

  
  useEffect(() => {

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
  

  return (
    <>
      <Search value={code} onChange={handleCountrySearch} />
      <Display data={content} effect={handleCountryButton}/>
    </>
  );
}

export default App;
