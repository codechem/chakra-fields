import { FormControlProps, FormErrorMessageProps, FormLabelProps } from '@chakra-ui/react';

export type FieldLabelProps = {
	label?: React.ReactNode;
	labelPosition?: 'before' | 'after' | 'floating';
	labelCss?: FormLabelProps;
};

export type FieldProps = {
	name: string;
	formControlCss?: FormControlProps;
	errorMessageCss?: FormErrorMessageProps;
} & FieldLabelProps;

export type ValidatedFieldProps<T = any> = {
	validate?: (value: T) => undefined | string | Promise<any>;
} & FieldProps;
