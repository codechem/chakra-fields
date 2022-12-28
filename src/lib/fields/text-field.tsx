import React from 'react';
import { useField } from 'formik';
import { Input, InputProps } from '@chakra-ui/react';

import FormControlField from './form-control-field';
import { extractFormControlOptions } from '../utils';
import { ValidatedFieldProps } from '../types';

export type TextFieldProps = ValidatedFieldProps<string> & InputProps;

/**
 * An **input** type **text** component with a label that uses `Input` from `Chakra UI` and handles its state and validation with `formik`.
 * Also, the `Input` component is wrapped inside of a `FormControl` component from `Chakra UI` which handles the displaying of the label and error messages from `formik`.
 * @param {TextFieldProps} props props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {string} props.label Optional parameter. The text of the label.
 * @param {object} props.labelCss Optional parameter. Custom css for the label.
 * @callback props.validate Optional parameter. Function that will be used by `formik` to validate the input from this field.
 */
const TextField: React.FC<TextFieldProps> = ({
	name,
	validate,
	label,
	labelPosition = 'before',
	labelCss,
	formControlCss,
	errorMessageCss,
	...inputProps
}: TextFieldProps) => {
	const [field, meta] = useField<string>({ name, type: 'text', validate });

	return (
		<FormControlField
			meta={meta}
			errorMessageCss={errorMessageCss}
			labelProps={{ label, labelPosition, labelCss }}
			{...{ ...extractFormControlOptions(inputProps), ...formControlCss }}
		>
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
		</FormControlField>
	);
};

export default TextField;
