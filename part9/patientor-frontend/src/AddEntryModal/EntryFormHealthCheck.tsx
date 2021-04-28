import { Field } from 'formik';
import React from 'react';
import { NumberField } from '../AddPatientModal/FormField';
import { HealthCheckRating } from '../types';
import { EntryFormValues } from './EntryFormBase';

interface BaseProps {
  children: React.ReactNode;
  initialValues: EntryFormValues;
}

interface Props {
  show: string;
  EntryFormBase: ({children, initialValues}: BaseProps) => JSX.Element
}

const EntryFormHealthCheck = ({ show, EntryFormBase}: Props) => {
  if (show !== "HealthCheck") return null;
  return (
    <EntryFormBase
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy
      }}
    >
      <Field
        label="Health Check Rating"
        name="healthCheckRating"
        component={NumberField}
        min={0}
        max={3}
      />
    </EntryFormBase>
  );
};

export default EntryFormHealthCheck;