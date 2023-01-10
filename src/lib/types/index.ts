import React from 'react';
import { FieldHelperProps, FieldInputProps, FieldMetaProps } from 'formik';
import { FormControlProps, FormErrorMessageProps, FormLabelProps } from '@chakra-ui/react';

export type FieldProps = {
	name: string;
};

export type FormikValidator<T> = (value: T) => undefined | string | Promise<any>;

export type ValidatedFieldProps<T> = {
	validate?: FormikValidator<T>;
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

export type IdReactFC<T> = {
    id: string;
} & React.FC<T>;

export type FormikFieldContext<T> = {
    field: FieldInputProps<T>;
    meta: FieldMetaProps<T>;
    helpers: FieldHelperProps<T>;
};
