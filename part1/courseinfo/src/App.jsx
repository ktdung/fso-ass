function Header({ course }) {
  return <h1>{course}</h1>;
}

function Part({ partName, numOfExercises }) {
  return (
    <p>
      {partName} {numOfExercises}
    </p>
  );
}

function Content({ part1, part2, part3 }) {
  return (
    <div>
      <Part partName={part1.name} numOfExercises={part1.exercises} />
      <Part partName={part2.name} numOfExercises={part2.exercises} />
      <Part partName={part3.name} numOfExercises={part3.exercises} />
    </div>
  );
}

const Footer = ({ part1, part2, part3 }) => {
  return (
    <p>
      Number of exercises{' '}
      {part1.exercises + part2.exercises + part3.exercises}
    </p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Footer part1={part1} part2={part2} part3={part3} />
    </div>
  );
};

export default App;
