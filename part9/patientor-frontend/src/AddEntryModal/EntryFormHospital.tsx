import React from 'react';
import { Field } from 'formik';
import EntryFormBase, { EntryFormValues } from './EntryFormBase';
import { NestedTextField } from '../AddPatientModal/FormField';

interface Props {
  show: string;
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const EntryFormHospital = ({ show, onSubmit, onCancel }: Props) => {
  if (show !== "Hospital") return null;
  return (
    <EntryFormBase
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <Field
        label="Discharge"
        name="discharge.date"
        placeholder="date"
        component={NestedTextField}
      />
      <Field
        name="discharge.criteria"
        placeholder="criteria"
        component={NestedTextField}
      />
    </EntryFormBase>
  );
};

export default EntryFormHospital;