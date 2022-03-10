import { TODO_LIST, TODO_LIST_FAILURE, TODO_LIST_LOADING } from './Todo.actionConstants'

export const getTodoList = (URL) => ({
  type: TODO_LIST,
  payload: URL
})

export const loadingTodo = () => ({
  type: TODO_LIST_LOADING
})

export const failureTodo = () => ({
  type: TODO_LIST_FAILURE
})

export function fetchTodoList(url) {
  return (dispatch) => {
    const promVal = new Promise((resolve, reject) => {
      dispatch(loadingTodo())
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data)
          dispatch(getTodoList(data))
        })
        .catch((err) => {
          reject(err)
          dispatch(failureTodo())
        })
    })
    return promVal
  }
}
