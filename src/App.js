import Countries from "./components/Countries";
import { useState, useEffect } from "react";

const axios = require('axios');
const countriesURL = 'https://restcountries.com/v2/all?fields=flags,name,alpha3Code';


function App() {
  const [countries, setCountries] = useState([])
  const [input, setInput] = useState('')
  

  useEffect(() => {
    axios({
      method: 'get',
      url: countriesURL
    }).then(response => setCountries(response.data))
      .catch(error => console.error(error))
  }, [])

  const filterCountries = () => {
    return countries.filter(el => el.name.toLowerCase().includes(input.toLowerCase()) || el.alpha3Code.toLowerCase().includes(input.toLowerCase()))
  }

  return (
    <div>
      <input type="text"
        value={input}
        onChange={event => setInput(event.target.value)}
      />
      <Countries countries={filterCountries()}/>
    </div>
  );
}

export default App;
