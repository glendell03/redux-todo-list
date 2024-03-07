import { combineReducers } from '@reduxjs/toolkit'
import TodosReducer from './features/todos/todosSlice'

const rootReducer = combineReducers({ todos: TodosReducer })

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
