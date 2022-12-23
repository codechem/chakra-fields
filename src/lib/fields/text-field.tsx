import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input, InputProps, FormLabelProps } from '@chakra-ui/react';
import { useField } from 'formik';

import { CustomLabelProps, ValidatedFieldProps } from '../types';
import { floatingLabelProps } from '../utils';

export type TextFieldProps = ValidatedFieldProps<string> & CustomLabelProps & InputProps;

/**
 * An **input** type **text** component with a label that uses `Input` from `Chakra UI` and handles its state and validation with `formik`.
 * Also, the `Input` component is wrapped inside of a `FormControl` component from `Chakra UI` which handles the displaying of the label and error messages from `formik`.
 * @param {TextFieldProps} props props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {string} props.label Optional parameter. The text of the label.
 * @param {object} props.labelCss Optional parameter. Custom css for the label.
 * @callback props.validate Optional parameter. Function that will be used by `formik` to validate the input from this field.
 */
const TextField = ({ name, validate, label, labelPosition = 'before', labelCss, ...inputProps }: TextFieldProps) => {
	const [field, meta] = useField<string>({ name, type: 'text', validate });
	let formLabel = (<FormLabel {...labelCss}>{label}</FormLabel>);
	if (labelPosition === 'floating') {
		formLabel = (<FormLabel {...labelCss} {...floatingLabelProps} >{label}</FormLabel>);
	}
 
	return (
		<FormControl isInvalid={!!meta.error && meta.touched}>
			{labelPosition === 'before' && formLabel}
			<Input
				{...inputProps}
				{...field}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					field.onChange(e);
					inputProps.onChange?.(e);
				}}
				onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
					field.onBlur(e);
					inputProps.onBlur?.(e);
				}}
			/>
			{(labelPosition === 'after' || labelPosition === 'floating') && formLabel}
			<FormErrorMessage>{meta.error}</FormErrorMessage>
		</FormControl>
	);
};

export default TextField;
