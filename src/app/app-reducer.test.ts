import { InitialAppStateType, RequestStatusType, appReducer, setErrorAC, setStatusAC } from "./app-reducer";

let startState:InitialAppStateType

beforeEach(()=> {
    startState = {
        status: 'idle' as RequestStatusType,
        error: 'some error'
    }
})


test ('correct error shoul be set',()=> {
const endState = appReducer(startState, setErrorAC('some error'))
expect(endState.error).toBe('some error')

})


test ('correct status shoul be set',()=> {
    const endState = appReducer(startState, setStatusAC('idle'))
    expect(endState.status).toBe('idle') 
    })