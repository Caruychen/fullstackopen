import React from 'react';

const Header = ({ course }) => <h2>{course.name}</h2>

const Total = ({ course }) => {
  const exercisesReducer = (sum, currentValue) => sum + currentValue.exercises;
  const total = course.parts.reduce(
    exercisesReducer, 0
  );
  return <b>total of {total} exercises</b>
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course;