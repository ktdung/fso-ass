function Filter({ searchTerm, setSearchTerm }) {
  return (
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
  );
}

export default Filter;
