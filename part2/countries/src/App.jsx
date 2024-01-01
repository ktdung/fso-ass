import { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = import.meta.env.VITE_SOME_KEY;
console.log(api_key);

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [list, setList] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
        console.log(response.data);
      });
  }, []);

  useEffect(() => {
    if (list.length === 1) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${list[0].capital}&appid=${api_key}&units=metric`
        )
        .then((response) => {
          setWeather(response.data);
        });
    }
  }, [list]);

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

  function showCountry(country) {
    let newList = [country];
    setList(newList);
  }

  if (list.length > 10) {
    renderList = <p>Too many matches, spectify another filter</p>;
  } else if (list.length <= 10 && list.length > 1) {
    renderList = (
      <>
        {list.map((item) => {
          return (
            <p key={item.name.common}>
              {item.name.common}{' '}
              <button onClick={() => showCountry(item)}>show</button>
            </p>
          );
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
        <h3>Weather in {list[0].capital}</h3>
        <p>temperature {weather.main.temp} Celcius</p>
        <img
          src={` https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          width={80}
        />
        <p>wind {weather.wind.speed} m/s</p>
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
