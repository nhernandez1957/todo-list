import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todolist, setTodolist] = useState([]);

  const [newTodoError, setNewTodoError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if(newTodo.length === 0) {
      return;
    }

    const completeItem = {
      text: newTodo,
      complete: false
    }

    setTodolist([...todolist, completeItem])
    setNewTodo("");
  }

  const inputHandler = (event) => {
    setNewTodo(event.target.value);


  if(event.target.value.length < 5) {
      setNewTodoError("To-do item must be at least 5 characters.")
  }
    else {
      setNewTodoError("");
  }
  }

  const handleComplete = (idx) => {
    const updatedTodos = todolist.map((todo,i) => {
      if(idx === i) {
        todo.complete = !todo.complete;
      }

      return todo;
    });

    setTodolist(updatedTodos);
  }

  const handleDelete = (index) => {
    const filteredTodos = todolist.filter((todo, i) => {
      return i !== index;
    })

    setTodolist(filteredTodos);
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1 className="display-1">To-Do List</h1>
        <div className='border w-50 p-3 d-block mx-auto my-3'>
          <form onSubmit={(event) => {handleSubmit(event);}}>
            <div>
              <input placeholder='Enter To-Do Item' type="text" className="form-control" value={newTodo} onChange={inputHandler}/>
              <span className="alert-danger">{newTodo.length > 0 && newTodoError}</span>
            </div>
              <button type="submit" className='btn btn-primary' disabled={newTodoError}>Submit</button>
          </form>

          {
            todolist.map((todo,i) => {
              const itemClasses = [];

              if(todo.complete){
                itemClasses.push("line-through");
              }

              return(
                <div key={i}>
                  <p><input onChange={(event) => {handleComplete(i);}} checked={todo.complete} type="checkbox"/> <span className={itemClasses.join(" ")} onClick={(event) => {handleComplete(i);}}>{todo.text}</span> <button onClick={(event) => {handleDelete(i);}} className="btn btn-danger">Delete</button></p> 
                </div>
                );
            })
          }
        </div>
      </header>
    </div>
  );
}

export default App;
