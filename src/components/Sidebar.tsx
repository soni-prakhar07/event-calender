import { useState } from "react";

interface SidebarProps {
  selectedDate?: Date;
  tasks: { [date: string]: string[] };
  addTask: (date: string, task: string) => void;
  deleteTask: (date: string, index: number) => void;
  updateTask: (date: string, index: number, newTask: string) => void; // New prop for updating tasks
}

export default function Sidebar({
  selectedDate,
  tasks,
  addTask,
  deleteTask,
  updateTask, // Include updateTask function
}: SidebarProps) {
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track which task is being edited

  // Ensure that selectedDate has a default value of current date if undefined
  const currentDate = selectedDate || new Date();

  // Format the date as DD/MM/YYYY
  const formattedDate = currentDate.toLocaleDateString("en-GB"); // This will always be a string now

  const handleAddTask = () => {
    if (newTask) {
      addTask(formattedDate, newTask);
      setNewTask("");
    }
  };

  const handleEditTask = (index: number) => {
    setEditingIndex(index);
    setNewTask(tasks[formattedDate][index]); // Set the task text to the input field
  };

  const handleUpdateTask = () => {
    if (editingIndex !== null && newTask) {
      updateTask(formattedDate, editingIndex, newTask);
      setNewTask("");
      setEditingIndex(null); // Reset editing state
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-stretch flex-shrink-0"
      style={{
        width: 380,
        margin: "10px",
        border: "2px solid black",
        borderRadius: "10px",
        padding: "10px",
        backgroundColor: "#F29F58",
      }}
    >
      <h2
        className="text-center my-2 "
        style={{ fontWeight: "900" }}
      >{`Tasks for ${formattedDate}`}</h2>
      <div>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Add or edit a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="btn btn-primary w-100"
          style={{ backgroundColor: "#1B1833" }}
          onClick={editingIndex === null ? handleAddTask : handleUpdateTask}
        >
          {editingIndex === null ? "Add Task" : "Update Task"}
        </button>
      </div>
      <ul className="list-group mt-3">
        {tasks[formattedDate]?.map((task, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {task}
            <div>
              <button
                className="btn btn-warning btn-sm mx-1"
                onClick={() => handleEditTask(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTask(formattedDate, index)}
              >
                Delete
              </button>
            </div>
          </li>
        )) || <li className="list-group-item text-muted">No tasks yet.</li>}
      </ul>
    </div>
  );
}
