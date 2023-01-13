import React from 'react';
import { Box, Button,
    Checkbox,
    CheckboxGroup,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    HStack,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Radio,
    RadioGroup,
    Select,
    SimpleGrid,
    Textarea,
    VStack
} from '@chakra-ui/react';
import { useField } from 'formik';

import { calculateAge } from './utils';
import { FormKey } from './types';

const NativeChakraExample = () => {
    // DRAWBACK: manually declaring fields --- separate variable names
    const [fullNameField, fullNameMeta] = useField<string>(FormKey.FULL_NAME);
    const [usernameField, usernameMeta] = useField<string>(FormKey.USERNAME);
    const [ageField, ageMeta, ageHelpers] = useField<string>(FormKey.AGE);
    const [dobField, dobMeta] = useField<string>(FormKey.DOB);
    const [passwordField, passwordMeta] = useField<string>(FormKey.PASSWORD);
    const [confirmPasswordField, confirmPasswordMeta] = useField<string>(FormKey.CONFIRM_PASSWORD);
    const [disableFieldField, disableFieldMeta, disableFieldHelpers] = useField<string>(FormKey.DISABLE_FIELD);
    const [yearStudiesField, yearStudiesMeta] = useField<string>(FormKey.YEAR_STUDIES);
    const [tuitionAmountField, tuitionAmountMeta, tuitionAmountHelpers] = useField<string>(FormKey.TUITION_AMOUNT);
    const [languagesField, languagesMeta, languagesHelpers] = useField<number[]>(FormKey.LANGUAGES);
    const [commentsField, commentsMeta] = useField<string>(FormKey.COMMENTS);
    const [termsField, termsMeta] = useField<boolean>(FormKey.TERMS);

    const isLanguagesInvalid = !!languagesMeta.error && languagesMeta.touched; // DRAWBACK: `touched` is not set for some reason
    return (
        <GridItem as={VStack}>
            <Heading>Native Chakra UI</Heading>
            <FormControl isInvalid={!!fullNameMeta.error && fullNameMeta.touched}>
                <FormLabel>Full Name</FormLabel>
                <Input {...fullNameField} isDisabled={disableFieldMeta.value === FormKey.FULL_NAME}/>
                <FormErrorMessage>{fullNameMeta.error}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!usernameMeta.error && usernameMeta.touched}>
                <FormLabel>Username</FormLabel>
                <Input {...usernameField} isDisabled={disableFieldMeta.value === FormKey.USERNAME}/>
                <FormErrorMessage>{usernameMeta.error}</FormErrorMessage>
            </FormControl>
            <SimpleGrid columns={2} w="full" spacing={2}>
                <FormControl isInvalid={!!ageMeta.error && ageMeta.touched}>
                    <FormLabel>Age</FormLabel>
                    <NumberInput isDisabled={true} {...ageField}>
                        <NumberInputField/>
                    </NumberInput>
                    <FormErrorMessage>{ageMeta.error}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!dobMeta.error && dobMeta.touched}>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input
                        type="date"
                        {...dobField}
                        max={new Date().toISOString().split('T')[0]}
                        isDisabled={disableFieldMeta.value === FormKey.DOB}
                        onChange={(e) => {
                            dobField.onChange(e); // DRAWBACK: must call onChange again or otherwise it will not work as expected
                            ageHelpers.setValue(calculateAge(e.target.value));
                        }}
                    /> 
                    <FormErrorMessage>{dobMeta.error}</FormErrorMessage>
                </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={2} w="full" spacing={2}>
                <FormControl isInvalid={!!passwordMeta.error && passwordMeta.touched}>
                    <FormLabel>Password</FormLabel>
                    <Input {...passwordField} type="password"/>
                    <FormErrorMessage>{passwordMeta.error}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!confirmPasswordMeta.error && confirmPasswordMeta.touched}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input {...confirmPasswordField} type="password"/>
                    <FormErrorMessage>{confirmPasswordMeta.error}</FormErrorMessage>
                </FormControl>
            </SimpleGrid>
            <FormControl isInvalid={!!disableFieldMeta.error && disableFieldMeta.touched}>
                <FormLabel>Disable field?</FormLabel>
                <RadioGroup {...disableFieldField} colorScheme="green" onChange={(nextValue) => disableFieldHelpers.setValue(nextValue)}> {/* DRAWBACK: must call setValue of meta because onChange signature is different  */}
                    <HStack>
                        <Radio value={FormKey.FULL_NAME}>Full Name</Radio>
                        <Radio value={FormKey.USERNAME}>Username</Radio>
                        <Radio value={FormKey.DOB}>Date of birth</Radio>
                    </HStack>
                    {disableFieldMeta.value && (
                        <Button variant="link" onClick={() => disableFieldHelpers.setValue('')}>Clear Selection</Button>
                    )}
                </RadioGroup>
                <FormErrorMessage>{disableFieldMeta.error}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!yearStudiesMeta.error && yearStudiesMeta.touched}>
                <Select {...yearStudiesField} placeholder="Select year of studies">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </Select>
                <FormErrorMessage>{yearStudiesMeta.error}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!tuitionAmountMeta.error && tuitionAmountMeta.touched}>
                <FormLabel>Tuition Amount</FormLabel>
                <InputGroup>
                    <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children='$'/>
                    <NumberInput {...tuitionAmountField} precision={2} step={100.50} min={0} w="full" onChange={(valueAsString) => tuitionAmountHelpers.setValue(valueAsString)}> {/* DRAWBACK: must call setValue of meta because onChange signature is different  */}
                        <NumberInputField pl={10}/>
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                </InputGroup>
                <FormErrorMessage>{tuitionAmountMeta.error}</FormErrorMessage>
            </FormControl>
            {/* 
                DRAWBACK: CheckboxGroup is not recommended to be used together (and does not work) with FormControl.
                SEE: https://github.com/chakra-ui/chakra-ui/issues/5799
                We lose the benefits that come from using FormControl: label, error message, disabled, ...
                `chakra-fields` has a workaround ;) See `CheckboxGroupField`.
            */}
            <SimpleGrid w="full" spacing={2}>
                <label>Languages</label> {/* DRAWBACK: We loose everything that comes with FormLabel */}
                <CheckboxGroup // DRAWBACK: no onBlur callback
                    defaultValue={languagesMeta.value?.map(String)}
                    onChange={(values) => languagesHelpers.setValue(values?.map(Number))} // DRAWBACK: map values to `number`/`string`
                > {/*  */}
                    <HStack>
                        <Checkbox onBlur={languagesField.onBlur} isInvalid={isLanguagesInvalid} value="1">English</Checkbox> {/* DRAWBACK: Does not work with number values (even tho the type of `value` is `number | string`) */}
                        <Checkbox onBlur={languagesField.onBlur} isInvalid={isLanguagesInvalid} value="2" colorScheme="yellow">Macedonian</Checkbox>
                        <Checkbox onBlur={languagesField.onBlur} isInvalid={isLanguagesInvalid} value="3" colorScheme="red">Albanian</Checkbox>
                    </HStack>
                </CheckboxGroup>
                {isLanguagesInvalid && <Box color="#FC8181">{languagesMeta.error}</Box>} {/* DRAWBACK: We loose everything that comes with FormErrorMessage */}
            </SimpleGrid>
            <FormControl isInvalid={!!commentsMeta.error && commentsMeta.touched}>
                <Textarea {...commentsField} placeholder="Type comment here..."/>
                <FormErrorMessage>{commentsMeta.error}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!termsMeta.error && termsMeta.touched} isRequired={true}>
                <FormLabel display="inline">Terms and conditions</FormLabel>
                <Checkbox
                    name={termsField.name}
                    onChange={termsField.onChange}
                    onBlur={termsField.onBlur}
                    isChecked={termsField.checked}
                >
                    I agree
                </Checkbox>
                <FormErrorMessage>{termsMeta.error}</FormErrorMessage>
            </FormControl>
            <Button type='submit' w="full">Submit</Button>
        </GridItem>
    );
};

export default NativeChakraExample;