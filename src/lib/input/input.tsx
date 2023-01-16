import React from 'react';
import { Input as ChakraInput, InputProps } from '@chakra-ui/react';

import { IdReactFC } from '../types';
import { useFormikFieldContext } from '../context/formik-field-context';

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
