import React from 'react';
import { Checkbox as ChakraCheckbox, CheckboxProps as ChakraCheckboxProps } from '@chakra-ui/react';

import { useCheckboxGroupContext } from '../context/checkbox-group-context';

export type CheckboxProps = {
	value: number | string;
} & ChakraCheckboxProps;

const Checkbox: React.FC<CheckboxProps> = ({
    value,
    children,
	...checkboxProps
}: CheckboxProps) => {
	const {
		field,
		meta,
		helpers,
		size,
		isDisabled,
		colorScheme,
		onChange,
		onBlur
	} = useCheckboxGroupContext();
	return (
        <ChakraCheckbox
			size={size}
			isDisabled={isDisabled}
			colorScheme={colorScheme}
			{...checkboxProps}
			value={value}
            name={field.name}
            isChecked={!!meta.value?.includes(value)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
				let newValues = meta.value ?? [];
				if (e.target.checked) {
					// add value
					newValues = [...newValues, value];
				} else {
					// remove value
					newValues = newValues.filter((val: string | number) => val !== value);
				}
				helpers.setValue(newValues);
				onChange?.(newValues);
				checkboxProps.onChange?.(e);
			}}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                field.onBlur(e);
                onBlur?.(e);
				checkboxProps.onBlur?.(e);
            }}
        >
            {children}
        </ChakraCheckbox>
	);
};

export default Checkbox;
