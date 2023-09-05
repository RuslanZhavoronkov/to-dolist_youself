import Checkbox from "@mui/material/Checkbox"
import { ChangeEvent, useCallback } from "react"
import { EditableSpan } from "./EditableSpan"
import IconButton from "@mui/material/IconButton"
import { Delete } from "@mui/icons-material"
import React from "react"

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    todoListID: string
    taskID: string
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    title: string
    isDone: boolean
}



export const Task : React.FC <TaskPropsType> = React.memo ((props)=> {

    const onClickHandler = () => props.removeTask(props.taskID, props.todoListID)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.taskID, newIsDoneValue, props.todoListID);
    }
    const onTitleChangeHandler = useCallback ((newValue: string) => {
        props.changeTaskTitle(props.taskID, newValue, props.todoListID);
    },[ props.changeTaskTitle,props.taskID, props.todoListID])
    
    
    return <div key={props.taskID} className={props.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.isDone}
            color="primary"
            onChange={onChangeHandler}
        />
    
        <EditableSpan value={props.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
}) 

