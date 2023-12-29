import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  return (
    <div>
      <h2>Phonebook</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (newName !== '') {
            let newPerson = {
              name: newName,
            };
            console.log(persons.concat(newPerson));
            setPersons(persons.concat(newPerson));
            setNewName('');
          }
        }}
      >
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={index + person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
