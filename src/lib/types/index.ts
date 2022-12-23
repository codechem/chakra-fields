import { FormLabelProps } from '@chakra-ui/react';

export type FieldProps = {
	name: string;
	label?: string;
	labelPosition?: 'before' | 'after' | 'floating';
};

export type ValidatedFieldProps<T = any> = {
	validate?: (value: T) => undefined | string | Promise<any>;
} & FieldProps;

export type CustomLabelProps = {
	labelCss?: FormLabelProps;
};
