import React, { useEffect } from "react";
import { Header, Container, List } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { setPatientInfo, useStateValue } from "../state";
import { Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import Gender from "../components/Gender";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const currentPatient = patients[id];
  const isPrivateLoaded = () => 'ssn' in currentPatient;

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
          {currentPatient.entries.map(entry => {
            return (
              <Container key={entry.id}>
                <p>{entry.description}</p>
                <List bulleted>
                  {entry.diagnosisCodes?.map(code => <List.Item key={code}>{code}</List.Item>)}
                </List>
              </Container>
            );
          })}
        </Container>
      </div>
    );
  }
  return null;
};

export default PatientInfoPage;