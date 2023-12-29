import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{}]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person, index) => (
        <p key={index + person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
