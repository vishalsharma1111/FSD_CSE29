
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("todo-tasks")) || [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        text: input.trim(),
        completed: false,
      },
    ]);

    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  return (
    <div className="app">
      <header className="header">
        <div className="logo">✓</div>
        <h1>TaskFlow</h1>
        <p>Your day, organized beautifully.</p>
      </header>

      <main className="todo-card">
        <div className="welcome">
          <div>
            <h2>My Tasks</h2>
            <p>Small steps. Big achievements.</p>
          </div>
          <span className="date">
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>

        <div className="progress-section">
          <div className="progress-label">
            <span>Daily progress</span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p>
            {completedCount} of {tasks.length} tasks completed
          </p>
        </div>

        <form className="add-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="What do you need to do?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={200}
            aria-label="New task"
          />
          <button type="submit" className="add-button">
            + Add
          </button>
        </form>

        <div className="filter-row">
          {["All", "Pending", "Completed"].map((item) => (
            <button
              key={item}
              className={`filter-button ${
                filter === item ? "active" : ""
              }`}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item}
              {item === "All" && (
                <span>{tasks.length}</span>
              )}
            </button>
          ))}
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✦</div>
              <h3>
                {filter === "Completed"
                  ? "Nothing completed yet"
                  : filter === "Pending"
                  ? "You're all caught up!"
                  : "Ready to get started?"}
              </h3>
              <p>Add a task above and make today count.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                className={`task-item ${
                  task.completed ? "is-completed" : ""
                }`}
                key={task.id}
              >
                <button
                  className="check-button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={
                    task.completed
                      ? "Mark as pending"
                      : "Mark as completed"
                  }
                  type="button"
                >
                  {task.completed ? "✓" : ""}
                </button>

                <span className="task-text">{task.text}</span>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                  type="button"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {tasks.length > 0 && (
          <footer className="footer">
            <span>{tasks.length - completedCount} remaining</span>
            <button onClick={clearCompleted} type="button">
              Clear completed
            </button>
          </footer>
        )}
      </main>

      <p className="bottom-note">
        Made for a more focused you ✨
      </p>
    </div>
  );
}

export default App;
