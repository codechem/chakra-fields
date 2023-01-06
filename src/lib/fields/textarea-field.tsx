import React from 'react';
import { useField } from 'formik';
import { Textarea, TextareaProps } from '@chakra-ui/react';

import FormControlField from './form-control-field';
import { extractFormControlOptions } from '../utils';
import { FormFieldProps, ValidatedFieldProps } from '../types';

export type TextareaFieldProps = ValidatedFieldProps<string> & FormFieldProps & TextareaProps;

/**
 * An **input** type **text** component with a label that uses `Input` from `Chakra UI` and handles its state and validation with `formik`.
 * Also, the `Input` component is wrapped inside of a `FormControl` component from `Chakra UI` which handles the displaying of the label and error messages from `formik`.
 * @param {TextareaFieldProps} props props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {string} props.label Optional parameter. The text of the label.
 * @param {object} props.labelCss Optional parameter. Custom css for the label.
 * @callback props.validate Optional parameter. Function that will be used by `formik` to validate the input from this field.
 */
const TextareaField: React.FC<TextareaFieldProps> = ({
	name,
	validate,
	label,
	labelPosition = 'before',
	labelProps,
	formControlProps,
	errorMessageProps,
	...textAreaProps
}: TextareaFieldProps) => {
	const [field, meta] = useField<string>({ name, validate, type: 'text' });
	return (
		<FormControlField
			name={field.name}
			label={label as any}
			labelProps={labelProps}
			labelPosition={labelPosition}
			errorMessageProps={errorMessageProps}
			{...{ ...extractFormControlOptions(textAreaProps), ...formControlProps }}
		>
			<Textarea
				{...textAreaProps}
				{...field}
				value={meta.value || ''}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
					field.onChange(e);
					textAreaProps.onChange?.(e);
				}}
				onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
					field.onBlur(e);
					textAreaProps.onBlur?.(e);
				}}
			/>
		</FormControlField>
	);
};

export default TextareaField;
