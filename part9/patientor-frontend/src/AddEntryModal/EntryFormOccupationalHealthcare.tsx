import React from 'react';
import { Field } from 'formik';
import { EntryFormValues } from './EntryFormBase';
import { NestedTextField, TextField } from '../AddPatientModal/FormField';

interface BaseProps {
  children: React.ReactNode;
  initialValues: EntryFormValues;
}

interface Props {
  show: string;
  EntryFormBase: ({children, initialValues}: BaseProps) => JSX.Element
}

const EntryFormOccupationalHealthcare = ({ show, EntryFormBase }: Props) => {
  if (show !== "OccupationalHealthcare") return null;
  return (
    <EntryFormBase
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
    >
      <Field
        label="Employer"
        name="employerName"
        placeholder="employer"
        component={TextField}
      />
      <Field
        label="Sick Leave"
        name="sickLeave.startDate"
        placeholder="start date"
        component={NestedTextField}
      />
      <Field
        name="sickLeave.endDate"
        placeholder="end date"
        component={NestedTextField}
      />
    </EntryFormBase>
  );
};

export default EntryFormOccupationalHealthcare;