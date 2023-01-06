import React from 'react';
import { useFormikContext } from 'formik';
import { FormControl, FormControlProps, FormLabel, FormErrorMessage, FormErrorMessageProps } from '@chakra-ui/react';

import { FieldProps, FormFieldLabelProps } from '../types';
import { floatingLabelProps } from '../utils';

export type FormControlFieldProps = {
    errorMessageProps?: FormErrorMessageProps;
} & FormFieldLabelProps & FieldProps & FormControlProps;

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
