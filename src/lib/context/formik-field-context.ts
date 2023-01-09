import { createContext, useContext } from "react";

import { FormikFieldContext as ContextType } from "../types";

const FormikFieldContext = createContext<ContextType<string> | null>(null);
export const FormikFieldContextProvider = FormikFieldContext.Provider;

export function useFormikFieldContext() {
    const context = useContext(FormikFieldContext);
    if (!context) {
        throw new Error("Must be used in scope of a InputGroupProvider");
    }
    return context;
};
