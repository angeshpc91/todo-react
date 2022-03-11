import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

export default function TodoAddDialog(props) {
  const { open, handleDialogClose, handleAddNoteSave } = props

  const [textInput, setTextInput] = useState('');

  const handleInputChange = (e) => {
    setTextInput(e.target.value);
  }

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogTitle>Add</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add Todo Note
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Todo Note"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={() => handleAddNoteSave(textInput)}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}
