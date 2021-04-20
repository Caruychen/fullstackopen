export interface DiagnosisType {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NewPatientType = Omit<PatientType, 'id'>;

export type NewPatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}