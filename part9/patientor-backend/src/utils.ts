import { NewPatientType, Gender, NewPatientFields, Entry } from './types';

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

/* TO-DO: update typeguard */
const isEntries = (entries: unknown): entries is Entry[] => {
  return typeof entries !== undefined;
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing text`);
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

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !isEntries(entries)) {
    throw new Error(`Incorrect or missing entries`);
  }
  return entries;
};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }: NewPatientFields): NewPatientType => {
  const newPatient: NewPatientType = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: parseEntries(entries)
  };
  return newPatient;
};

export default toNewPatient;