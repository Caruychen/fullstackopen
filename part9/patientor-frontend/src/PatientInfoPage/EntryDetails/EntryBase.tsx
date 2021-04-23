import React from 'react';
import { Header, Icon, List, Segment, SemanticICONS } from 'semantic-ui-react';
import { useStateValue } from '../../state';
import { Entry } from '../../types';

const EntryBase = ({ children, entry, iconName }: { children: React.ReactNode, entry: Entry, iconName: SemanticICONS }) => {
  const [{ diagnoses },] = useStateValue();
  return (
    <Segment>
      <Header as="h4">{entry.date} <Icon name={iconName}></Icon>{entry.specialist}</Header>
      <em style={{ color: "rgba(0,0,0,0.5)" }}>{entry.description}</em>
      {children}
      {entry.diagnosisCodes &&
        <List bulleted>
          {entry.diagnosisCodes.map(code => <List.Item key={code}>{code} {diagnoses[code].name}</List.Item>)}
        </List>}
    </Segment>
  );
};

export default EntryBase;