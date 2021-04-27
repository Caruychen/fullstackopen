import React, { useState } from 'react';
import { Button, Modal, Segment } from 'semantic-ui-react';
import { EntryFormValues } from './EntryFormBase';
import EntryFormHealthCheck from './EntryFormHealthCheck';
import EntryFormHospital from './EntryFormHospital';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [formToShow, setFormToShow] = useState<string>("Hospital");

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Actions>
        <Button.Group widths="3">
          <Button active={formToShow === "Hospital"} onClick={() => setFormToShow("Hospital")}>Hospital</Button>
          <Button active={formToShow === "HealthCheck"} onClick={() => setFormToShow("HealthCheck")}>Health Check</Button>
        </Button.Group>
      </Modal.Actions>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <EntryFormHospital show={formToShow} onSubmit={onSubmit} onCancel={onClose} />
        <EntryFormHealthCheck show={formToShow} onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;