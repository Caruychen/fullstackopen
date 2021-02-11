import React from 'react';

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, currentValue) => sum + currentValue.exercises, 0);
  return (
    <p>total of {total} exercises</p>
  )
}

export default Total;