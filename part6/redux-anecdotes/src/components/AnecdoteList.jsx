import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes;
    } else {
      return state.anecdotes.filter(
        (anecdote) =>
          anecdote.content
            .toLowerCase()
            .indexOf(state.filter.toLowerCase()) > -1
      );
    }
  });

  const sortedAnecdotes = [...anecdotes]?.sort(
    (a, b) => b.votes - a.votes
  );

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(voteAnecdote(anecdote));
                // dispatch(
                //   setNotification(`you voted "${anecdote.content}"`)
                // );
                // setTimeout(() => {
                //   dispatch(clearNotification());
                // }, 5000);
                dispatch(
                  setNotification({
                    message: `you voted ${anecdote.content}`,
                    durationInSeconds: 3,
                  })
                );
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
