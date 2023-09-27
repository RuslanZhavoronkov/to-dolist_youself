import { TasksStateType } from '../App';
import { v1 } from 'uuid';
import { AddTodolistACType, RemoveTodolistActionType, SetTodolistsACType } from './todolists-reducer';
import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType, todolistsAPI } from '../api/todolists-api'
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';




type ActionsType =
    AddTodolistACType
    | RemoveTodolistActionType
    | SetTodolistsACType
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTaskAC>


const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            // const stateCopy = { ...state }
            // const newTask: TaskType = {
            //     id: v1(),
            //     title: action.title,
            //     status: TaskStatuses.New,
            //     todoListId: action.todolistId, description: '',
            //     startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            // }
            // const tasks = stateCopy[action.todolistId];
            // const newTasks = [newTask, ...tasks];
            // stateCopy[action.todolistId] = newTasks;
            // return stateCopy;
            return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }


        }
        case 'UPDATE-TASK-TITLE-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, ...action.model } : t);

            state[action.todolistId] = newTasksArray;
            return ({ ...state });
        }

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
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




export const removeTaskAC = (taskId: string, todolistId: string) => ({ type: 'REMOVE-TASK', taskId, todolistId } as const)
export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task } as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => (
    { type: 'UPDATE-TASK-TITLE-STATUS', todolistId, taskId, model } as const)
export const setTaskAC = (tasks: TaskType[], todoListId: string) => (
    { type: 'SET_TASK', tasks, todoListId } as const)

//Напишем thunks 
export const fetchTasksThunkTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((response) => {
                dispatch(setTaskAC(response.data.items, todolistId))
            })
    }
}

//create Thunk - delete Task
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((response) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}

//create Thunk  - add Task
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then((response) => {
                dispatch(addTaskAC(response.data.data.item))
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

//create THUNK - change taskStatus
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
}

