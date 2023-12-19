import { AnyAction, createSlice, isAnyOf, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.reducer";
import { todolistsThunks } from "features/TodolistsList/model/todolists/todolists.reducer";
import { authThunks } from "features/auth/model/auth.slice";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    // setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
    //   state.status = action.payload.status;
    // },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
    // .addMatcher((action: AnyAction)=>{
    //   console.log('action matcher', action.type)
    //   return action.type.endsWith('/pending')
    //  }, (state, action)=>{
    //   //debugger
    //   console.log('action forReducer', action.type)
    //   state.status = "loading"
    // })

    

    //isPending === action.type.endsWith('/pending')
    //крутилка для конкретных действий
    //.addMatcher(isPending(todolistThunks.fetchTodolists, todolistThunks.addTodolist), (state, action)=>{})

    .addMatcher(isPending, (state, action)=>{
      //debugger
      console.log('action forReducer', action.type)
      state.status = "loading"
    })

    // .addMatcher((action: AnyAction)=> {
    //   return action.type.endsWith('/fulfilled')
    // }, (state, action) => {
    //   state.status = "succeeded"
    // })
    .addMatcher(isFulfilled, (state, action) => {
      state.status = "succeeded"
    })

    // .addMatcher((action: AnyAction)=> {
    //   return action.type.endsWith('/rejected')
    // }, (state, action) => {
    // state.status = "failed"
    // })
    .addMatcher(isRejected,(state, action:AnyAction) => {
      state.status = "failed"
     // debugger
      //if (action.type ==="tasks/addTask/rejected") {
      if (action.type === tasksThunks.addTask.rejected.type) {
        return
      } 
      if(action.payload) {
        //if(action.type === 'todo/addTodolist/rejected'){
        if(action.type === todolistsThunks.addTodolist.rejected.type){
          return
        } 
        
        state.error = action.payload.messages[0]
      } else {
        state.error = action.error.message ? action.error.message : "Some error occurred";
      }
      
    })
    .addMatcher(isAnyOf(authThunks.initializeApp.fulfilled, authThunks.initializeApp.rejected)
    , (state, action)=> {
state.isInitialized = true
     })
  }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
