import diagnosesData from '../../data/diagnoses';
import { DiagnosisType } from '../types';

const getDiagnoses = (): Array<DiagnosisType> => {
  return diagnosesData;
};

export default {
  getDiagnoses
};