import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdote';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    // const newAncedote = await anecdoteService.createNew(content);
    // console.log(newAncedote);
    dispatch(createAnecdote(content));
    dispatch(setNotification(`New anecdote created: ${content}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <div>
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

export default AnecdoteForm;
