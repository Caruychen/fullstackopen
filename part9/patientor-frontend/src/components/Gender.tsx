import React from 'react';
import { Icon } from 'semantic-ui-react';

type GenderProps = {
  gender: "male" | "female" | "other"
};

const assertNever = (value: never): null => {
  console.error('Unhandled gender union member:', value);
  return null;
};

const Gender = ({ gender }: GenderProps) => {
  switch (gender) {
    case "male":
      return <Icon name="mars"></Icon>;
    case "female":
      return <Icon name="venus"></Icon>;
    case "other":
      return <Icon name="transgender alternate"></Icon>;
    default:
      return assertNever(gender);
  }
};

export default Gender;