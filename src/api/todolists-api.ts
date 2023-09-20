import axios from "axios"
import { useEffect } from "react"




//Типы данных c Бэка(которорыми зарезолвятся промисы) для Тудулистов

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}


type ResponseType<T = {}> = {
    data: T,
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}


//Типы данных c Бэка(которорыми зарезолвятся промисы) для Тасок

//типы перечислений
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}



export type TaskType = {
    id: string
    title: string
    status: TaskStatuses
    description: string
    todoListId: string
    order: number
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}


export type GetTask = {
    items: TaskType[]
    totalCount: number
    error: string | null
}



type ResponseTypeTask<T = {}> = {
    data: T
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}



//Объект настроек чтобы цеплялись куки
// const settings = {
//     withCredentials: true, //
//     headers: {
//         "API-KEY": '559562a7-157b-436b-9ddd-885f8624a836'
//     }
// }


//Создадим экземпляр axios
const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        "API-KEY": '559562a7-157b-436b-9ddd-885f8624a836'
    }
})



export const todolistsAPI = {

    //AJAX запросы для тудулистов
    getTodolists() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, { title: title })
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },

    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title: title })
    },


    //AJAX запросы для тасок
    getTask(todolistId: string) {
        return instance.get<GetTask>(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseTypeTask<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title: title })
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTypeTask>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseTypeTask<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, { title: title })
    }



}