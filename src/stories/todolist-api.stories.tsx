

import React, { useEffect, useState } from 'react'
import { todolistsAPI } from '../api/todolists-api'

export default {
    title: 'API'
}


//Todolists

//get request
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        todolistsAPI.getTodolists()
            .then((response) => {

                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


//post request
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'IT SUPER_INCUBATOR'
        todolistsAPI.createTodolist(title)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>//конвертация в строку для отображения на UI
}



//delete request
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "662883f5-6e61-4a8b-8560-771276443a79"
        todolistsAPI.deleteTodolist(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}



//update request
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "e4a52008-b2a5-42bd-80f0-c92089d3d26e"
        const title = 'IT-INCUBATOR_SUPER_KAMASUTRA_AAAAAAAAAA'
        todolistsAPI.updateTodolistTitle(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}






//Tasks

//get request
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "cb643e40-9e50-4d52-b672-4396f196bdb7"
        todolistsAPI.getTask(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    )
}

//post request
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "2f0d7acb-a3f3-43f9-bf65-be1294c4069f"
        const title = "EEEE_KAMASUTRA"
        todolistsAPI.createTask(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    )
}


//delete request
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId ='' 
        const taskId = ''
        todolistsAPI.deleteTask(todolistId, taskId)
        .then((response) => {
            setState(response.data)
        })
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    )
}


//update request
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    )
}