const Header = (props) => {
  return <h2>{props.course}</h2>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part
          key={part.id}
          part={part.name}
          exercises={part.exercises}
        />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);
  return (
    <>
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total numOfExercises={totalExercises} />
      </div>
    </>
  );
};

const Total = ({ numOfExercises }) => {
  return <h3>total of {numOfExercises} exercises</h3>;
};

const Curriculum = ({ courses, name }) => {
  return (
    <div>
      <h1>{name}</h1>
      {courses.map((course) => {
        return <Course key={course.id} course={course} />;
      })}
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <Curriculum
      courses={courses}
      name={'Web development curriculum'}
    />
  );
};

export default App;
