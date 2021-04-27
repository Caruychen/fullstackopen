export interface DiagnosisType {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string,
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosisType['code']>
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;

export interface PatientType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<PatientType, 'ssn' | 'entries'>;

export type NewPatientType = Omit<PatientType, 'id'>;

export type NewPatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
  entries?: unknown
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, 'id'>;

interface NewBaseEntryFields {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown
}

interface NewHospitalEntryFields extends NewBaseEntryFields {
  type: "Hospital";
  discharge: unknown;
}

interface NewOccupationalHealthCareEntryFields extends NewBaseEntryFields {
  type: "OccupationalHealthcare";
  employerName: unknown;
  sickLeave?: unknown;
}

interface NewHealthCheckEntryFields extends NewBaseEntryFields {
  type: "HealthCheck";
  healthCheckRating: unknown;
}

export type NewEntryFields = NewHospitalEntryFields | NewOccupationalHealthCareEntryFields | NewHealthCheckEntryFields;