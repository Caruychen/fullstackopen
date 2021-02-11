import React from 'react';

const Total = ({ course }) => {
  const exercisesReducer = (sum, currentValue) => sum + currentValue.exercises;
  const total = course.parts.reduce(exercisesReducer, 0);
  return (
    <p>total of {total} exercises</p>
  )
}

export default Total;