import patientsData from '../../data/patients';
import { PatientType, NewPatientType, PublicPatient, NewEntry, Entry } from '../types';
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
  patients = patients.concat(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patients = patients.map(patient =>
    patient.id !== patientId
      ? patient
      : { ...patient, entries: patient.entries.concat(newEntry) }
  );
  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntry
};