import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from 'react-redux';

function TodoList(props) {
  const [checked, setChecked] = React.useState([0]);

  const { handleSnackbarClick, TodoReducer: { TodoList: TodoListVal } } = props
  const toggleTodo = (value) => () => {
    const currentIndex = value.id;

    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      value.completed = !value.completed
    }

    setChecked(newChecked);
    handleSnackbarClick('info', "TODO " + value.title + " " + (value.completed ? 'Completed' : 'Restored'))
  };

  const handleDelete = (val) => {
    const currentIndex = TodoListVal.findIndex((valx) => valx.id === val.id)

    TodoListVal.splice(currentIndex, 1)
    // dispatch(addDeleteUpdateNoteData(TodoListVal))
    handleSnackbarClick('error', 'Deleted ' + val.title)
  }

  return (
    <List sx={{ width: '100%', maxWidth: 768, bgcolor: 'background.paper' }}>
      {TodoListVal.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem
            key={value.id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments" onClick={() => handleDelete(value)}>
                <DeleteIcon color='error' />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={toggleTodo(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={value.completed !== false}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.title}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List >
  );
}

function mapStateToProps(state) {
  const { TodoReducer } = state
  return { TodoReducer }
}

export default connect(mapStateToProps)(TodoList)
