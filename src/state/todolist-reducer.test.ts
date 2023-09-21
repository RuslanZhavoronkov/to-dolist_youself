import { v1 } from "uuid"
import { TodolistDomainType, setTodolistAC, todolistsReducer } from "./todolists-reducer"

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(()=> {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId1, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]
})

test('todolists should be set to the state', ()=> {
    const action = setTodolistAC (startState)
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})