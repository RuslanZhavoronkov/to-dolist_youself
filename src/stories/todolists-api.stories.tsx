
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolists-api'

export default {
    title: 'API'
}

//Создадим объект настроек, чтобы не терялась авторизация при axios запросе

export const settings = {
    withCredentials: true, //login & parol true
    headers: {
        "API-KEY": "559562a7-157b-436b-9ddd-885f8624a836" //для каждого изменения на сервере должны присылать api-key
    }
}




//1-history get todolists

export const GetTodolists = () => {

    const [state, setState] = useState<any>({ name: 'Dimych' })

    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        todolistAPI.getTodolists()
            .then((response) => {
                //   debugger
                setState(response)
            })

    }, [])



    return <div>{JSON.stringify(state)}</div>
}




//2-history create todolists
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.createTodolist('BlaBla')
            .then((response) => {
                //debugger;
                setState(response.data)
            })


    }, [])

    return <div>{JSON.stringify(state)}</div>
}


//3-history delete todolist
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)


    useEffect(() => {
        const todolistId = 'a5d774da-dea0-4dab-b22a-117ec1b3a2c6'
        todolistAPI.deleteTodolist(todolistId)
            .then((response) => {
                //debugger;
                setState(response.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}




//4-history update todolist
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a5d774da-dea0-4dab-b22a-117ec1b3a2c6'
        todolistAPI.updateTodolistTitle(todolistId, 'YOYO')
            .then((response) => {
                debugger;
                setState(response.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

//__________________Hystory tasok_____________________________________________________________________

//1-history get todolists

export const GetTasks = () => {

    const [state, setState] = useState<any>({ name: 'Dimych' })

    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todolistId = '0f33246d-d211-4827-8dab-f2a1a7297b96'
        todolistAPI.getTasks(todolistId)
            .then((response) => {
                debugger
                setState(response)
            })

    }, [])



    return <div>{JSON.stringify(state)}</div>
}


//3-history delete todolist
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, setTodolistId] = useState<string>('')

    const 

    const deleteTask = () => {
        useEffect(() => {
            const todoListId = '0f33246d-d211-4827-8dab-f2a1a7297b96'
            const taskId = ''
            todolistAPI.deleteTask(todoListId, taskId)
                .then((response) => {
                    //debugger;
                    setState(response.data)
                })

        }, [])
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value = {todoListId} onChange = {changeTodolistId}/>
            <input placeholder={'taskId'} value = {taskId} onChange={changeTaskId}/>
            <button onClick={deleteTask}>deleteTask</button>
        </div>

    </div>
}
