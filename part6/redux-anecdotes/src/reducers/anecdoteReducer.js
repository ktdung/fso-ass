import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdote';

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

export const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // createAnecdote(state, action) {
    //   const content = action.payload;
    //   state.push(action.payload);
    //   // state.push({
    //   //   content,
    //   //   votes: 0,
    //   //   id: getId(),
    //   // });
    // },

    vote(state, action) {
      console.log('action', action);
      // const id = action.payload;
      // const anecdoteTochange = state.find(
      //   (anecdote) => anecdote.id === id
      // );
      // const changedAnecdote = {
      //   ...anecdoteTochange,
      //   votes: anecdoteTochange.votes + 1,
      // };

      return state.map((anecdote) =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      );
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    },

    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  console.log(anecdote);
  return async (dispatch) => {
    const anecdoteChanged = await anecdoteService.vote({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    console.log('return vote: ', anecdoteChanged);
    dispatch(vote(anecdoteChanged));
  };
};

export const { appendAnecdote, setAnecdotes, vote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;

// export const voteAnecdote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: {
//       id: id,
//     },
//   };
// };

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW',
//     payload: {
//       content,
//     },
//   };
// };

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state);
//   console.log('action', action);

//   switch (action.type) {
//     case 'NEW':
//       return [
//         ...state,
//         {
//           content: action.payload.content,
//           id: getId(),
//           votes: 0,
//         },
//       ];
//     case 'VOTE': {
//       const id = action.payload.id;
//       const anecdoteToChange = state.find(
//         (anecdote) => anecdote.id === id
//       );
//       const changeAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1,
//       };
//       return state.map((anecdote) =>
//         anecdote.id !== id ? anecdote : changeAnecdote
//       );
//     }

//     default:
//       return state;
//   }
// };

// export default reducer;
