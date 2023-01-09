import React from 'react';
import { NumberInput as ChakraNumberInput, NumberInputProps } from '@chakra-ui/react';

import { IdReactFC } from '../types';
import { useFormikFieldContext } from '../context/formik-field-context';

/**
 * A **checkbox** type component that uses `Checkbox` from `Chakra UI` and handles state with `formik`.
 * This component can be used a single checkbox without value, i.e. true/false and can also be a part of a `CheckboxGroupField` which would allow multiple values to be checked as part of the group, hence a `value` would be needed.
 * @param {CheckboxGroupFieldItemProps} props props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {string} props.value Optional parameter. Must be provided if the checkbox is part of a `CheckboxGroupField`.
 */
const NumberInput: IdReactFC<NumberInputProps> = (numberInputProps: NumberInputProps) => {
	const { field, meta, helpers } = useFormikFieldContext();
	return (
        <ChakraNumberInput
            {...numberInputProps}
            name={field.name}
            value={meta.value || ''}
            onChange={(valueAsString: string, valueAsNumber: number) => {
                helpers.setValue(valueAsString);
                numberInputProps.onChange?.(valueAsString, valueAsNumber);
            }}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                field.onBlur(e);
                numberInputProps.onBlur?.(e);
            }}
        >
            {numberInputProps.children}
        </ChakraNumberInput>
	);
};
NumberInput.id = 'Input';

export default NumberInput;
