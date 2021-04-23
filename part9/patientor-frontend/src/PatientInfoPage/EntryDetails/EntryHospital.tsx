import React from 'react';
import { Container, SemanticICONS } from 'semantic-ui-react';
import { Entry } from '../../types';
import EntryBase from './EntryBase';

const EntryHospital = ({ entry }: { entry: Entry }) => {
  const iconName: SemanticICONS = "hospital symbol";

  if (entry.type !== "Hospital") return null;
  return (
    <EntryBase entry={entry} iconName={iconName}>
      <Container>
        discharged: {entry.discharge.date}
        <br />
        criteria: {entry.discharge.criteria}
      </Container>
    </EntryBase>
  );
};

export default EntryHospital;
