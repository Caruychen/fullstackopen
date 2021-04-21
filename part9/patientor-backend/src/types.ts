export interface DiagnosisType {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

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
  entries: unknown
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}