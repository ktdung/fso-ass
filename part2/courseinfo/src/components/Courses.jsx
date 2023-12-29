import Course from './Course';

const Courses = ({ courses, name }) => {
  return (
    <div>
      <h1>{name}</h1>
      {courses.map((course) => {
        return <Course key={course.id} course={course} />;
      })}
    </div>
  );
};

export default Courses;
