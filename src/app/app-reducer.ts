//initialState
const initialState = {
    error: null as null | string,
    status: 'loading' as RequestStatusType
}

//reducer
export const appReducer = (state: InitialStateType = initialState, action:  AppForReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

//actionCreat
export const setStatusAC = (status: RequestStatusType) => {
return {
    type: 'APP/SET-STATUS',
    status
} as const
}

export const setErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

//type
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
export type SetErrorType = ReturnType<typeof setErrorAC>
export type SetStatusType = ReturnType<typeof setStatusAC>
export type AppForReducerActionsType = 
SetStatusType
| SetErrorType
