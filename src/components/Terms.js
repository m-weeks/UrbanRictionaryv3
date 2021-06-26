import React, { useState, useCallback, useEffect } from 'react';
import { Button, Alert, Fieldset } from '@react95/core'
import axios from 'axios';
import { useClippy } from './Clippy';
import FormModal from './FormModal';

const Terms = (props) => {
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newTerm, setNewTerm] = useState(
    {
      word: '',
      definition: '',
      example: '',
    },
  );
  const [terms, setTerms] = useState([]);
  const [errors, setErrors] = useState({})

  // Load in terms on initial load
  useEffect(() => {
    axios.get('/api/terms')
      .then((response) => {
        if (response.data) {
          setTerms(response.data.terms);
        }
      })
      .catch(() => {});
  }, []);

  const openModal = useCallback(() => {
    setCreating(true);
  }, []);

  const closeModal = useCallback(() => {
    setCreating(false);
  }, []);

  const closeAlert = useCallback(() => {
    setSuccess(false);
  }, []);

  const handleChange = useCallback((event) => {
    setNewTerm({
      ...newTerm,
      [event.target.name]: event.target.value,
    });
  }, [newTerm]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    axios.post('/api/terms', newTerm)
      .then(() => {
        setNewTerm({ word: '', definition: '', example: ''});
        setCreating(false);
        setSuccess(true);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors(error.response.data.errors)
        }
      });
  }, [newTerm])

  const agent = useClippy();

  useEffect(() => {
    if (!agent || !terms.length) {
      return;
    }

    const interval = setInterval(() => {
      const term = terms[Math.floor(Math.random() * terms.length)];
      agent.speak(`${term.word}: ${term.definition}`)
    }, 20000);

    return () => {
      clearInterval(interval);
    }
  }, [agent, terms]);

  return (
    <>
      <Button onClick={openModal}>Submit New Term</Button>
      {creating
        ? (
          <FormModal
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            errors={errors}
            term={newTerm}
          />
        )
        : null
      }

      {success
        ? (
          <Alert
            title="Success"
            message="Thank you for submitting your term. It will be (hopefully) reviewed soon!"
            closeModal={closeAlert}
            closeAlert={closeAlert}
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
};

export default Terms;