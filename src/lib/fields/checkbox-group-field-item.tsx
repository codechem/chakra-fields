import React from 'react';
import { Checkbox, CheckboxProps} from '@chakra-ui/react';

import { useCheckboxGroupContext } from '../context/checkbox-group-context';

export type CheckboxGroupFieldItemProps = {
	value: number | string;
} & CheckboxProps;

/**
 * A **checkbox** type component that uses `Checkbox` from `Chakra UI` and handles state with `formik`.
 * This component can be used a single checkbox without value, i.e. true/false and can also be a part of a `CheckboxGroupField` which would allow multiple values to be checked as part of the group, hence a `value` would be needed.
 * @param {CheckboxGroupFieldItemProps} props props of the component.
 * @param {string} props.name Required parameter. Needed for the `formik` state. Must be unique inside of its enclosing `formik` context.
 * @param {string} props.value Optional parameter. Must be provided if the checkbox is part of a `CheckboxGroupField`.
 */
const CheckboxGroupFieldItem: React.FC<CheckboxGroupFieldItemProps> = ({
    value,
    children,
	...checkboxProps
}: CheckboxGroupFieldItemProps) => {
	const { field, meta, helpers, size, isDisabled, colorScheme, onChange, onBlur } = useCheckboxGroupContext();
	return (
        <Checkbox
			size={size}
			isDisabled={isDisabled}
			colorScheme={colorScheme}
			{...checkboxProps}
			value={value}
            name={field.name}
            isChecked={field.checked}
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
        </Checkbox>
	);
};

export default CheckboxGroupFieldItem;
