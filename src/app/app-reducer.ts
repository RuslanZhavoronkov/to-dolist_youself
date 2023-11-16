//initialState
const initialState = {
    status: 'loading' as RequestStatusType
}

//reducer
export const appReducer = (state: InitialStateType = initialState, action:  AppForReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
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

//type
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
export type setStatusType = ReturnType<typeof setStatusAC>
export type AppForReducerActionsType = setStatusType