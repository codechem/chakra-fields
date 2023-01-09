import React from 'react';
import { useField } from 'formik';
import { NumberInputProps } from '@chakra-ui/react'

import NumberInput from '../input/number-input';
import FormControlField from './form-control-field';
import { extractFormControlOptions } from '../utils';
import { FormFieldProps, ValidatedFieldProps } from '../types';
import { FormikFieldContextProvider } from '../context/formik-field-context';

export type NumberFieldProps = ValidatedFieldProps<string> & FormFieldProps & NumberInputProps;

/**
 * An **input type number** component with a floating label that uses `NumberInput` from `Chakra UI` and handles its state and validation with `formik`.
 * Also, the `NumberInput` component is wrapped inside of a `FormControl` component from `Chakra UI` which handles the displaying of the label and error messages from `formik`.
 *
 * **NOTE**: the value will be persisted into the `formik` state as a `string`. So, when you retrieve it from the context it will be of type `string`.
 * This is a consequence of using `NumberInput` from `Chakra UI` which demands a `string` when used to round numbers.
 * @param {NumberFieldProps} props props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {string} props.floatingLabelText Required parameter. The text of the floating label.
 * @param {number} props.precision Optional parameter. The number of decimal spots used to round this number. By default 0 (whole number).
 * @param {object} props.labelCss Optional parameter. Custom css for the floating label.
 * @callback props.validate - Optional parameter. Function that will be used by `formik` to validate the input from this field.
 * @callback props.onValueChange Optional parameter. On change handler. Use this and do not use `onChange`.
 */
const NumberField: React.FC<NumberFieldProps> = ({
	name,
	validate,
    children,
	label,
	labelPosition = 'before',
	labelProps,
	formControlProps,
	errorMessageProps,
	...numberInputProps
}: NumberFieldProps) => {
	const [field, meta, helpers] = useField<string>({ name, validate, type: 'number' });
	return (
		<FormControlField
			name={field.name}
			label={label as any}
			labelProps={labelProps}
			labelPosition={labelPosition}
			errorMessageProps={errorMessageProps}
			{...{ ...extractFormControlOptions(numberInputProps), ...formControlProps }}
		>
			<FormikFieldContextProvider value={{ field, meta, helpers }}>
				<NumberInput {...numberInputProps}>
					{children}
				</NumberInput>
			</FormikFieldContextProvider>
		</FormControlField>
	);
};

export default NumberField;
