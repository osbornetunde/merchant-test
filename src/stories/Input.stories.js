// Input.stories.js

import React from 'react';
import { useForm } from 'react-hook-form';

import { Input } from './Input';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Input',
    component: Input,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    console.log("===>args", args);
    const { control, errors }= useForm({
        mode:"onChange"
    });
    return <Input {...args} control={control} errors={errors}/>;
}

export const DefaultInput = Template.bind({});

DefaultInput.args = {
    /*👇 The args you need here will depend on your component */
    name: 'name',
    type: 'text',
    placeholder: 'Enter your name',
    defaultValue: '',
    rules: undefined,
    maxLength: null
};
