

import React, { ChangeEvent, useEffect, useState } from 'react'
import { todolistsAPI } from '../api/todolists-api'

export default {
    title: 'API'
}


//Todolists

//get request
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    const getTodolists = () => {
        todolistsAPI.getTodolists()
            .then((response) => {

                setState(response.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <button onClick={getTodolists}>get todolists</button>
    </div>
}


//post request
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolist = () => {
        // const title = 'EEEE AAAAA KAMASUTRA'
        todolistsAPI.createTodolist(title)
            .then((response) => {
                setState(response.data)
            })
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={'title'} value={title} onChange={changeTitle} />
            <button onClick={createTodolist} >create todolist</button>
        </div>
    )
}



//delete request
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const deleteTodolist = () => {
        // const todolistId = "df0d095e-aff4-4452-b652-75c4ae0c3728"
        todolistsAPI.deleteTodolist(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }


    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={'todolistId'} value={todolistId} onChange={onChangeTodolistId} />
            <button onClick={deleteTodolist}> delete todolist </button>
        </div>
    )
}



//update request
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')


    const updateTodolistTitle = () => {
        // const todolistId = "2f0d7acb-a3f3-43f9-bf65-be1294c4069f"
        // const title = 'BIBI BAYBA'
        todolistsAPI.updateTodolistTitle(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
    }


    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={'todolistId'} value={todolistId} onChange={onChangeTodolistId} />
            <input placeholder={'title'} value={title} onChange={onChangeTitle} />
            <button onClick={updateTodolistTitle}>update todolist title</button>
        </div>
    )
}










//Tasks

//get request
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')


    const getTasks = () => {
        // const todolistId = "2f0d7acb-a3f3-43f9-bf65-be1294c4069f"
        todolistsAPI.getTask(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }

    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={'todolistId'} value={todolistId} onChange={onChangeTodolistId} />
            <button onClick={getTasks}>get tasks</button>
        </div>
    )
}

//post request
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')



    const createTask = () => {
        // const todolistId = "2f0d7acb-a3f3-43f9-bf65-be1294c4069f"
        // const title = "CHICKA CHICKA BONBONI"
        todolistsAPI.createTask(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
    }
    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={'todolistId'} value={todolistId} onChange={onChangeTodolistId} />
            <input placeholder={'title'} value={title} onChange={onChangeTitle} />
            <button onClick={createTask}>create task</button>
        </div>
    )
}


//delete request
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        // const todolistId = "2f0d7acb-a3f3-43f9-bf65-be1294c4069f"
        // const taskId = "d3ce0d8c-7cd3-4d3a-a0a7-6187450b5a20"
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((response) => {
                setState(response.data)
            })
    }

    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input onChange={onChangeTodolistId} placeholder={'todolistId'} value={todolistId} />
                <input onChange={onChangeTaskId} placeholder={'taskId'} value={taskId} />
                <button onClick={deleteTask}>delete task</button>
            </div>

        </div>
    )
}


//update request
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')



    const updateTask = () => {
        // const todolistId = "2f0d7acb-a3f3-43f9-bf65-be1294c4069f"
        // const taskId = "bf5357de-8901-4d91-9998-130571b2d08e"
        // const title = "GOOD GOOD DOG"
        todolistsAPI.updateTask(todolistId, taskId, title)
            .then((response) => {
                setState(response.data)
            })
    }



    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={'todolistId'} value={todolistId} onChange={onChangeTodolistId} />
            <input placeholder={'taskId'} value={taskId} onChange={onChangeTaskId} />
            <input placeholder={'title'} value={title} onChange={onChangeTitle} />
            <button onClick={updateTask}>update task</button>
        </div>
    )
}