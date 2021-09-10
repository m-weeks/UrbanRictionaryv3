import React, { useCallback } from 'react';
import { Modal, List } from '@react95/core'
import Form from './Form';
import { useClippy } from './agents/Clippy';

const FormModal = (props) => {
  const {
    closeModal,
    handleSubmit,
    handleChange,
    errors,
    term,
  } = props;

  const agent = useClippy();

  const handleHelp = useCallback(() => {
    agent.speak("I see you're trying to create a term. Need help with that?");
  }, [agent]);

  return (
    <Modal
      style={{ height: 'auto', width: 'auto' }}
      title="New Term"
      closeModal={closeModal}
      menu={[
        {
          name: 'Help',
          list: (
            <List>
              <List.Item onClick={handleHelp}>Help</List.Item>
            </List>
          ),
        },
      ]}
      buttons={[
        { value: 'OK', onClick: handleSubmit}, 
        { value: 'Cancel', onClick: closeModal },
      ]}
    >
      <Form term={term} handleChange={handleChange} errors={errors} />
    </Modal>
  )
};

export default FormModal;
