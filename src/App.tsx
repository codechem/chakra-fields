import React from 'react';
import { Form, Formik } from 'formik';
import { SimpleGrid } from '@chakra-ui/react';

import NativeChakraExample from './examples/native-chakra-example';
import ChakraFieldsExample from './examples/chakra-fields-example';

export enum FormKey {
	FULL_NAME = 'fullName',
	USERNAME = 'username',
	AGE = 'age',
	DOB = 'dob',
	PASSWORD = 'password',
	CONFIRM_PASSWORD = 'confirmPassword',
	DISABLE_FIELD = 'disableField',
	YEAR_STUDIES = 'yearStudies',
	TUITION_AMOUNT = 'tuitionAmount',
	COMMENTS = 'comments',
	TERMS = 'terms',
	LANGUAGES = 'languages'
};

export type Values = {
	[FormKey.FULL_NAME]: string;
	[FormKey.USERNAME]: string;
	[FormKey.AGE]: string;
	[FormKey.DOB]: string;
	[FormKey.PASSWORD]: string;
	[FormKey.CONFIRM_PASSWORD]: string;
	[FormKey.DISABLE_FIELD]: string;
	[FormKey.YEAR_STUDIES]: string;
	[FormKey.TUITION_AMOUNT]: string;
	[FormKey.COMMENTS]: string;
	[FormKey.TERMS]: string;
	[FormKey.LANGUAGES]: number[];
};

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

export function calculateAge(dob: string) {
    return Math.floor((Date.now() - new Date(dob).getTime()) / 3.15576e+10).toString();
};

export default App;
