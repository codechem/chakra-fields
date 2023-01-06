import { FormControlProps, FormErrorMessageProps, FormLabelProps } from '@chakra-ui/react';

export type FieldProps = {
	name: string;
};

export type ValidatedFieldProps<T = any> = {
	validate?: (value: T) => undefined | string | Promise<any>;
} & FieldProps;

export type FormFieldLabelProps = {
	label?: React.ReactNode;
	labelPosition?: 'before' | 'after' | 'floating';
	labelProps?: FormLabelProps;
};

export type FormFieldProps = {
	formControlProps?: FormControlProps;
	errorMessageProps?: FormErrorMessageProps;
} & FormFieldLabelProps;
