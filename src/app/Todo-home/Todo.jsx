import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Alert, Box, Button, Container, Grid, Snackbar, Typography } from '@mui/material';
import TodoList from './components/TodoList';
import { fetchTodoList } from './Todo.action'
import TodoAddDialog from './components/TodoAddDialog';


function Todo(props) {

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [severity, setSeverity] = useState('error'); // error, warning, info, success
  const [message, setMessage] = useState('')

  const {
    TodoReducer: { TodoList: TodoListVal, isLoading, isError }, dispatch
  } = props


  //1st render
  useEffect(() => {
    fetchTodo()
  }, [])

  const fetchTodo = () => {
    dispatch(fetchTodoList('https://jsonplaceholder.typicode.com/todos?userId=5'))
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
  }

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

  // todo add note
  const handleAddNoteSave = (msg) => {
    const lastVal = TodoListVal[TodoListVal.length - 1]
    TodoListVal.push({
      "userId": 5,
      "id": lastVal?.id + 1 || 0,
      "title": msg,
      "completed": false
    })

    console.log(TodoListVal)

    setOpenDialog(false)
    handleSnackbarClick('success', 'TODO ' + msg + ' Added')
  }

  // todo add dialog close
  const handleDialogClose = () => {
    setOpenDialog(false)
  }

  return (
    <>
      {
        //When everything is fine
        !isLoading && !isError &&
        <Container maxWidth='sm' >
          {/* todo header */}
          <Grid container>
            <Grid item xs={12} sm={10} md={10}>
              <Typography variant='h4' component='h3' textAlign={'center'}>Todo App</Typography>
            </Grid>
            <Grid item xs={12} sm={2} md={2} style={{ padding: '5px' }}>
              <Button color='primary' variant='contained' fullWidth onClick={() => { setOpenDialog(true) }}>Add</Button>
            </Grid>
          </Grid>
          {/* todo Body */}
          {
            TodoListVal.length > 0 ?
              <TodoList handleSnackbarClick={handleSnackbarClick} todoValList={TodoListVal}></TodoList>
              :
              <Box textAlign={'center'} height='100vh' display={'flex'} alignItems='center' justifyContent={'center'}>
                <Typography variant='h3' component='h1' color={'secondary'} textAlign={'center'}>Add new todo</Typography>
              </Box>

          }
        </Container>
      }
      {
        // Is Loading
        isLoading && !isError &&
        <Box textAlign={'center'} height='100vh' display={'flex'} alignItems='center' justifyContent={'center'}>
          <Typography variant='h3' component='h1' color={'success'} textAlign={'center'}>Loading...</Typography>
        </Box>
      }
      {
        // Is error
        isError && !isLoading &&
        <Box textAlign={'center'} height='100vh' display={'flex'} alignItems='center' justifyContent={'center'}>
          <Typography variant='h3' component='h1' color={'red'} textAlign={'center'}>ERROR :(</Typography>
        </Box>
      }
      {/* todo add dialog */}
      <TodoAddDialog open={openDialog} handleDialogClose={handleDialogClose} handleAddNoteSave={handleAddNoteSave} />
      {/* todo snackbar */}
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
