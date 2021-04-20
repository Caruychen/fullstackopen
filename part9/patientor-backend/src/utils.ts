import { NewPatientType, Gender, NewPatientFields } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseString = (text: unknown, field: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${field}`);
  }
  return text;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: NewPatientFields): NewPatientType => {
  const newPatient: NewPatientType = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation')
  };
  return newPatient;
};

export default toNewPatient;