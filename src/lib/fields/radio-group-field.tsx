import React from 'react';
import { useField } from 'formik';
import { FormControlOptions, Radio, RadioGroup, RadioGroupProps } from '@chakra-ui/react'

import FormControlField from './form-control-field';
import { extractFormControlOptions } from '../utils';
import { FormFieldProps, ValidatedFieldProps } from '../types';

export type RadioGroupFieldProps = ValidatedFieldProps<string> & FormFieldProps & FormControlOptions & RadioGroupProps;

/**
 * **Radio Group** type input component that uses `Radio` and handles its state with `formik`.
 * The `Radio Group` is wrapped with the `FormControlField` component that handles the displaying of error messages and labels.
 * 
 * NOTE: As a `Radio` component use either the `RadioGroupFieldProps.Item` component, or the native `Radio` component from `Chakra UI`.
 * 
 * @param {RadioGroupFieldProps} props - props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {FormikValidator<(string | number)[]>} [props.validate] - `Formik` validation function for this field. See [Formik docs](https://formik.org/docs/api/field#validate)
 * @param {React.ReactNode} [props.label] - The label of the field. It is wrapped into the `FormLabel` from `Chakra UI`.
 * @param {string} [props.labelPosition="before"] - The position of the label: "before" (default), "after" or "floating" (not available for this field).
 * @param {FormLabelProps} [props.labelProps] - Custom props for the label component (`FormLabel`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {FormControlProps} [props.formControlProps] - Custom props for the form control component (`FormControl`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {FormErrorMessageProps} [props.errorMessageProps] - Custom props for the error message component (`FormErrorMessage`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @see See [Chakra UI Radio](https://chakra-ui.com/docs/components/radio)
 */
const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
	name,
	validate,
    children,
	label,
	labelPosition = 'before',
	labelProps,
	formControlProps,
	errorMessageProps,
	...radioGroupProps
}: RadioGroupFieldProps) => {
	const [field, meta, helpers] = useField<string>({ name, validate, type: 'radio' });
	return (
		<FormControlField
			name={field.name}
            label={label as any}
			labelProps={labelProps}
			labelPosition={labelPosition}
			errorMessageProps={errorMessageProps}
			{...{ ...extractFormControlOptions(radioGroupProps), ...formControlProps }}
		>
			<RadioGroup
                {...radioGroupProps}
                name={field.name}
                value={meta.value || ''}
				onChange={(nextValue: string) => {
                    helpers.setValue(nextValue);
					radioGroupProps.onChange?.(nextValue);
				}}
				onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
					field.onBlur(e);
					radioGroupProps.onBlur?.(e);
				}}
			>
                {children}
			</RadioGroup>
		</FormControlField>
	);
};

export default Object.assign(RadioGroupField, { Item: Radio });
