import Content from './Content';
import Header from './Header';
import Total from './Total';

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

export default Course;
