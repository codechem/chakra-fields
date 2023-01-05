import React from 'react';
import { useField } from 'formik';
import { Checkbox, CheckboxProps} from '@chakra-ui/react';

import FormControlField from './form-control-field';
import { extractFormControlOptions } from '../utils';
import { FormFieldProps, ValidatedFieldProps } from '../types';

export type CheckboxFieldProps = ValidatedFieldProps<boolean> & FormFieldProps & CheckboxProps;

/**
 * A **checkbox** type component that uses `Checkbox` from `Chakra UI` and handles state with `formik`.
 * This component can be used a single checkbox without value, i.e. true/false and can also be a part of a `CheckboxGroupField` which would allow multiple values to be checked as part of the group, hence a `value` would be needed.
 * @param {CheckboxFieldProps} props props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {string} props.value Optional parameter. Must be provided if the checkbox is part of a `CheckboxGroupField`.
 */
const CheckboxField: React.FC<CheckboxFieldProps> = ({
	name,
	validate,
    children,
	label,
	labelPosition = 'before',
	labelCss,
	formControlCss,
	errorMessageCss,
	...checkboxProps
}: CheckboxFieldProps) => {
	const [field, meta] = useField<boolean>({ name, validate, type: 'checkbox' });
	return (
		<FormControlField
			meta={meta}
			errorMessageCss={errorMessageCss}
			labelProps={{ label, labelPosition, labelCss }}
			{...{ ...extractFormControlOptions(checkboxProps), ...formControlCss }}
		>
			<Checkbox
				{...checkboxProps}
				name={field.name}
				isChecked={field.checked}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					field.onChange(e);
					checkboxProps.onChange?.(e);
				}}
				onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
					field.onBlur(e);
					checkboxProps.onBlur?.(e);
				}}
			>
				{children}
			</Checkbox>
		</FormControlField>
	);
};

export default CheckboxField;
