import React from 'react';
import { course } from './types';

const Total = ({ courseParts }: { courseParts: Array<course> }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

export default Total;