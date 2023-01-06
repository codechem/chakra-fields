import React from 'react';
import { useField } from 'formik';

import Item from './checkbox-group-field-item';
import FormControlField from './form-control-field';
import { FormFieldProps, ValidatedFieldProps } from '../types';
import { CheckboxGroupProvider } from '../context/checkbox-group-context';

export type CheckboxGroupFieldProps = {
    children?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    isDisabled?: boolean;
    colorScheme?: (string & {}) | "blue" | "cyan" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "teal" | "yellow" | "whiteAlpha" | "blackAlpha" | "linkedin" | "facebook" | "messenger" | "whatsapp" | "twitter" | "telegram";
    onChange?: (values: (string | number)[]) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
} & ValidatedFieldProps<(string | number)[]> & FormFieldProps;

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
const CheckboxGroupField: React.FC<CheckboxGroupFieldProps> = ({
	name,
    validate,
    children,
	label,
	labelPosition = 'before',
	labelProps,
	formControlProps,
	errorMessageProps,
    size,
    isDisabled,
    colorScheme,
    onChange,
    onBlur
}: CheckboxGroupFieldProps) => {
	const [field, meta, helpers] = useField<(string | number)[]>({ name, validate, type: 'checkbox' });
	return (
		<FormControlField
			name={field.name}
            label={label as any}
			labelProps={labelProps}
			labelPosition={labelPosition}
			errorMessageProps={errorMessageProps}
			{...formControlProps}
		>
            <CheckboxGroupProvider
                value={{ field, meta, helpers, size, isDisabled, colorScheme, onChange, onBlur }}
            >
                {children}
            </CheckboxGroupProvider>
		</FormControlField>
	);
};

export default Object.assign(CheckboxGroupField, { Item });

