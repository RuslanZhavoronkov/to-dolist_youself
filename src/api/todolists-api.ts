import axios from "axios"
import { useEffect } from "react"




//Типы данных c Бэка(которорыми зарезолвятся промисы) для Тудулистов

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}



type ResponseType <T = {}> = {
    data: T,
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}



//Объект настроек чтобы цеплялись куки
const settings = {
    withCredentials: true, //
    headers: {
        "API-KEY": '559562a7-157b-436b-9ddd-885f8624a836'
    }
}


export const todolistsAPI = {
    getTodolists() {
        return axios.get<TodolistType[]>(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings)
    },

    createTodolist(title: string) {
        return axios.post<ResponseType<{item: TodolistType}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists`, { title: title }, settings)
    },

    deleteTodolist(todolistId: string) {
        return axios.delete<ResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    },

    updateTodolistTitle(todolistId: string, title: string) {
        return axios.put<ResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, { title: title }, settings)
    },

    getTask(todolistId: string){
       return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, settings)
    },

    createTask (todolistId:string, title: string) {
        return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title:title}, settings)
    }





}