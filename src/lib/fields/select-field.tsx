import React from 'react';
import { useField } from 'formik';
import { Select, SelectProps } from '@chakra-ui/react';

import FormControlField from './form-control-field';
import { extractFormControlOptions } from '../utils';
import { ValidatedFieldProps } from '../types';

export type SelectFieldProps = ValidatedFieldProps<string | number> & SelectProps;

/**
 * A **select** type component with a floating label that uses `Select` from `Chakra UI` and handles its state and validation with `formik`.
 * Also, the `Select` component is wrapped inside of a `FormControl` component from `Chakra UI` which handles the displaying of the label and error messages from `formik`.
 *
 * **WARNING**: values like '0', '1' which are strings, will be cast to a number, i.e. 0, 1. Meaning that each string that can be parsed into a number, will be parsed into a number automatically and it will be saved into the `formik` state as a number.
 * @param {SelectFieldProps} props props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {string} props.floatingLabelText Required parameter. The text of the floating label.
 * @param {object} props.labelCss Optional parameter. Custom css for the floating label.
 * @callback props.validate Optional parameter. Function that will be used by `formik` to validate the input from this field.
 */
const SelectField: React.FC<SelectFieldProps> = ({
	name,
	validate,
    children: options,
	label,
	labelPosition = 'before',
	labelCss,
	formControlCss,
	errorMessageCss,
	...selectProps
}: SelectFieldProps) => {
	const [field, meta, helpers] = useField<string | number>({ name, validate, type: 'select' });

	return (
		<FormControlField
			meta={meta}
			errorMessageCss={errorMessageCss}
			labelProps={{ label, labelPosition, labelCss }}
			{...{ ...extractFormControlOptions(selectProps), ...formControlCss }}
		>
			<Select
				{...selectProps}
				{...field}
				onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
					let val: string | number = e.target.value;
					const isNumber = !isNaN(Number(val));
					if (isNumber) {
						val = Number(val);
					}
					helpers.setValue(val);
					selectProps.onChange?.(e);
				}}
				onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {
					field.onBlur(e);
					selectProps.onBlur?.(e);
				}}
			>
				{options}
			</Select>
		</FormControlField>
	);
};

export default SelectField;
