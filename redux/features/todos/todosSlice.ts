import { useAppSelector } from '@/hooks/redux'
import { PRIORITIES } from '@/lib/constant'
import { createSlice } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'

export interface TodoState {
  id: string
  username: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

const initialState: TodoState[] = []

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: { payload: Omit<TodoState, 'completed'> }) {
      state.push({
        username: action.payload.username,
        id: action.payload.id,
        text: action.payload.text,
        priority: action.payload.priority,
        completed: false
      })
    },
    deleteTodo(state, action: { payload: Pick<TodoState, 'id'> }) {
      const filteredState = state.filter(
        (item) => item.id !== action.payload.id
      )

      return filteredState
    },
    editTodo(state, action: { payload: Pick<TodoState, 'id' | 'text'> }) {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.text = action.payload.text
      }
    },
    toggleTodo(state, action: { payload: Pick<TodoState, 'id'> }) {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  }
})

export const { addTodo, toggleTodo, deleteTodo, editTodo } = todosSlice.actions

export const useTodos = (
  username: string | null | undefined,
  completed?: boolean
) =>
  useAppSelector(
    (state) =>
      state.todos
        .filter((item) =>
          completed
            ? item.username === username && item.completed
            : item.username === username
        )
        .sort(
          (a, b) =>
            PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority)
        ),
    shallowEqual
  )

export const useTodoById = (id: string | null | undefined) =>
  useAppSelector(
    (state) => state.todos.find((item) => item.id === id),
    shallowEqual
  )

export const useTodosByPriority = (priority: TodoState['priority']) =>
  useAppSelector(
    (state) => state.todos.filter((item) => item.priority === priority),
    shallowEqual
  )

export default todosSlice.reducer
