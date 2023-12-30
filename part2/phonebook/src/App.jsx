import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled');
      setPersons(response.data);
    });
  }, []);

  console.log('render', persons.length, 'persons');

  let displayPersons = searchTerm
    ? persons.filter((person) => {
        return person.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    : persons;

  function handleSubmit(newName, number) {
    event.preventDefault();
    if (newName !== '' || number !== '') {
      let newPerson = {
        name: newName,
        number: number,
      };

      let foundIndex = persons.findIndex((person) => {
        return person.name === newName;
      });
      if (foundIndex !== -1) {
        alert(`${newName} is alreay added to phonebook`);
        return;
      }
      console.log(persons.concat(newPerson));
      setPersons(persons.concat(newPerson));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} />

      <h2>Numbers</h2>
      <Persons persons={displayPersons} />
    </div>
  );
};

export default App;
