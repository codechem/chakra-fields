# chakra-fields

Simple package that makes working with `Chakra UI` and `formik` together -- easier. This package uses
UI form components from `Chakra UI` and turns them into controlled components using `formik` state. The styling
of the components is **100% extensible**. The package does not add additional style on top of the `Chakra UI` styling.

## Key features
- Cleaner code
- 100% extensible styling
- Some caveats from using `Chakra UI` components and `formik` together are handled
- Possibility to add `formik` validation functions as props to the form components
- Reusability
- Floating label

## Motivation

The main motivation behind this package was to minimize the repetition that happens when working with forms with `Chakra UI` and the usage of `FormControl`. That, together with the repetition of `useField` when working with `formik` brought this project to life. Example:

Before `chakra-fields`:
```tsx
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    NumberInput,
    NumberInputField
} from '@chakra-ui/react';
import { useField } from 'formik';

const [field, meta, helpers] = useField<string>({
    name: 'age',
    validate: (value: string) => {
        return Number(value) < 18 ? 'Must be above 18' : undefined;
    }
});

<FormControl isRequired={true} isInvalid={!!meta.error && meta.touched}>
    <FormLabel display="inline" w="20%">Age: </FormLabel>
    <NumberInput
        {...field}
        w="80%"
        min={0}
        onChange={(valueAsString: string) => {
            helpers.setValue(valueAsString);
        }}
    >
        <NumberInputField/>
    </NumberInput>
    <FormErrorMessage>{meta.error}</FormErrorMessage>
</FormControl>
```
Looks a little bit too much doesn't it? Let's fix that:
```tsx
import { NumberInputField } from '@chakra-ui/react';
import { NumberField } from 'chakra-fields';

<NumberField
    name="age"
    w="80%"
    min={0}
    isRequired={true}
    label="Age: "
    labelProps={{ display: 'inline', w: '20%' }}
    validate={(value: string) => {
        return Number(value) < 18 ? 'Must be above 18' : undefined;
    }}
>
    <NumberInputField/>
</NumberField>
```

Much better! Everything in one place where it belongs. No more multiple lines of `useField` and renaming the `field`, `meta` and `helpers` variables. As you can see, even if the signatures of `onChange` between `formik` and `Chakra UI` don't match, as was the case for `NumberInput` where you have to manually set the value and you kinda loose the purpose of `formik`, with `chakra-fields` you don't have to worry about that because it's already handled. No more painful repetition of `FormControl`, `FormLabel`, `FormErrorMessage` and setting `isInvalid` flag with the same line of code to each input -- now that comes automatically with the `chakra-fields` components.

## Installing chakra-fields

```sh
$ npm i chakra-fields
```

## Available Components

The following components wrap the standard `Chakra UI` form inputs with the `FormControl` component, while handling state, validation and error messages with `formik`. First see [`FormControlField`](src/lib/fields/form-control-field.tsx).

