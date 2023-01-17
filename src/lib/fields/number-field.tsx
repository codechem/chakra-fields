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
 * **Number** type input component that uses `NumberInput` from `Chakra UI` and handles its state with `formik`.
 * The `NumberInput` is wrapped with the `FormControlField` component that handles the displaying of error messages and labels.
 * 
 * NOTE: The `formik` state for this field is of type `string`.
 * 
 * @param {NumberFieldProps} props - props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {FormikValidator<string>} [props.validate] - `Formik` validation function for this field. See [Formik docs](https://formik.org/docs/api/field#validate)
 * @param {React.ReactNode} [props.label] - The label of the field. It is wrapped into the `FormLabel` from `Chakra UI`.
 * @param {string} [props.labelPosition="before"] - The position of the label: "before" (default), "after" or "floating" (not available for this field).
 * @param {FormLabelProps} [props.labelProps] - Custom props for the label component (`FormLabel`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {FormControlProps} [props.formControlProps] - Custom props for the form control component (`FormControl`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {FormErrorMessageProps} [props.errorMessageProps] - Custom props for the error message component (`FormErrorMessage`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @see See [Chakra UI Number Input](https://chakra-ui.com/docs/components/number-input)
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
