import { action } from '@storybook/addon-actions'
import React from "react";
import AppWithRedux from './AppWithRedux';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { ReduxStoreProviderDecorator } from './stories/ReduxStoreProviderDecorator';



//first step - create default object
export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
}

//second step - create function action




//third step - create testing component for storybook
export const AppWithReduxBaseExample = () => {


    return (
        <>           
            <AppWithRedux />
         
        </>
    )


}


//__________________________________________________________________________________________________________________

// const meta: Meta<typeof AppWithRedux> = {
//     title: 'AppWithRedux/Task',
//     component: EditableSpan,
//     parameters: {
//       // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
//       layout: 'centered',
//     },
//     // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
//     tags: ['autodocs'],
//     // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//     decorators:[ReduxStoreProviderDecorator]
// }
  
//   export default meta;
//   type Story = StoryObj<typeof AppWithRedux>;
  
  
  
// export const  AppWithReduxStory:Story = () => {


//    render: () =>  <AppWithRedux />
// }

