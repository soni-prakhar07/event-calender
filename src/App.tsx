import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Calendar } from "./components/components/ui/calendar";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [tasks, setTasks] = useState<{ [date: string]: string[] }>({});

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const addTask = (date: string, task: string) => {
    setTasks((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), task],
    }));
  };

  const deleteTask = (date: string, index: number) => {
    setTasks((prev) => ({
      ...prev,
      [date]: prev[date].filter((_, i) => i !== index),
    }));
  };

  const updateTask = (date: string, index: number, newTask: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      if (updatedTasks[date]) {
        updatedTasks[date][index] = newTask; // Update the task at the given index
      }
      return updatedTasks;
    });
  };

  return (
    <div
      className="d-flex flex-row align-items-stretch "
      style={{
        margin: "10px",
        border: "2px solid black",
        borderRadius: "10px",
        padding: "10px",
        backgroundColor: "#AB4459",
      }}
    >
      <Sidebar
        selectedDate={selectedDate}
        tasks={tasks}
        addTask={addTask}
        deleteTask={deleteTask}
        updateTask={updateTask} // Pass the updateTask function as a prop
      />
      <Calendar
        onSelect={(date) => date && handleDateChange(date)}
        mode="single"
        selected={selectedDate}
      />
    </div>
  );
}

export default App;
