import { AddItemForm } from "./AddItemForm";
import {action} from '@storybook/addon-actions'
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
   // const addItemHandler = (title: string) => alert(title)
    return <AddItemForm addItem={callback}/>
}