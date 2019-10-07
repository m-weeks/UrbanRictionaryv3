import React, { Component } from 'react';
import { Modal, Button, Alert } from '@react95/core'
import axios from 'axios';
import Form from './Form';

class Terms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creating: false,
      success: false,
      newTerm: {
        word: '',
        definition: '',
        example: '',
      },
      terms: [],
      errors: {},
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  openModal() {
    this.setState({
      creating: true,
    })
  }

  closeModal() {
    this.setState({
      creating: false,
    });
  }

  closeAlert() {
    this.setState({
      success: false,
    });
  }

  handleChange(event) {
    const { newTerm } = this.state;
    this.setState({
      newTerm: {
        ...newTerm,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { newTerm } = this.state;
    axios.post('/api/terms', newTerm)
      .then(() => {
        this.setState({ newTerm: { word: '', definition: '', example: ''}, creating: false, success: true })
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          this.setState({ errors: error.response.data.errors });
        }
      });
  }

  render() {
    const { creating, success, newTerm, errors } = this.state;
    return (
      <>
        <Button onClick={this.openModal}>Submit New Term</Button>
        {creating
          ? (
            <Modal
              style={{ height: 'auto', width: 'auto' }}
              title="New Term"
              closeModal={this.closeModal}
              buttons={[
                { value: 'OK', onClick: this.handleSubmit}, 
                { value: 'Cancel', onClick: this.closeModal },
              ]}
            >
              <Form term={newTerm} handleChange={this.handleChange} errors={errors} />
            </Modal>
          )
          : null
        }

        {success
          ? (
            <Alert
              title="Success"
              message="Thank you for submitting your term. It will be (hopefully) reviewed soon!"
              closeModal={this.closeAlert}
              closeAlert={this.closeAlert}
            />
          )
          : null
        }
        
      </>
    );
  }
}

export default Terms;