import React from 'react';
import { useFormikContext } from 'formik';
import { FormControl, FormControlProps, FormLabel, FormErrorMessage, FormErrorMessageProps } from '@chakra-ui/react';

import { FieldProps, FormFieldLabelProps } from '../types';
import { floatingLabelProps } from '../utils';

export type FormControlFieldProps = {
  errorMessageProps?: FormErrorMessageProps;
} & FormFieldLabelProps & FieldProps & Omit<FormControlProps, 'label'>


/**
 * **Form Control** component that wraps the other `[*]Field` components. It handles the displaying of error messages from `formik` and input label.
 * This component relies on the fact that there is a field with name: `props.name` that already exists in the `formik` state.
 * 
 * @param {FormControlFieldProps} props - props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {React.ReactNode} [props.label] - The label of the field. It is wrapped into the `FormLabel` from `Chakra UI`.
 * @param {string} [props.labelPosition="before"] - The position of the label: "before" (default), "after" or "floating" (not available for this field).
 * @param {FormLabelProps} [props.labelProps] - Custom props for the label component (`FormLabel`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {FormControlProps} [props.formControlProps] - Custom props for the form control component (`FormControl`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {FormErrorMessageProps} [props.errorMessageProps] - Custom props for the error message component (`FormErrorMessage`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @see See [Chakra UI FormControl](https://chakra-ui.com/docs/components/form-control).
 */
const FormControlField: React.FC<FormControlFieldProps> = ({
  name,
  children,
  label,
  labelProps,
  labelPosition = 'before',
  errorMessageProps,
  ...formControlProps
}: FormControlFieldProps) => {
  const formikContext = useFormikContext();
  const meta = formikContext.getFieldMeta(name);

  let formLabel = null;
  if (label) {
    formLabel = (<FormLabel {...labelProps}>{label}</FormLabel>);
    if (labelPosition === 'floating') {
      formLabel = (<FormLabel {...labelProps} {...floatingLabelProps}>{label}</FormLabel>);
    }
  }

  return (
    <FormControl {...formControlProps} name={name} isInvalid={!!meta.error && meta.touched}>
      {labelPosition === 'before' && formLabel}
      {children}
      {(labelPosition === 'after' || labelPosition === 'floating') && formLabel}
      <FormErrorMessage {...errorMessageProps}>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormControlField;
