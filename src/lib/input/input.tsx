import React from 'react';
import { Input as ChakraInput, InputProps } from '@chakra-ui/react';

import { IdReactFC } from '../types';
import { useFormikFieldContext } from '../context/formik-field-context';

/**
 * A **checkbox** type component that uses `Checkbox` from `Chakra UI` and handles state with `formik`.
 * This component can be used a single checkbox without value, i.e. true/false and can also be a part of a `CheckboxGroupField` which would allow multiple values to be checked as part of the group, hence a `value` would be needed.
 * @param {CheckboxGroupFieldItemProps} props props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {string} props.value Optional parameter. Must be provided if the checkbox is part of a `CheckboxGroupField`.
 */
const Input: IdReactFC<InputProps> = (inputProps: InputProps) => {
	const { field, meta } = useFormikFieldContext();
	return (
        <ChakraInput
            {...inputProps}
            {...field}
            value={meta.value || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e);
                inputProps.onChange?.(e);
            }}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                field.onBlur(e);
                inputProps.onBlur?.(e);
            }}
        />
	);
};
Input.id = 'Input';

export default Input;
