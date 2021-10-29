import React from 'react'

const Countries = ({ countries }) => {
  return (
    <div>
      {countries.map(country => (
        <p key={country.alpha3Code}>
          <img width="30px" src={country.flags.png} alt="country flag" /> {country.name}, {country.alpha3Code}
        </p>
      ))}
    </div>
  )
}

export default Countries
