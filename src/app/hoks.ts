import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppRootStateType, AppDispatchType } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatchType = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector