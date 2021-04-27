import { Field } from 'formik';
import React from 'react';
import { NumberField } from '../AddPatientModal/FormField';
import { HealthCheckRating } from '../types';
import { EntryFormValues } from './EntryFormBase';
import EntryFormBase from './EntryFormBase';

interface Props {
  show: string,
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const EntryFormHealthCheck = ({ show, onSubmit, onCancel }: Props) => {
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
      onSubmit={onSubmit}
      onCancel={onCancel}
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