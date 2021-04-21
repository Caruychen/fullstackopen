import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br />
            <em>{part.description}</em>
          </p>
        </div>
      )
    case "groupProject":
      return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br />
            <em>project exercises {part.groupProjectCount}</em>
          </p>
        </div>
      )
    case "submission":
      return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br />
            <em>{part.description}</em>
            <br />
            submit to {part.exerciseSubmissionLink}
          </p>
        </div>
      )
    case "special":
      return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br />
            <em>{part.description}</em>
            <br />
            required skills: {part.requirements.join(', ')}
          </p>
        </div>
      )
    default:
      return assertNever(part);
  }
};

export default Part