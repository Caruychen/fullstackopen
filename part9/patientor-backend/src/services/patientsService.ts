import patientsData from '../../data/patients';
import { PatientType, NewPatientType, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

let patients = patientsData;

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): PatientType | undefined => {
  return patients.find(patient => patient.id === id);
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
  getPatientById,
  addPatient
};