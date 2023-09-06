import { action } from '@storybook/addon-actions'
import React from "react";
import { EditableSpan } from './EditableSpan';


//first step - create default object
export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

//second step - create function action

const changeCallback = action("Value changed")



//third step - create testing component for storybook
export const EditableSpanBaseExample = () => {


    return (
        <>
            <EditableSpan
            value={'Start value'}
            onChange={changeCallback}/>
        
        </>
    )


}
//______________________________________________________________________________________________________________________________



// const meta: Meta<typeof EditableSpan> = {
//     title: 'EditableSpan/Task',
//     component: EditableSpan,
//     parameters: {
//       // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
//       layout: 'centered',
//     },
//     // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
//     tags: ['autodocs'],
//     // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//     argsTypes: {
//         onChange: {
//             action:'clicked'
//             description: 'Value Editable onChange'
//         },
//         value: {
//             description:''
//             defultValue: 'HTML'
//         }
//     }
//     args: {
//         value={'Start value'}
//         onChange={ action("Value changed")}
//     },
//   };
  
//   export default meta;
//   type Story = StoryObj<typeof EditableSpan>;
  
  
  
// const  EditableSpanStory() => {
//    render: () => <EditableSpan/>
// }

