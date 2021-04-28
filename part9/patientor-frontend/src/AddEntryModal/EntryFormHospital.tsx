import React from 'react';
import { Field } from 'formik';
import { EntryFormValues } from './EntryFormBase';
import { NestedTextField } from '../AddPatientModal/FormField';

interface BaseProps {
  children: React.ReactNode;
  initialValues: EntryFormValues;
}

interface Props {
  show: string;
  EntryFormBase: ({children, initialValues}: BaseProps) => JSX.Element
}

const EntryFormHospital = ({ show, EntryFormBase }: Props) => {
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