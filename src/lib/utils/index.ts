import { FormControlOptions } from "@chakra-ui/react";

export const floatingLabelProps: Record<string, any> = {
    top: 0,
    left: 0,
    zIndex: 2,
    position: 'absolute',
    pointerEvents: 'none',
    mx: 3,
    px: 1,
    my: 3,
    transformOrigin: 'left top',
    transform: 'scale(0.85) translateY(-25px)'
};

export const extractFormControlOptions = (props: any): FormControlOptions => {
    return {
        isDisabled: props.isDisabled,
        isInvalid: props.isInvalid,
        isReadOnly: props.isReadOnly,
        isRequired: props.isRequired
    };
};

export const isValidNumber = (value: any) => {
    return value !== null && value !== undefined && !isNaN(value) && value !== '';
}