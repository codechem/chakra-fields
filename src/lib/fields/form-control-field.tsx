import React from 'react';
import { FieldMetaProps } from 'formik';
import { FormControl, FormControlProps, FormLabel, FormErrorMessage, FormErrorMessageProps } from '@chakra-ui/react';

import { FormFieldLabelProps } from '../types';
import { floatingLabelProps } from '../utils';

export type FormControlFieldProps = {
    meta: FieldMetaProps<any>;
    labelProps?: FormFieldLabelProps;
    errorMessageCss?: FormErrorMessageProps;
} & FormControlProps;

const FormControlField: React.FC<FormControlFieldProps> = ({
    meta,
    labelProps,
    errorMessageCss,
    children,
    ...formControlProps
}: FormControlFieldProps) => {
	let formLabel = null;
    if (labelProps?.label) {
        formLabel = (<FormLabel {...labelProps?.labelCss}>{labelProps.label}</FormLabel>);
        if (labelProps?.labelPosition === 'floating') {
            formLabel = (<FormLabel {...labelProps?.labelCss} {...floatingLabelProps}>{labelProps.label}</FormLabel>);
        }
    }
	return (
		<FormControl {...formControlProps} isInvalid={!!meta.error && meta.touched}>
			{labelProps?.labelPosition === 'before' && formLabel}
			{children}
			{(labelProps?.labelPosition === 'after' || labelProps?.labelPosition === 'floating') && formLabel}
			<FormErrorMessage {...errorMessageCss}>{meta.error}</FormErrorMessage>
		</FormControl>
	);
};

export default FormControlField;
