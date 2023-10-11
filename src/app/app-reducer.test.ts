import { InitialStateType, appReducer, appSetErrorAC, appSetStatusAC } from "./app-reducer";



let startState: InitialStateType;

beforeEach(() => {
    startState = {
        status: "idle",
        error: null
    }
})


test('correct error message should be set', ()=> {
    const endState = appReducer(startState, appSetErrorAC('Your fucking error'))
    expect(endState.error).toBe('Your fucking error')
})


test('correct status shoul be set', () => {
    const endState = appReducer(startState, appSetStatusAC('loading'))
    expect(endState.status).toBe('loading')
})


