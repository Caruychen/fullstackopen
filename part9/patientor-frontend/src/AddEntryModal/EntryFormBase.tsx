import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button, Grid } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry } from '../types';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Define Entry without the 'id' property
export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface Props {
  children: React.ReactNode;
  initialValues: EntryFormValues;
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const EntryFormBase = ({ children, initialValues, onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) errors.description = requiredError;
        if (!values.date) errors.date = requiredError;
        else {
          if (!Date.parse(values.date)) errors.date = "Malformatted date";
        }
        if (!values.specialist) errors.specialist = requiredError;
        if (values.type === "Hospital") {
          if (!values.discharge.date) errors.discharge = requiredError;
          else {
            if (!Date.parse(values.discharge.date)) errors.discharge = "Malformatted date";
          }
          if (!values.discharge.criteria) errors.discharge = requiredError;
        }
        if (values.type === "OccupationalHealthcare") {
          if (!values.employerName) errors.employerName = requiredError;
          if (values.sickLeave?.startDate && values.sickLeave?.endDate) {
            if (!Date.parse(values.sickLeave.startDate) || !Date.parse(values.sickLeave.endDate)) {
              errors.sickLeave = "Malformatted date";
            }
          } 
        }
        return errors;
      }
      }
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {children}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EntryFormBase;