import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoList(props) {
  const [checked, setChecked] = React.useState([0]);

  const { handleSnackbarClick, todoValList, dispatchVal } = props
  const toggleTodo = (value) => () => {
    const currentIndex = value.id;

    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      value.completed = !value.completed
    }

    setChecked(newChecked);
  };

  const handleDelete = (val) => {
    const arrVal = todoValList
    const currentIndex = arrVal.findIndex((valx) => valx.id === val.id)
    arrVal.splice(currentIndex, 1)
    // dispatchVal(arrVal)
    handleSnackbarClick('error', 'Deleted ' + val.title)
  }

  return (
    <List sx={{ width: '100%', maxWidth: 768, bgcolor: 'background.paper' }}>
      {props.todoValList.map((value) => {
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
