import React from 'react';
import { NumberInput as ChakraNumberInput, NumberInputProps } from '@chakra-ui/react';

import { IdReactFC } from '../types';
import { useFormikFieldContext } from '../context/formik-field-context';

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
