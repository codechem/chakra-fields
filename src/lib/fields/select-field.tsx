import React from 'react';
import { useField } from 'formik';
import { Select, SelectProps } from '@chakra-ui/react';

import FormControlField from './form-control-field';
import { extractFormControlOptions } from '../utils';
import { FormFieldProps, ValidatedFieldProps } from '../types';

export type SelectFieldProps = ValidatedFieldProps<string> & FormFieldProps & SelectProps;

/**
 * **Select** type input component that uses `Select` from `Chakra UI` and handles its state with `formik`.
 * The `Select` is wrapped with the `FormControlField` component that handles the displaying of error messages and labels.
 * 
 * @param {SelectFieldProps} props - props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {FormikValidator<string>} [props.validate] - `Formik` validation function for this field. See [Formik docs](https://formik.org/docs/api/field#validate)
 * @param {React.ReactNode} [props.label] - The label of the field. It is wrapped into the `FormLabel` from `Chakra UI`.
 * @param {string} [props.labelPosition="before"] - The position of the label: "before" (default), "after" or "floating" (not available for this field).
 * @param {FormLabelProps} [props.labelProps] - Custom props for the label component (`FormLabel`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {FormControlProps} [props.formControlProps] - Custom props for the form control component (`FormControl`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {FormErrorMessageProps} [props.errorMessageProps] - Custom props for the error message component (`FormErrorMessage`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @see See [Chakra UI Select](https://chakra-ui.com/docs/components/select)
 */
const SelectField: React.FC<SelectFieldProps> = ({
  name,
  validate,
    children: options,
  label,
  labelPosition = 'before',
  labelProps,
  formControlProps,
  errorMessageProps,
  ...selectProps
}: SelectFieldProps) => {
  const [field, meta] = useField<string>({ name, validate, type: 'select' });
  return (
    <FormControlField
      name={field.name}
      label={label as any}
      labelProps={labelProps}
      labelPosition={labelPosition}
      errorMessageProps={errorMessageProps}
      {...{ ...extractFormControlOptions(selectProps), ...formControlProps }}
    >
      <Select
        {...selectProps}
        {...field}
        value={meta.value || ''}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          field.onChange(e);
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
