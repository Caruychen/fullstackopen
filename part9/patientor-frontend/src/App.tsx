import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { setDiagnoses, setPatientList, useStateValue, Action } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientInfoPage from "./PatientInfoPage";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchCallBack = async (endPoint: string, action: (param: Patient[] & Diagnosis[]) => Action ) => {
      try {
        const { data } = await axios.get<Patient[] & Diagnosis[]>(
          `${apiBaseUrl}/${endPoint}`
        );
        dispatch(action(data));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchCallBack('patients', setPatientList);
    void fetchCallBack('diagnoses', setDiagnoses);

  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <PatientInfoPage />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
