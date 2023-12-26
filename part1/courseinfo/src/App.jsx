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

function Content(props) {
  return (
    <div>
      <Part
        partName={props.parts[0].name}
        numOfExercises={props.parts[0].exercises}
      />
      <Part
        partName={props.parts[1].name}
        numOfExercises={props.parts[1].exercises}
      />
      <Part
        partName={props.parts[2].name}
        numOfExercises={props.parts[2].exercises}
      />
    </div>
  );
}

const Footer = (props) => {
  // console.log(props.parts[0].exercises);
  return (
    <p>
      Number of exercises{' '}
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Footer parts={parts} />
    </div>
  );
};

export default App;
