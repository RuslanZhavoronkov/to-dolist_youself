import React, {ChangeEvent, RefObject, useState} from 'react';

type PropsType={
    newTitle:RefObject<HTMLInputElement>
    //setNewTitle:(newTitle:string)=>void
}

export const Input = (props:PropsType) => {
    //const[newTitle,setNewTitle]=useState('')

    // const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
    //     props.setNewTitle(e.currentTarget.value)
    // }
    return (
        // <input value={props.newTitle} onChange={onChangeHandler} />
        <input ref={props.newTitle}  />
    );
};

//--------------------------------------------------
// import React, {ChangeEvent, useState} from 'react';
//
// type PropsType={
//     newTitle:string
//     setNewTitle:(newTitle:string)=>void
// }
//
// export const Input = (props:PropsType) => {
//     //const[newTitle,setNewTitle]=useState('')
//
//     const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
//         props.setNewTitle(e.currentTarget.value)
//     }
//     return (
//         <input value={props.newTitle} onChange={onChangeHandler} />
//     );
// };