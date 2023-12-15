import { Delete } from "@mui/icons-material"
import IconButton from "@mui/material/IconButton/IconButton"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { useActions } from "common/hooks"
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists/todolists.reducer"
import React from "react"

type Props = {
    todolist: TodolistDomainType; 
}


export const TodolistTitle = ({todolist}:Props) => {

    const{removeTodolist,changeTodolistTitle} = useActions(todolistsThunks)

    const removeTodolistHandler = () => {
        //props.removeTodolist(props.todolist.id);
        removeTodolist(todolist.id);
        
      };
    
      const changeTodolistTitleHandler = 
        (title: string) => {
          //props.changeTodolistTitle(props.todolist.id, title);
         // changeTodolistTitle(todolist.id, title);
          changeTodolistTitle({id:todolist.id, title})
        }
        
      
return (
    <>
    <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
    </>
)
}

