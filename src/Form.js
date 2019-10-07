import React from 'react';
import { Input, TextArea } from '@react95/core'
import ErrorMessage from './ErrorMessage';

const Form = ({ handleChange, term, errors }) => (
  <>
    <div>
      <label>Phrase</label>
    </div>
    <div>
      <Input name="word" onChange={handleChange} value={term.word} />
    </div>
    <ErrorMessage error={errors ? errors.word : null} />

    <div>
      <label>Definition</label>
    </div>
    <div>
      <TextArea name="definition" onChange={handleChange} value={term.definition} />
    </div>
    <ErrorMessage error={errors ? errors.definition : null} />

    <div>
      <label>Example</label>
    </div>
    <div>
      <TextArea name="example" onChange={handleChange} value={term.example} />
    </div>
    <ErrorMessage error={errors ? errors.example : null} />
  </>
);

export default Form;
