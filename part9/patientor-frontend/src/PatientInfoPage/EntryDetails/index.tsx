import React from 'react';
import { Entry } from '../../types';
import EntryHealthCheck from './EntryHealthCheck';
import EntryHospital from './EntryHospital';
import EntryOccupationalHealthCare from './EntryOccupationalHealthCare';

const assertNever = (value: never): null => {
  console.error('Unhandled entry type union member:', value);
  return null;
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <EntryHospital entry={entry} />;
    case "OccupationalHealthcare":
      return <EntryOccupationalHealthCare entry={entry} />;
    case "HealthCheck":
      return <EntryHealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;