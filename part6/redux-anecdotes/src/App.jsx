import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log(id);
    dispatch({
      type: 'VOTE',
      payload: {
        id: id,
      },
    });
  };

  const addNewAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch({
      type: 'NEW',
      payload: {
        content,
      },
    });
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes) &&
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
