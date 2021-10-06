import { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
import "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map(doc => doc.data()));
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().task }))
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault(); //prevents page from refreshing
    db.collection("todos").add({
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  // db.collection('todos').get({}).then(data => data.docs.forEach(doc => console.log( doc.data().timestamp)))

  return (
    <div className="App">
      <h1>ToDo App </h1>
      <form>
        {/* form control from material ui */}
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            disabled={!input}
            type="submit"
            onClick={addTodo}
            variant="contained"
          >
            Add Todo
          </Button>
        </FormControl>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
