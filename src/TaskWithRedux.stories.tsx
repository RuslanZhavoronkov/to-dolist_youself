
import { action } from '@storybook/addon-actions'
import React, { useState } from "react";
import { Task } from './Task';
import { ReduxStoreProviderDecorator, initialGlobalState } from './stories/ReduxStoreProviderDecorator';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TaskType } from './Todolist';


//first step - create default object
export default {
    title: 'Task Component',
    component: Task
}

//second step - create function action

const changeTaskStatusCallback = action("Change Task Status")
const changeTaskTitleCallback = action("Change Task Title")
const removeTaskCallback = action("Remove Task")


//third step - create testing component for storybook
export const TaskBaseExample = () => {
const task1 = { id : '1', title: 'JS', isDone: true}
const task2 = { id : '2', title: 'CSS', isDone: false}

    return (
        <>
            <Task
                task = {task1}
                changeTaskStatus = { changeTaskStatusCallback }
                changeTaskTitle = { changeTaskTitleCallback }
                removeTask = { removeTaskCallback }
                todolistId = { 'todoListId1'}   
            />
             <Task
                task = {task2}
                changeTaskStatus = { changeTaskStatusCallback }
                changeTaskTitle = { changeTaskTitleCallback }
                removeTask = { removeTaskCallback }
                todolistId = { 'todoListId1'}   
            />
        </>
    )


}
//______________________________________________________________________________________________________________
//_____________________________________________________________________________________________________

// const meta: Meta<typeof TaskWithRedux> = {
//     title: 'Todolist/TaskWithRedux',
//     component: TaskWithRedux,
//     parameters: {
//       Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
//       layout: 'centered',
//     },
//     This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
//     tags: ['autodocs'],
//     More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//     args: {
//         task: initialGlobalState.tasks['todolistId1'][0]
//         todoList:'todolistId1'
//     },
//     decorators:[ReduxStoreProviderDecorator]
//   };
  
//   export default meta;
//   type Story = StoryObj<typeof TaskWithRedux>;
  
 
// const TaskWithReduxPresent = () => {
//     const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todoListId1'][0])
//     if(!task) task = {id:'aadsad', title: 'Default', isDone:false}
//     return <TaskWithRedux task={task} todolistId = {'todoListId1'}/>
// }


//  export const TaskPresentationStory:Story =  {
//      render: ()=>  <TaskWithReduxPresent/>
//  }
