import React from 'react';
import { useField } from 'formik';
import { FormControlOptions, InputGroup, InputGroupProps, NumberInputProps } from '@chakra-ui/react';

import Input from './../input/input';
import NumberInput from './../input/number-input';
import FormControlField from './form-control-field';
import { extractFormControlOptions } from '../utils';
import { FormFieldProps, ValidatedFieldProps } from '../types';
import { FormikFieldContextProvider } from '../context/formik-field-context';

export type InputGroupFieldProps = ValidatedFieldProps<string> & FormFieldProps & FormControlOptions & InputGroupProps;

/**
 * **Input Group** type input component that wraps `Input`/`NumberInput` components and other additional elements.
 * Usually this group wraps one `Input`/`NumberInput` and one or two of the following elements: `InputRight[Addon/Element]` or `InputLeft[Addon/Element]`.
 * The `Input Group` is wrapped with the `FormControlField` component that handles the displaying of error messages and labels.
 *
 * Use this component if you intend to have `InputRight[Addon/Element]` or `InputLeft[Addon/Element]`. Otherwise use `TextField` or `NumberField`.
 * 
 * NOTE: As an `Input` component use the `InputGroupField.Input` component, not the native `Input` from `Chakra UI`.
 * NOTE: As a `NumberInput` component use the `InputGroupField.NumberInput` component, not the native `NumberInput` from `Chakra UI`.
 * 
 * @param {InputGroupFieldProps} props - props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {FormikValidator<string>} [props.validate] - `Formik` validation function for this field. See [Formik docs](https://formik.org/docs/api/field#validate)
 * @param {React.ReactNode} [props.label] - The label of the field. It is wrapped into the `FormLabel` from `Chakra UI`.
 * @param {string} [props.labelPosition="before"] - The position of the label: "before" (default), "after" or "floating" (not available for this field).
 * @param {FormLabelProps} [props.labelProps] - Custom props for the label component (`FormLabel`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {FormControlProps} [props.formControlProps] - Custom props for the form control component (`FormControl`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @param {FormErrorMessageProps} [props.errorMessageProps] - Custom props for the error message component (`FormErrorMessage`). See [Chakra UI docs](https://chakra-ui.com/docs/components/form-control).
 * @see See [Chakra UI Input Group](https://chakra-ui.com/docs/components/input#left-and-right-addons)
 */
const InputGroupField: React.FC<InputGroupFieldProps> = ({
  name,
    validate,
    children,
  label,
  labelPosition = 'before',
  labelProps,
  formControlProps,
  errorMessageProps,
    ...inputGroupProps
}: InputGroupFieldProps) => {
  const [field, meta, helpers] = useField<string>({ name, validate, type: 'text' });
  return (
    <FormControlField
      name={field.name}
      label={label}
      labelProps={labelProps}
      labelPosition={labelPosition}
      errorMessageProps={errorMessageProps}
      {...{ ...extractFormControlOptions(inputGroupProps), ...formControlProps }}
    >
      <FormikFieldContextProvider value={{ field, meta, helpers }}>
        <InputGroup {...inputGroupProps}>
          {children}
        </InputGroup>
      </FormikFieldContextProvider>
    </FormControlField>
  );
};

const FullWidthNumberInput = (props: NumberInputProps) => {
    return <NumberInput w="100%" {...props}/>;
};

export default Object.assign(InputGroupField, { Input, NumberInput: FullWidthNumberInput });
