
import { v1 } from 'uuid';
import { AddTodolistACType, RemoveTodolistActionType, SetTodolistsACType } from './todolists-reducer';
import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType, todolistsAPI } from '../../api/todolists-api'
import { Dispatch } from 'redux';
import { AppRootStateType } from '../../app/store';



const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': 
            return {...state, [action.todolistId]:state[action.todolistId].filter(el => el.id !== action.taskId)}
    
        case 'ADD-TASK': 
            return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
        
        case 'UPDATE-TASK-TITLE-STATUS': 
            return {...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {...el, ...action.model}: el)}

        case 'ADD-TODOLIST': 
            return {...state, [action.todolist.id]: []
        }

        case 'REMOVE-TODOLIST': {
            const copyState = { ...state };
            delete copyState[action.id];
            return copyState;
        }

        case 'SET-TODOLISTS': {
            const copyState = { ...state }
            action.todolists.forEach(el => {
                copyState[el.id] = []
            })
            return copyState;
        }

        case 'SET_TASK': {
            return { ...state, [action.todoListId]: action.tasks }
        }

        default:
            return state;
    }
}

//actions create
export const removeTaskAC = (taskId: string, todolistId: string) => ({ type: 'REMOVE-TASK', taskId, todolistId } as const)
export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task } as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => (
    { type: 'UPDATE-TASK-TITLE-STATUS', todolistId, taskId, model } as const)
export const setTaskAC = (tasks: TaskType[], todoListId: string) => (
    { type: 'SET_TASK', tasks, todoListId } as const)


//thunks 
export const fetchTasksThunkTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTasks(todolistId)
        .then((response) => {
            dispatch(setTaskAC(response.data.items, todolistId))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((response) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTask(todolistId, title)
        .then((response) => {
            dispatch(addTaskAC(response.data.data.item))
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(el => el.id === taskId) //нашли таску у которой нужно поменять статус

        if (!task) {
            console.log('TASK NOT FOUND')
            return
        }


        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status, //на серваке нужно изменить только это свойство
            title: task.title,
            ...domainModel


        }
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then((response) => {
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
            })
    }

//type
    type ActionsType =
    AddTodolistACType
    | RemoveTodolistActionType
    | SetTodolistsACType
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTaskAC>

    export type UpdateDomainTaskModelType = {
        title?: string
        description?: string
        status?: TaskStatuses
        priority?: TaskPriorities
        startDate?: string
        deadline?: string
    }

    export type TasksStateType = {
        [key: string]: Array<TaskType>
    }