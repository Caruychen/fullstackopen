import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, parseString, toNewEntry } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

patientsRouter.get('/:id', (req, res) => {
  const id = parseString(req.params.id);
  const patient = patientsService.getPatientById(id);
  if (patient) {
    res.send(patient);
  }
  else {
    res.status(404).send(`Could not find patient with ID: ${id}`);
  }
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  }
  catch (error) {
    res.status(400).send(error.message);
  }
});

patientsRouter.post('/:id/entries', (req, res) => {
  const id = parseString(req.params.id);
  const patient = patientsService.getPatientById(id);

  if (!patient) {
    res.status(404).send(`Could not find patient with ID: ${id}`);
  }
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addEntry(newEntry, id);
    res.json(addedEntry);
  }
  catch (error) {
    res.status(400).send(error.message);
  }

});

export default patientsRouter;