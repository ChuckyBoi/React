import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { NewTodoForm } from "./NewTodoForm";
import "./App.css";
import { TodoList } from "./TodoList";
import Calculator from "./Calculator";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title, priority, dueDate) {
    setTodos(currentTodos => {
      const newTodos = [
        ...currentTodos,
        { id: crypto.randomUUID(), title, priority, dueDate, completed: false },
      ];
      return newTodos.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    });
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  }

  function deleteAllTodos() {
    setTodos([]);
  }

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <header>
        <nav className="nav-bar">
          <Link to="/">Todo List</Link>
          <Link to="/calculator">Calculator</Link>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NewTodoForm onSubmit={addTodo} />
              <div className="controls">
                <input
                  type="text"
                  placeholder="Search todos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-bar"
                />
                <button onClick={deleteAllTodos} className="btn btn-danger">
                  Delete All
                </button>
              </div>
              <h1 className="header">Todo List</h1>
              <TodoList
                todos={filteredTodos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              />
            </>
          }
        />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </Router>
  );
}
