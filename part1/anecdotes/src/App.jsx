import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});

  let pointsArr = Object.entries(points);
  console.log(pointsArr);

  let max = 0;
  let index = 0;
  for (let i = 0; i < pointsArr.length; i++) {
    if (pointsArr[i][1] > max) {
      max = pointsArr[i][1];
      index = pointsArr[i][0];
    }
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>
        has{' '}
        {points[selected]
          ? points[selected] > 1
            ? `${points[selected]}  votes`
            : `${points[selected]}  vote`
          : `0 vote`}
      </p>
      <button
        onClick={() => {
          const newPoints = { ...points };
          if (!newPoints[selected]) {
            newPoints[selected] = 1;
          } else {
            newPoints[selected] += 1;
          }
          setPoints(newPoints);
        }}
      >
        vote
      </button>
      <button
        onClick={() => {
          let random = Math.floor(Math.random() * anecdotes.length);
          // console.log(random);
          setSelected(random);
        }}
      >
        next anecdote
      </button>
      <div>
        <h2>Anecdote with most votes</h2>
        {max > 0 ? `${anecdotes[index]} has ${max}` : undefined}
      </div>
    </div>
  );
};

export default App;
