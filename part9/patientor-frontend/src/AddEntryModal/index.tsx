import React, { useState } from 'react';
import { Button, Modal, Segment } from 'semantic-ui-react';
import EntryFormBase, { EntryFormValues } from './EntryFormBase';
import EntryFormHealthCheck from './EntryFormHealthCheck';
import EntryFormHospital from './EntryFormHospital';
import EntryFormOccupationalHealthcare from './EntryFormOccupationalHealthcare';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

interface BaseProps {
  children: React.ReactNode;
  initialValues: EntryFormValues;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [formToShow, setFormToShow] = useState<string>("Hospital");
  const baseComponent = ({ children, initialValues }: BaseProps): JSX.Element =>
  (<EntryFormBase initialValues={initialValues} onSubmit={onSubmit} onCancel={onClose}>
    {children}
  </EntryFormBase>);

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Actions>
        <Button.Group widths="3">
          <Button active={formToShow === "Hospital"} onClick={() => setFormToShow("Hospital")}>Hospital</Button>
          <Button active={formToShow === "OccupationalHealthcare"}
            onClick={() => setFormToShow("OccupationalHealthcare")}>Occupational Healthcare</Button>
          <Button active={formToShow === "HealthCheck"} onClick={() => setFormToShow("HealthCheck")}>Health Check</Button>
        </Button.Group>
      </Modal.Actions>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <EntryFormHospital show={formToShow} EntryFormBase={baseComponent} />
        <EntryFormHealthCheck show={formToShow} EntryFormBase={baseComponent} />
        <EntryFormOccupationalHealthcare show={formToShow} EntryFormBase={baseComponent} />
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;