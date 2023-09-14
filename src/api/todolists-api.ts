import axios from "axios"
import { TaskType } from "../Todolist"







const settings = {
    withCredentials: true, //login & parol true
    headers: {
        "API-KEY": "559562a7-157b-436b-9ddd-885f8624a836", //для каждого изменения на сервере должны присылать api-key
    }
}


//Создадим объектик настроек для axios, чтобы не писать каждый раз длинную часть url и settings

const instance = axios.create({ //axios создай на своей основе конкретный экземпляр, которрый заранее настрой
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})



export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

//Типы данных, которыми зарезолвится промис для тудулистов
//создаем тип зарезолвленных данных с помощью уточняющего джинерика
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}


//Типы данных, которыми зарезолвится промис для тасок

export type taskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}


export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


//Создадим объект который будет занриматься запросами на сервер
export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", { title: title })
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title: title })
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask (todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    }

}