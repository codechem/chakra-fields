import React from 'react';
import { useField } from 'formik';

import Checkbox from './../input/checkbox';
import FormControlField from './form-control-field';
import { FormFieldProps, ValidatedFieldProps } from '../types';
import { CheckboxGroupContextProvider } from '../context/checkbox-group-context';

export type CheckboxGroupFieldProps = {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  colorScheme?: (string & {}) | "blue" | "cyan" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "teal" | "yellow" | "whiteAlpha" | "blackAlpha" | "linkedin" | "facebook" | "messenger" | "whatsapp" | "twitter" | "telegram";
  onChange?: (values: (string | number)[]) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
} & ValidatedFieldProps<(string | number)[]> & FormFieldProps;

/**
 * **Checkbox Group** type input component that uses `Checkbox` and handles its state with `formik`.
 * The `Checkbox Group` is wrapped with the `FormControlField` component that handles the displaying of error messages and labels.
 *
 * This component **should** be used as a `CheckboxGroup`, i.e. when there is a multiple choice of values. It stores an `array` of selected values in the `formik` state for this field.
 * If you intend to have a single checkbox, use `CheckboxField`.
 * 
 * NOTE: As a `Checkbox` component use the `CheckboxGroupField.Item` component, not the native `Checkbox` from `Chakra UI`.
 * 
 * @param {CheckboxGroupFieldProps} props - props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {FormikValidator<(string | number)[]>} [props.validate] - `Formik` validation function for this field. See [Formik docs](https://formik.org/docs/api/field#validate)
 * @param {React.ReactNode} [props.label] - The label of the field. It is wrapped into the `FormLabel` from `Chakra UI`.
 * @param {string} [props.labelPosition="before"] - The position of the label: "before" (default), "after" or "floating" (not available for this field).
 * @param {FormLabelProps} [props.labelProps] - Custom props for the label component (`FormLabel`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {FormControlProps} [props.formControlProps] - Custom props for the form control component (`FormControl`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {FormErrorMessageProps} [props.errorMessageProps] - Custom props for the error message component (`FormErrorMessage`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {"sm" | "md" | "lg"} [props.size] - `size` prop that will be passed to all checkboxes in the group.
 * @param {boolean} [props.isDisabled] - If this field is disabled.
 * @param {string} [props.colorScheme] - The color scheme that will be passed to all checkboxes in the group.
 * @param {(values: (string | number)[]) => void} [props.onChange] - On change handler for the group.
 * @param {React.FocusEventHandler<HTMLInputElement>} [props.onBlur] - On blur handler for the group.
 * @see See [Chakra UI Checkbox](https://chakra-ui.com/docs/components/checkbox)
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
      label={label}
      labelProps={labelProps}
      labelPosition={labelPosition}
      errorMessageProps={errorMessageProps}
      {...formControlProps}
      isDisabled={isDisabled || formControlProps?.isDisabled}
    >
      <CheckboxGroupContextProvider
        value={{ field, meta, helpers, size, isDisabled, colorScheme, onChange, onBlur }}
      >
        {children}
      </CheckboxGroupContextProvider>
    </FormControlField>
  );
};

export default Object.assign(CheckboxGroupField, { Item: Checkbox });

