import { TODO_LIST, TODO_LIST_FAILURE, TODO_LIST_LOADING } from './Todo.actionConstants'

const DEFAULT_STATE = {
  TodoList: [],
  isLoading: false,
  isError: false
}

const TodoReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TODO_LIST:
      return {
        ...state,
        TodoList: action.payload,
        isLoading: false,
        isError: false
      }
    case TODO_LIST_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case TODO_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      return state
  }
}

export default TodoReducer
