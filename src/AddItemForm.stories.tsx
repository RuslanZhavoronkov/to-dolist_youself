import { AddItemForm } from "./AddItemForm";
import {action} from '@storybook/addon-actions'
import { Meta, StoryObj } from "@storybook/react";
import React from "react";







//first step - create default object
export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}

//second step - create function action

const callback = action("Button 'add' was pressed inside the form")


//third step - create testing component for storybook
export const AddItemFormBaseExample = (props: any) => {
   const addItemHandler = (title: string) => alert(title)
    return <AddItemForm addItem={callback}/>
}




// const meta: Meta<typeof AddItemForm> = {
//     title: 'Todolist/AddItemForm',
//     component: AddItemForm,
//     parameters: {
//       // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
//       layout: 'centered',
//     },
//     // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
//     tags: ['autodocs'],
//     // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//     argTypes: {
//       backgroundColor: { control: 'color' },
//     },
//   };
  
//   export default meta;
//   type Story = StoryObj<typeof AddItemForm>;
  
//   // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
//   export const Primary: Story = {
//     args: {
//       primary: true,
//       label: 'Button',
//     },
//   };
  
  
// export default meta












//______________________________________________________________________________________________________________________

