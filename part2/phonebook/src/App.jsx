import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  let displayPersons = searchTerm
    ? persons.filter((person) => {
        return person.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{' '}
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value.trim());
          }}
        />
      </div>
      <form
        onSubmit={(event) => {
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
            setNewName('');
            setNumber('');
          }
        }}
      >
        <div>
          <h2>add a new</h2>
          name:{' '}
          <input
            value={newName}
            onChange={(event) => {
              setNewName(event.target.value.trim());
            }}
          />
        </div>
        <div>
          number:
          <input
            value={number}
            type="tel"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {displayPersons.map((person, index) => (
        <p key={index + person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
