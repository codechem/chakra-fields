import React from 'react';
import { useField } from 'formik';
import { Checkbox, CheckboxProps } from '@chakra-ui/react';

import FormControlField from './form-control-field';
import { extractFormControlOptions } from '../utils';
import { FormFieldProps, ValidatedFieldProps } from '../types';

export type CheckboxFieldProps = ValidatedFieldProps<boolean> & FormFieldProps & CheckboxProps;

/**
 * **Checkbox** type input component that uses `Checkbox` from `Chakra UI` and handles its state with `formik`.
 * The `Checkbox` is wrapped with the `FormControlField` component that handles the displaying of error messages and labels.
 *
 * This component **should** be used as a single checkbox input. It stores a `boolean` value in the `formik` state for this field.
 * If you intend to have multiple choice checkboxes, use `CheckboxGroupField`.
 * 
 * @param {CheckboxFieldProps} props - props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {FormikValidator<boolean>} [props.validate] - `Formik` validation function for this field. See [Formik docs](https://formik.org/docs/api/field#validate)
 * @param {React.ReactNode} [props.label] - The label of the field. It is wrapped into the `FormLabel` from `Chakra UI`.
 * @param {string} [props.labelPosition="before"] - The position of the label: "before" (default), "after" or "floating" (not available for this field).
 * @param {FormLabelProps} [props.labelProps] - Custom props for the label component (`FormLabel`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {FormControlProps} [props.formControlProps] - Custom props for the form control component (`FormControl`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {FormErrorMessageProps} [props.errorMessageProps] - Custom props for the error message component (`FormErrorMessage`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @see See [Chakra UI Checkbox](https://chakra-ui.com/docs/components/checkbox)
 */
const CheckboxField: React.FC<CheckboxFieldProps> = ({
	name,
	validate,
    children,
	label,
	labelPosition = 'before',
	labelProps,
	formControlProps,
	errorMessageProps,
	...checkboxProps
}: CheckboxFieldProps) => {
	const [field] = useField<boolean>({ name, validate, type: 'checkbox' });
	return (
		<FormControlField
			name={field.name}
			label={label as any}
			labelProps={labelProps}
			labelPosition={labelPosition}
			errorMessageProps={errorMessageProps}
			{...{ ...extractFormControlOptions(checkboxProps), ...formControlProps }}
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
