import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsServices from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    personsServices.getAll().then((initialPersons) => {
      console.log('promise fulfilled');
      setPersons(initialPersons);
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
    if (newName !== '' || number !== '') {
      let newPerson = {
        name: newName,
        number: number,
      };

      let found = persons.find((person) => {
        return person.name === newName;
      });
      if (found !== undefined) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          personsServices
            .editPerson(found.id, {
              ...newPerson,
              id: found.id,
            })
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) => {
                  if (person.id === returnedPerson.id) {
                    return returnedPerson;
                  }
                  return person;
                })
              );
            });
        }
        return;
      }
      personsServices.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    }
  }

  function handleDeletePerson(id, name) {
    if (window.confirm(`Delete ${name} ?`)) {
      personsServices.deletePerson(id).then((response) => {
        console.log(response);
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} />

      <h2>Numbers</h2>
      <Persons
        persons={displayPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
