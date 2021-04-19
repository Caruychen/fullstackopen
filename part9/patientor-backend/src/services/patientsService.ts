import patientsData from '../../data/patients';
import { PatientType } from '../types';

const getPatients = (): Omit<PatientType, 'ssn'>[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatients
};