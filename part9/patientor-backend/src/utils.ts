import { NewPatientType, Gender, NewPatientFields, Entry, NewEntryFields, NewEntry, Discharge, HealthCheckRating } from './types';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type union member:' ${value}`);
};

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is Entry => {
  return ["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(entry.type);
};

const isEntries = (entries: unknown): entries is Entry[] => {
  return Array.isArray(entries) && entries.every(entry => isEntry(entry));
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  return (
    discharge instanceof Object &&
    discharge !== null &&
    'date' in discharge &&
    'criteria' in discharge
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckrating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};


const isDiagnosisCodes = (codes: unknown): codes is string[] => {
  return Array.isArray(codes) && codes.every(code => typeof code === "string");
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing text ${text}`);
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
    throw new Error(`Incorrect or missing entries ${entries}`);
  }
  return entries;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(`Incorrect or missing discharge ${discharge}`);
  }
  if (!isDate(discharge.date)) {
    throw new Error(`Incorrect or missing date in discharge ${discharge.date}`);
  }
  return discharge;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if ((!rating && rating !== 0) || !isHealthCheckrating(rating)) {
    throw new Error(`Incorrect or missing healthCheckRating: ${rating}`);
  }
  return rating;
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!codes || !isDiagnosisCodes(codes)) {
    throw new Error(`Incorrect or missing diagnosis codes ${codes}`);
  }
  return codes;
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }: NewPatientFields): NewPatientType => {
  const newPatient: NewPatientType = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: entries ? parseEntries(entries) : []
  };
  return newPatient;
};

export const toNewEntry = (params: NewEntryFields): NewEntry => {
  const baseFields = {
    description: parseString(params.description),
    date: parseDate(params.date),
    specialist: parseString(params.specialist),
    diagnosisCodes: parseDiagnosisCodes(params.diagnosisCodes)
  };

  switch (params.type) {
    case "Hospital":
      return {
        ...baseFields,
        type: params.type,
        discharge: parseDischarge(params.discharge),
      };
    case "OccupationalHealthcare":
      return {
        ...baseFields,
        type: params.type,
        employerName: parseString(params.employerName)
      };
    case "HealthCheck":
      return {
        ...baseFields,
        type: params.type,
        healthCheckRating: parseHealthCheckRating(params.healthCheckRating)
      };
    default:
      assertNever(params);
      throw new Error(`Incorrect or missing element in entry ${params}`);
  }
};