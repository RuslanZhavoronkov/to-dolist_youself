
const initialState: InitialStateType = {
    status: "idle",
    error: 'some errorrrrr'
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType) => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return { ...state, status: action.payload.status }
        }
        case 'APP/SET-ERROR': {
            return { ...state, error: action.payload.error }
        }
        default: {
            return state
        }
    }
}


//Action-create
export const appSetStatusAC = (status: StatusType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {
            status
        }
    } as const
}

export const appSetErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {
            error
        }
    } as const
}

//type
export type InitialStateType = {
    //происходит ли сейчас взаимодействие с сервером
    status: StatusType // показывать крутилку или не показывать 
    //если ошибка глобально какая то произойдет - мы запишем текст ошибки сюда
    error: string | null //если есть ошибка, то запишем ее текст сюда
}
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type AppSetStatusActionType = ReturnType<typeof appSetStatusAC>
type AppSetErrorActionType = ReturnType<typeof appSetErrorAC>
export type AppActionType = AppSetStatusActionType | AppSetErrorActionType