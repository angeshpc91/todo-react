import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Alert, Box, Container, Snackbar, Typography } from '@mui/material';
import TodoList from './components/TodoList';
import { fetchTodoList } from './Todo.action'


function Todo(props) {

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error'); // error, warning, info, success
  const [message, setMessage] = useState('')
  // const [todo, setTodo] = useState([])
  const {
    TodoReducer: { TodoList: TodoListVal, isLoading, isError }
  } = props

  useEffect(() => {
    props
      .dispatch(fetchTodoList('https://jsonplaceholder.typicode.com/todos?userId=5'))
      .then((response) => {
        const todos = response
        if (todos.length > 0) {
          return response
        } else {
          handleSnackbarClick('error', 'No data found!')
        }
      })
      .catch(() => {
        handleSnackbarClick('error', 'There has been some error!')
      })

  }, [])

  const handleSnackbarClick = (severityVal, msg) => {
    setOpen(true);
    setSeverity(severityVal)
    setMessage(msg)
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {!isLoading && !isError &&
        <Container maxWidth='md'>
          {/* todo header */}
          {/* <Box textAlign={'center'} bgcolor={'primary'} width='100%'> */}
          <Typography variant='h4' component='h3' textAlign={'center'}>Todo App</Typography>
          {/* </Box> */}
          {/* todo Body */}
          {
            TodoListVal.length > 0 ?
              <TodoList handleSnackbarClick={handleSnackbarClick} dispatchVal={props.dispatch} todoValList={TodoListVal}></TodoList>
              :
              <Box textAlign={'center'} height='100vh' display={'flex'} alignItems='center' justifyContent={'center'}>
                <Typography variant='h3' component='h1' color={'secondary'} textAlign={'center'}>Add new todo</Typography>
              </Box>

          }
        </Container>
      }
      {isLoading && !isError &&
        <Box textAlign={'center'} height='100vh' display={'flex'} alignItems='center' justifyContent={'center'}>
          <Typography variant='h3' component='h1' color={'success'} textAlign={'center'}>Loading...</Typography>
        </Box>
      }
      <Snackbar open={open} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

function mapStateToProps(state) {
  const { TodoReducer } = state
  return { TodoReducer }
}

export default connect(mapStateToProps)(Todo)