- [`TextField`](src/lib/fields/text-field.tsx) -> wrapper around `Chakra UI`'s `Input` component. Used usually for `text`, `password`, `email`, `date`, `datetime-local` input types. The `formik` state holds a `string` value for this field. For styling you can set all style props that you would set on a `Input` component. See also [Chakra UI Input docs](https://chakra-ui.com/docs/components/input).
- [`TextareaField`](src/lib/fields/textarea-field.tsx) -> wrapper around `Chakra UI`'s `Textarea` component. The `formik` state holds a `string` value for this field. For styling you can set all style props that you would set on a `Textarea` component. See also [Chakra UI Textarea docs](https://chakra-ui.com/docs/components/textarea).
- [`NumberField`](src/lib/fields/number-field.tsx) ->  wrapper around `Chakra UI`'s `NumberInput` component. The `formik` state holds a `string` value for this field. For styling you can set all style props that you would set on a `NumberInput` component. See also [Chakra UI NumberInput docs](https://chakra-ui.com/docs/components/number-input).
- [`SelectField`](src/lib/fields/select-field.tsx) -> wrapper around `Chakra UI`'s `Select` component. The `formik` state holds a `string` value for this field. For styling you can set all style props that you would set on a `Select` component. See also [Chakra UI Select docs](https://chakra-ui.com/docs/components/select).
- [`CheckboxField`](src/lib/fields/checkbox-field.tsx) -> wrapper around `Chakra UI`'s `Checkbox` component. This component should be used as a single checkbox component. The `formik` state holds a `boolean` value for this field. For styling you can set all style props that you would set on a `Checkbox` component. See also [Chakra UI Checkbox docs](https://chakra-ui.com/docs/components/checkbox).
- [`RadioGroupField`](src/lib/fields/radio-group-field.tsx) -> wrapper around `Chakra UI`'s `RadioGroup` component. The group is composed of multiple radio buttons. Use `Radio` from `Chakra UI` or `RadioGroupField.Item` (alias to `Radio`) as components for the radio buttons. The `formik` state holds a `string` value for this field. For styling you can set all style props that you would set on a `RadioGroup` component. See also [Chakra UI RadioGroup docs](https://chakra-ui.com/docs/components/radio).
- [`InputGroupField`](src/lib/fields/input-group-field.tsx) -> wrapper around `Chakra UI`'s `InputGroup` component. The group is composed from one input element (`Input`/`NumberInput`) and one or multiple right/left addons/elements. See [Chakra UI docs](https://chakra-ui.com/docs/components/input#left-and-right-addons). The difference here is that instead of using the native `Chakra UI` input element as part of the group, the `InputGroupField.Input` or `InputGroupField.NumberInput` **must** be used instead. The `formik` state holds a `string` value for this field. For styling you can set all style props that you would set on a `InputGroup` component. See also [Chakra UI InputGroup docs](https://chakra-ui.com/docs/components/input).
- [`CheckboxGroupField`](src/lib/fields/checkbox-group-field.tsx) -> this is actually a new component and does not wrap any existing `Chakra UI` component, but it behaves similarly to the `CheckboxGroup` component. This group consists of multiple choice checkboxes and the component to be used for them **must** be `CheckboxGroupField.Item`. The `formik` state holds a `(string | number)[]` value for this field. For styling you can set all style props that you would set on a `CheckboxGroup` component. See also [Chakra UI CheckboxGroup docs](https://chakra-ui.com/docs/components/checkbox).

### Props

The following props can be used on **all components**:
- `name` - **required** prop and it should be unique in its enclosing `Formik Context`
- `isRequired`, `isReadOnly`, `isDisabled` - `FormControlOptions` that will be forwarded to the `FormControl`. If we set `isInvalid` it will have no effect because that prop is set automatically from the `formik` validation.
- `validate` - validation function that `formik` will use to validate the field
- `label` - contents of the `FormLabel` for the field
- `labelProps` - custom props for the `FormLabel` for fine grained styling
- `labelPosition` - where the label would be displayed: `before`, `after` or `floating`. By default is set to `before` and the label is displayed in the row before the input field/group. `floating` is not available for groups and `CheckboxField`.
- `errorMessageProps` - custom props for the `FormErrorMessage` for fine grained styling

**_NOTE_**: all style props that we set to the components will be forwarded to their respective `Chakra UI` component that it wraps. Example: the style props we set to `SelectField` will be forwarded to `Select` from `Chakra UI`, `TextField` to `Input`, `NumberField` to `NumberInput`, etc.

## Usage

First there is a need of a `Formik Context` that will wrap all of the `chakra-fields` components.

_NOTE_: Internally the components use `useField` that expects to be provided a `Formik Context` and would fail if not provided.

```ts
import { Form, Formik } from 'formik';

<Formik
    initialValues={{} as Values}
    onSubmit={(values: Values) => {}}
>
    <Form>{/* chakra-fields components go here */}</Form>
</Formik>
```

### TextField
```tsx
import { TextField } from 'chakra-fields';

<TextField name="username" label="Username" labelPosition="floating"/>
<TextField name="password" type="password" label="Password" labelPosition="after"/>
<TextField
    name="dob"
    type="date"
    label="Date Of Birth"
    min="1998-11-07" // style props are forwarded to the `Input` component
    w="80%" // style props are forwarded to the `Input` component
    variant="outline" // style props are forwarded to the `Input` component
/>
```

### TextareaField
```tsx
import { TextareaField } from 'chakra-fields';

<TextareaField
    name="comment"
    isRequired={true} // field is required (forwarded to `FormControl` as well)
    w="80%"
    validate={(value: string) => {
        return value.length < 30 ? 'Comment too short' : undefined;
    }}
    errorMessageProps={{ color: 'yellow' }} // forwarded to `FormErrorMessage`
/>
```

### NumberField
```tsx
import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputField,
    NumberInputStepper
} from '@chakra-ui/react';
import { NumberField } from 'chakra-fields';

<NumberField name="age" label="Age" isDisabled={true}>
    <NumberInputField/>
</NumberField>

<NumberField name="amount" label="Payment Amount" precision={2} min={0} step={100.50}>
    <NumberInputField/>
    <NumberInputStepper>
        <NumberIncrementStepper/>
        <NumberDecrementStepper/>
    </NumberInputStepper>
</NumberField>
```

### SelectField
```tsx
import { SelectField } from 'chakra-fields';

<SelectField name="year" placeholder="Select year of studies">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
</SelectField>
```

### CheckboxField
```tsx
import { CheckboxField } from 'chakra-fields';

<CheckboxField
    name="terms"
    isRequired={true}
    label="Terms and Conditions"
    labelProps={{ display: 'inline' }}
>
    I agree
</CheckboxField>
```

### RadioGroupField
```tsx
import { Radio, HStack } from '@chakra-ui/react';
import { RadioGroupField } from 'chakra-fields';

<RadioGroupField name="favoriteShow" label="Favorite Show?" colorScheme="green">
    <HStack>
        <RadioGroupField.Item value="1">The Office</RadioGroupField.Item>
        <RadioGroupField.Item value="2">Brooklyn 99</RadioGroupField.Item>
        <Radio value="3">Stranger Things</Radio> {/* Either `Radio` or `RadioGroupField.Item` can be used */}
    </HStack>
</RadioGroupField>
```

### InputGroupField
```tsx
import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputField,
    NumberInputStepper,
    InputLeftElement,
    InputLeftAddon
} from '@chakra-ui/react';
import { InputGroupField } from 'chakra-fields';

<InputGroupField name="salary" label="Salary Amount">
    <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children='$'/>
    <InputGroupField.NumberInput precision={2} step={100.50} min={0}> {/* `InputGroupField.NumberInput` must be used, not `NumberInput` from `Chakra UI` */}
        <NumberInputField pl={10}/>
        <NumberInputStepper>
            <NumberIncrementStepper/>
            <NumberDecrementStepper/>
        </NumberInputStepper>
    </InputGroupField.NumberInput>
</InputGroupField>

<InputGroupField name="telephone" label="Telephone number">
    <InputLeftAddon children='+234'/>
    <InputGroupField.Input type='tel'/> {/* `InputGroupField.Input` must be used, not `Input` from `Chakra UI` */}
</InputGroupField>
```

### CheckboxGroupField
```tsx
import { HStack } from '@chakra-ui/react';
import { CheckboxGroupField } from 'chakra-fields';

<CheckboxGroupField
    name="toppings"
    label="Chose one or more toppings"
    colorScheme="green"
    validate={(values: (string | number)[]) => {
        return values.length === 0 ? 'You must select at least one' : undefined;
    }}
>
    <HStack>
        {/* `CheckboxGroupField.Item` must be used, not `Checkbox` from `Chakra UI` */}
        <CheckboxGroupField.Item value={1}>Pepperoni</CheckboxGroupField.Item>
        <CheckboxGroupField.Item value={2}>Pineapple</CheckboxGroupField.Item>
        <CheckboxGroupField.Item value={3}>More cheese</CheckboxGroupField.Item>
    </HStack>
</CheckboxGroupField>
```

```tsx
// access a field value within a given formik context
const formikContext = useFormikContext<Values>();
const { value } = formikContext.values;
```
```tsx
// react on a change
const formikContext = useFormikContext<Values>();
const { value } = formikContext.values;

useEffect(() => {
    // do something on `value` change. Ex:
    formikContext.setFieldValue('otherField', value.toUpperCase());
}, [value]);
// or
<TextField name="value" onChange={(e) => {
    // do something on `value` change. Ex:
    formikContext.setFieldValue('otherField', e.target.value.toUpperCase());
}}/>
```
See also the `formik` docs for [`useFormikContext`](https://formik.org/docs/api/useFormikContext) and [`Formik`](https://formik.org/docs/api/formik) to see what are the capabilities and how you can use them here.

### `/examples`
- This folder contains two files that create the same form, but in two different ways: one with `chakra-fields`, one without it. See those files to see the difference and to see more examples.
- To see the examples, run `npm start`. This will start a React app that will be hosted on port `3000`.

## Contributors
- Dejan Slamkov, [LinkedIn](https://linkedin.com/in/dejan-slamkov)