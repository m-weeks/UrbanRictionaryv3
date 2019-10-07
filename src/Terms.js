import React, { Component } from 'react';
import { Modal, Button, Alert, Fieldset } from '@react95/core'
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

  componentDidMount() {
    axios.get('/api/terms')
      .then((response) => {
        if (response.data) {
          this.setState({ terms: response.data.terms });
        }
      })
      .catch(() => {});
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
    const { creating, success, newTerm, errors, terms } = this.state;
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
        
        {terms.length
          ? (
            <div style={{ backgroundColor: '#c3c7cb', padding: '1rem', marginTop: '1rem', boxShadow: 'inset 1px 1px 0px 1px #ffffff, inset 0 0 0 1px #868a8e, 1px 1px 0 1px #000' }}>
              {terms.map((term) => (
                <Fieldset key={term._id} legend={term.word} style={{ margin: '1.5rem 0' }}>
                  <div style={{ marginBottom: '1rem' }}>{term.definition}</div>
                  <em>{term.example}</em>
                </Fieldset>
              ))}
            </div>
          )
          : null
        }
      </>
    );
  }
}

export default Terms;