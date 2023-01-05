import React from 'react';
import { useField } from 'formik';
import { RadioGroup, RadioGroupProps } from '@chakra-ui/react'

import FormControlField from './form-control-field';
import { extractFormControlOptions } from '../utils';
import { FormFieldProps, ValidatedFieldProps } from '../types';

export type RadioGroupFieldProps = ValidatedFieldProps<string> & FormFieldProps & RadioGroupProps;

/**
 * An **input type number** component with a floating label that uses `NumberInput` from `Chakra UI` and handles its state and validation with `formik`.
 * Also, the `NumberInput` component is wrapped inside of a `FormControl` component from `Chakra UI` which handles the displaying of the label and error messages from `formik`.
 *
 * **NOTE**: the value will be persisted into the `formik` state as a `string`. So, when you retrieve it from the context it will be of type `string`.
 * This is a consequence of using `NumberInput` from `Chakra UI` which demands a `string` when used to round numbers.
 * @param {RadioGroupFieldProps} props props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {string} props.floatingLabelText Required parameter. The text of the floating label.
 * @param {number} props.precision Optional parameter. The number of decimal spots used to round this number. By default 0 (whole number).
 * @param {object} props.labelCss Optional parameter. Custom css for the floating label.
 * @callback props.validate - Optional parameter. Function that will be used by `formik` to validate the input from this field.
 * @callback props.onValueChange Optional parameter. On change handler. Use this and do not use `onChange`.
 */
const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
	name,
	validate,
    children,
	label,
	labelPosition = 'before',
	labelCss,
	formControlCss,
	errorMessageCss,
	...radioGroupProps
}: RadioGroupFieldProps) => {
	const [field, meta, helpers] = useField<string>({ name, validate, type: 'radio' });
	return (
		<FormControlField
			meta={meta}
			errorMessageCss={errorMessageCss}
			labelProps={{ label, labelPosition, labelCss }}
			{...{ ...extractFormControlOptions(radioGroupProps), ...formControlCss }}
		>
			<RadioGroup
                {...radioGroupProps}
                name={field.name}
                value={meta.value}
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

export default RadioGroupField;
