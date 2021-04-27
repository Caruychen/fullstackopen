import React, { useEffect, useState } from "react";
import { Header, Container, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { addEntry, setPatientInfo, useStateValue } from "../state";
import { Entry, Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import Gender from "../components/Gender";
import EntryDetails from "./EntryDetails/index";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const currentPatient = patients[id];
  const isPrivateLoaded = (): boolean => 'ssn' in currentPatient;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    }
    catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setPatientInfo(patientInfoFromApi));
      }
      catch (e) {
        console.error(e);
      }
    };
    if (currentPatient && !isPrivateLoaded()) {
      void fetchPatientInfo();
    }
  }, [dispatch, patients]);

  if (currentPatient && isPrivateLoaded()) {
    return (
      <div className="App">
        <Container>
          <Header as="h2">{currentPatient.name} <Gender gender={currentPatient.gender}></Gender></Header>
          <p>
            ssn: {currentPatient.ssn}
            <br />
            occupation: {currentPatient.occupation}
          </p>
          <Header as="h3">entries</Header>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
          {currentPatient.entries.map(entry => {
            return (
              <EntryDetails key={entry.id} entry={entry} />
            );
          })}
        </Container>
      </div>
    );
  }
  return null;
};

export default PatientInfoPage;