import patientsData from '../../data/patients';
import { PatientType, NewPatientType } from '../types';
import { v1 as uuid } from 'uuid';

let patients = patientsData;

const getPatients = (): Omit<PatientType, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatientType): PatientType => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients = patientsData.concat(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};