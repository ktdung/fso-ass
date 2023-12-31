import { useState } from 'react';

function PersonForm({ handleSubmit }) {
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(newName, number);
        setNewName('');
        setNumber('');
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
  );
}

export default PersonForm;
