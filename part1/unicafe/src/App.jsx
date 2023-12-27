import { useState } from 'react';

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {text === 'positive' && ' %'}
      </td>
    </tr>
  );
}

const Statistics = ({ good = 0, bad = 0, neutral = 0 }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'all'} value={good + neutral + bad} />
        <StatisticLine
          text={'average'}
          value={
            (good + neutral * 0 + bad * -1) / (good + neutral + bad)
          }
        />
        <StatisticLine
          text="positive"
          value={(good / (good + neutral + bad)) * 100}
        />
      </tbody>
    </table>
  );
};

const Button = ({ children, handleClick }) => {
  return <button onClick={handleClick}>{children}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)}>good</Button>
      <Button handleClick={() => setNeutral(neutral + 1)}>
        neutral
      </Button>
      <Button handleClick={() => setBad(bad + 1)}>bad</Button>
      <h2>statistics</h2>
      {good !== 0 || neutral !== 0 || bad !== 0 ? (
        <Statistics good={good} bad={bad} neutral={neutral} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
