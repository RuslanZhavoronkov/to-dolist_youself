import React, {useEffect, useState} from 'react';

export const Input = () => {
    const[newTitle, setNewTitle]=usestate()
const onChangeHandler =() =>{
    setNewTitle(e.currentTarget.value)
}

    return(
        <input value={newTitle} onChange={onChangeHandler}
    )
}



