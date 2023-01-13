import React from 'react';
import { useFormikContext } from 'formik';
import { Button,
    GridItem,
    HStack,
    Heading,
    InputLeftElement,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputField,
    NumberInputStepper,
    Radio,
    SimpleGrid,
    VStack
} from '@chakra-ui/react';
import {
    CheckboxField,
    CheckboxGroupField,
    InputGroupField,
    NumberField,
    RadioGroupField,
    TextField,
    TextareaField,
    SelectField
} from 'chakra-fields';

import { calculateAge } from './utils';
import { FormKey, Values } from './types';

const ChakraFieldsExample = () => {
    const formikContext = useFormikContext<Values>();
    return (
        <GridItem as={VStack}>
            <Heading>Chakra Fields</Heading>
            <TextField name={FormKey.FULL_NAME} label="Full Name" isDisabled={formikContext.values.disableField === FormKey.FULL_NAME}/>
            <TextField name={FormKey.USERNAME} label="Username" isDisabled={formikContext.values.disableField === FormKey.USERNAME}/>
            <SimpleGrid columns={2} w="full" spacing={2}>
                <NumberField name={FormKey.AGE} label="Age" isDisabled={true}>
                    <NumberInputField/>
                </NumberField>
                <TextField
                    type="date"
                    name={FormKey.DOB}
                    label="Date Of Birth"
                    max={new Date().toISOString().split('T')[0]}
                    isDisabled={formikContext.values.disableField === FormKey.DOB}
                    onChange={(e) => formikContext.setFieldValue(FormKey.AGE, calculateAge(e.target.value))} // this can also be achieved with `useEffect(..., [formikContext.values.dob])`
                />
            </SimpleGrid>
            <SimpleGrid columns={2} w="full" spacing={2}>
                <TextField type="password" name={FormKey.PASSWORD} label="Password"/>
                <TextField
                    type="password"
                    name={FormKey.CONFIRM_PASSWORD}
                    label="Confirm Password"
                    validate={(value) => {
                        if (value !== formikContext.values.password) {
                            return "Password must match confirm password";
                        }
                        return undefined;
                    }}
                />
            </SimpleGrid>
            <RadioGroupField name={FormKey.DISABLE_FIELD} label="Disable Field?" colorScheme="green">
                <HStack>
                    <RadioGroupField.Item value={FormKey.FULL_NAME}>Full Name</RadioGroupField.Item>
                    <Radio value={FormKey.USERNAME}>Username</Radio> {/* Either `Radio` or `RadioGroupField.Item` */}
                    <RadioGroupField.Item value={FormKey.DOB}>Date of birth</RadioGroupField.Item>
                </HStack>
                {formikContext.values.disableField && (
                    <Button variant="link" onClick={() => formikContext.setFieldValue(FormKey.DISABLE_FIELD, '')}>Clear Selection</Button>
                )}
            </RadioGroupField>
            <SelectField name={FormKey.YEAR_STUDIES} placeholder="Select year of studies">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </SelectField>
            <InputGroupField name={FormKey.TUITION_AMOUNT} label="Tuition Amount">
                <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children='$'/>
                <InputGroupField.NumberInput precision={2} step={100.50} min={0}>
                    <NumberInputField pl={10}/>
                    <NumberInputStepper>
                        <NumberIncrementStepper/>
                        <NumberDecrementStepper/>
                    </NumberInputStepper>
                </InputGroupField.NumberInput>
            </InputGroupField>
            <CheckboxGroupField name={FormKey.LANGUAGES} label="Languages">
                <HStack>
                    <CheckboxGroupField.Item value={1}>English</CheckboxGroupField.Item>
                    <CheckboxGroupField.Item value={2} colorScheme="yellow">Macedonian</CheckboxGroupField.Item>
                    <CheckboxGroupField.Item value={3} colorScheme="red">Albanian</CheckboxGroupField.Item>
                </HStack>
            </CheckboxGroupField>
            <TextareaField name={FormKey.COMMENTS} placeholder="Type comment here..."/>
            <CheckboxField name={FormKey.TERMS} label="Term and conditions" labelProps={{ display: 'inline' }} isRequired={true}>I agree</CheckboxField>
            <Button type='submit' w="full">Submit</Button>
        </GridItem>
    );
};

export default ChakraFieldsExample;