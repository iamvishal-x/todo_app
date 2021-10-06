import { List, ListItem, ListItemText } from "@material-ui/core";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Button, FormControl, Input } from "@mui/material";
import db from "./firebase";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Todo = ({ todo }) => {
  const [open, setOpen] = useState(false);

  const updateTodo = () => {
    //update the todo with the new input
    db.collection("todos").doc(todo.id).set(
      {
        task: input,
      },
      { merge: true }
    );
    setInput("");
    setOpen(false);
  };

  const [input, setInput] = useState("");

  return (
    <div className="todo">
      <>
        <Modal open={open} onClose={(e) => setOpen(false)}>
          <div>
            <Box sx={style}>
              <center>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Update Task
                </Typography>
                <form>
                  <FormControl>
                    <Input
                      placeholder={todo.todo}
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                    />
                    <Button
                      disabled={!input}
                      type="submit"
                      variant="contained"
                      onClick={updateTodo}
                    >
                      Update Task
                    </Button>
                  </FormControl>
                </form>
              </center>
            </Box>
          </div>
        </Modal>
        <List>
          <ListItem>
            <ListItemText primary={todo.todo} secondary="" />
            <EditIcon
              sx={{ fontSize: 30 }}
              color="primary"
              onClick={(e) => setOpen(true)}
            />
            <DeleteForeverRoundedIcon
              sx={{ fontSize: 30 }}
              color="secondary"
              onClick={(event) => {
                db.collection("todos").doc(todo.id).delete();
              }}
            />
          </ListItem>
        </List>
      </>
    </div>
  );
};

export default Todo;
