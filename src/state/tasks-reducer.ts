import { TasksStateType } from '../App';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistACType } from './todolists-reducer';
import { GetTasksResponse, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType, todolistsAPI } from '../api/todolists-api'
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = ReturnType<typeof addTaskAC>


export type UpdateTaskActionType = {
    type: 'UPDATE-TASK',
    todolistId: string
    taskId: string
    model: UpdateDomainTaskModelType
}

export type ChangeTaskTitleActionType = {
    type: 'UPDATE-TASK',
    todolistId: string
    taskId: string
    model: UpdateDomainTaskModelType
}

export type setTaskACType = ReturnType<typeof setTaskAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | UpdateTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistACType
    | setTaskACType

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

            return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
            //const stateCopy = {...state}
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
            //return stateCopy;
        }
        case 'UPDATE-TASK': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, ...action.model } : t);

            state[action.todolistId] = newTasksArray;
            return ({ ...state });
        }
        case 'UPDATE-TASK': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, title: action.title } : t);

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

        case 'SET-TODO-LIST': {
            const copyState = { ...state }
            action.payload.newTodolists.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }

        case 'SET-TASKS': {
            return { ...state, [action.payload.todoListId]: [...action.payload.newTasks] }
        }

        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId }
}
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task
    } as const
}
export const updateTaskAC = (taskId: string, model:  UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return { type: 'UPDATE-TASK', model, todolistId, taskId }
}
export const changeTaskTitleAC = (taskId: string, model:  UpdateDomainTaskModelType, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'UPDATE-TASK', model, todolistId, taskId }
}

export const setTaskAC = (newTasks: TaskType[], todoListId: string) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todoListId,
            newTasks
        }
    } as const
}


//Create function thunk (добавление тасок с сервера)
export const fetchTasksTC = (todoListId: string) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todoListId)
            .then((response) => {
                dispatch(setTaskAC(response.data.items, todoListId))
            })
    }
}


export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId) //удалили таску на сервере
            .then((response) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}


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



export const changeTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(el => el.id === taskId)
        if (!task) {
            console.log('WARNING')
            return
        }


        //Делаем копию модели
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            ...domainModel //у domainModule может быть только одно свойство, которое мы и перезатрем
        }
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then((response) => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })
    }
}