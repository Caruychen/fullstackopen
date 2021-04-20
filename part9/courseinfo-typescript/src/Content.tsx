import React from 'react';
import { course } from './types';

const Course = ({ coursePart }: { coursePart: course }) => {
  return (
    <p>
      {coursePart.name} {coursePart.exerciseCount}
    </p>
  )
}

const Content = ({ courseParts }: { courseParts: Array<course> }) => {
  return (
    <>
      {courseParts.map(coursePart => <Course key={coursePart.name} coursePart={coursePart} />)}
    </>
  )
}

export default Content;