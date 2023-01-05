import { createContext, useContext } from "react";
import { FieldHelperProps, FieldInputProps, FieldMetaProps } from "formik";

type Context = {
    field: FieldInputProps<(string | number)[]>;
    meta: FieldMetaProps<(string | number)[]>;
    helpers: FieldHelperProps<(string | number)[]>;
    size?: "sm" | "md" | "lg";
    isDisabled?: boolean;
    colorScheme?: (string & {}) | "blue" | "cyan" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "teal" | "yellow" | "whiteAlpha" | "blackAlpha" | "linkedin" | "facebook" | "messenger" | "whatsapp" | "twitter" | "telegram";
    onChange?: (values: (string | number)[]) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const CheckboxGroupContext = createContext<Context | null>(null);
export const CheckboxGroupProvider = CheckboxGroupContext.Provider;

export function useCheckboxGroupContext() {
    const context = useContext(CheckboxGroupContext);
    if (!context) {
        throw new Error("Must be used in scope of a CheckboxGroupProvider");
    }
    return context;
};
