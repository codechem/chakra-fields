import React from 'react';
import { Form, Formik } from 'formik';
import { SimpleGrid } from '@chakra-ui/react';

import { Values } from './types';
import NativeChakraExample from './native-chakra-example';
import ChakraFieldsExample from './chakra-fields-example';

const App = () => {
  return (
    <SimpleGrid columns={2} spacing={24} mt={4} px={24} justifyItems="stretch" alignItems="center">
      <Formik
        initialValues={{} as Values}
        onSubmit={(values: Values) => alert("Native Chakra:\n" + JSON.stringify(values, null, 2))}
        validate={(values: Values) => {
          const errors = {} as any;
          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Confirm password must match password';
          }
          if (!values.languages || values.languages?.length === 0) {
            errors.languages = 'Must select at least one language';
          }
          return errors;
        }}
      >
        <Form><NativeChakraExample/></Form>
      </Formik>
      <Formik
        initialValues={{ languages: [] as number[] } as Values}
        onSubmit={(values: Values) => alert("With Chakra Fields:\n" + JSON.stringify(values, null, 2))}
        validate={(values) => {
          const errors = {} as any;
          if (!values.languages || values.languages?.length === 0) {
            errors.languages = 'Must select at least one language';
          }
          return errors;
        }}
      >
        <Form><ChakraFieldsExample/></Form>
      </Formik>
    </SimpleGrid>
  );
};

export default App;
