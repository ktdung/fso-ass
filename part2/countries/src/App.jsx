import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
        console.log(response.data);
      });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    let listCountries = countries.filter((data) => {
      let countryName = data.name.common;
      return countryName
        .toLowerCase()
        .includes(country.toLowerCase());
    });
    setList(listCountries);
    console.log(listCountries);
  };

  let renderList = '';
  console.log(list.length);

  if (list.length > 10) {
    renderList = <p>Too many matches, spectify another filter</p>;
  } else if (list.length <= 10 && list.length > 1) {
    renderList = (
      <>
        {list.map((item) => {
          return <p key={item.name.common}>{item.name.common}</p>;
        })}
      </>
    );
  } else if (list.length === 1) {
    console.log('test');
    let languages = (
      <ul>
        {Object.values(list[0].languages).map((language) => {
          console.log(language);
          return <li key={language}>{language}</li>;
        })}
      </ul>
    );
    renderList = (
      <>
        <p>capital {list[0].capital}</p>
        <p>area {list[0].area}</p>

        {languages}
        <p>
          <img src={`${list[0].flags.png}`} width={150} />
        </p>
      </>
    );
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="country">find countries</label>
        <input
          type="text"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
      </form>
      {renderList}
    </div>
  );
}
export default App;
