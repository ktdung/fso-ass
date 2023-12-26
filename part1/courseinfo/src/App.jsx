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

function Content({
  part1,
  part2,
  part3,
  exercises1,
  exercises2,
  exercises3,
}) {
  return (
    <div>
      <Part partName={part1} numOfExercises={exercises1} />
      <Part partName={part2} numOfExercises={exercises2} />
      <Part partName={part3} numOfExercises={exercises3} />
    </div>
  );
}

const Footer = ({ exercises1, exercises2, exercises3 }) => {
  return (
    <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Footer part1={part1} part2={part2} part3={part3} />
    </div>
  );
};

export default App;
