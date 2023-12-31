function Persons({ persons, handleDeletePerson }) {
  return (
    <div>
      {persons.map((person, index) => (
        <p key={index + person.name}>
          {person.name} {person.number}{' '}
          <button
            onClick={() => handleDeletePerson(person.id, person.name)}
          >
            delete
          </button>
        </p>
      ))}
    </div>
  );
}

export default Persons;
