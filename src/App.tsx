import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, Formik } from 'formik';
import TextField from './lib/fields/text-field';

function App() {
  return (
    <>
      <Formik initialValues={{ name: '', surname: '', address: '' }} onSubmit={(values) => alert(JSON.stringify(values))}>
        <Form>
          <TextField 
            name='name'
            label='label'
            labelPosition='before'
          />
          <TextField 
            name='surname'
            label='label 2'
            labelPosition='after'
          />
          <TextField 
            name='address'
            label='label'
            labelPosition='floating'
          />
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </>
  );
}

export default App;
