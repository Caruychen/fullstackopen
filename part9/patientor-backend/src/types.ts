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
  gender: string;
  occupation: string;
}