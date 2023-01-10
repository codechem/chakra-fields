import { createContext, useContext } from "react";

import { FormikFieldContext } from "../types";

type Context = {
    size?: "sm" | "md" | "lg";
    isDisabled?: boolean;
    colorScheme?: (string & {}) | "blue" | "cyan" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "teal" | "yellow" | "whiteAlpha" | "blackAlpha" | "linkedin" | "facebook" | "messenger" | "whatsapp" | "twitter" | "telegram";
    onChange?: (values: (string | number)[]) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
} & FormikFieldContext<(string | number)[]>;

const CheckboxGroupContext = createContext<Context | null>(null);
export const CheckboxGroupContextProvider = CheckboxGroupContext.Provider;

export function useCheckboxGroupContext() {
    const context = useContext(CheckboxGroupContext);
    if (!context) {
        throw new Error("Must be used in scope of a CheckboxGroupContextProvider");
    }
    return context;
};
