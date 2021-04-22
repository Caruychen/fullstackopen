import React, { useEffect } from "react";
import { Header, Container } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { setPatientInfo, useStateValue } from "../state";
import { Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import Gender from "../components/Gender";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

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

    if (patients[id] && 'ssn' in patients[id] === false) {
      void fetchPatientInfo();
    }
  }, [dispatch, patients]);

  const findPatient = (id: string): Patient | undefined => {
    return Object.values(patients).find((patient: Patient) => patient.id === id);
  };
  const patient = findPatient(id);

  if (!patient) return null;
  return (
    <div className="App">
      <Container>
        <Header as="h2">{patient.name} <Gender gender={patient.gender}></Gender></Header>
        <p>
          ssn: {patient.ssn}
          <br />
          occupation: {patient.occupation}
        </p>
      </Container>
    </div>
  );
};

export default PatientInfoPage;