import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsServices from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);

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
      console.log('3');

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
              console.log(returnedPerson);
              setPersons(
                persons.map((person) => {
                  if (person.id === returnedPerson.id) {
                    return returnedPerson;
                  }
                  return person;
                })
              );
            })
            .catch((error) => {
              console.error(error);
              setMessage({
                title: `Information of ${newName} has already been removed from server`,
                type: 'error',
              });
              setPersons(
                persons.filter((person) => person.id !== found.id)
              );
              setTimeout(() => {
                setMessage(null);
              }, 3000);
            });
        }
        return;
      }
      personsServices
        .create(newPerson)
        .then((createdPerson) => {
          console.log('4');

          setPersons(persons.concat(createdPerson));
          setMessage({
            title: `Added ${createdPerson.name}`,
            type: 'success',
          });
          setTimeout(() => {
            setMessage(null);
          }, 2500);
        })
        .catch((error) => {
          console.log('5');
          console.log(error);
          setMessage({
            type: 'error',
            title: `${error.response.data.error}`,
          });
        });
    }
  }

  function handleDeletePerson(id, name) {
    if (window.confirm(`Delete ${name} ?`)) {
      personsServices
        .deletePerson(id)
        .then((response) => {
          console.log(response);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message} />}
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
