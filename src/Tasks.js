// Tasks.js
import React, { useState, useEffect } from 'react';
import './Tasks.css'; // Create a separate CSS file for tasks page styles
import AddTaskModal from './AddTaskModal'; // Create AddTaskModal component

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedEmployeesFilter, setSelectedEmployeesFilter] = useState(['All']);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

  // List of employees for selection
  const employeesList = ['All','Tan', 'Tia', 'Paa',"Tzat","Tzaa","Lam","Wood","Hum","Tzin","Gein","Too"];

  useEffect(() => {
    // Load tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // Function to toggle task selection
  const toggleTaskSelection = (taskId) => {
    setSelectedTasks(prevSelected => {
      if (prevSelected.includes(taskId)) {
        return prevSelected.filter(id => id !== taskId);
      } else {
        return [...prevSelected, taskId];
      }
    });
  };

  // Function to delete selected tasks
  const deleteSelectedTasks = () => {
    setTasks(prevTasks => prevTasks.filter(task => !selectedTasks.includes(task.id)));
    setSelectedTasks([]);
  };

  // Function to mark selected tasks as completed
  const markSelectedTasksCompleted = () => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        selectedTasks.includes(task.id) ? { ...task, status: 'Completed' } : task
      )
    );
    setSelectedTasks([]);
  };

  // Function to edit selected task
  const editSelectedTask = () => {
    if (selectedTasks.length === 1) {
      const taskToEdit = tasks.find(task => task.id === selectedTasks[0]);
      // Open AddTaskModal with taskToEdit data
      setIsAddModalOpen(true);
      setTaskToEdit(taskToEdit);
    }
  };

  const [taskToEdit, setTaskToEdit] = useState(null);

  // Function to update an existing task
  const updateTask = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    setTaskToEdit(null);
  };

  // Function to filter tasks based on filters
  const filteredTasks = tasks.filter(task => {
    let statusMatch = true;
    let employeeMatch = true;

    if (selectedStatusFilter !== 'All') {
      statusMatch = task.status === selectedStatusFilter;
    }

    if (!selectedEmployeesFilter.includes('All')) {
      employeeMatch = task.employees.some(employee => selectedEmployeesFilter.includes(employee));
    }

    return statusMatch && employeeMatch;
  });

  return (
    <div className="tasks-page">
      <h1>Tasks</h1>
      <div className="tasks-actions">
        <button onClick={() => setFilterOpen(!filterOpen)}>Filter</button>
        <button onClick={() => setIsAddModalOpen(true)}>Add</button>
      </div>

      {filterOpen && (
        <div className="tasks-filters">
          <div>
            <label>Status: </label>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Not Completed">Not Completed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label>Employees: </label>
            <select
              
              value={selectedEmployeesFilter}
              onChange={(e) =>
                setSelectedEmployeesFilter(
                  Array.from(e.target.selectedOptions, option => option.value)
                )
              }
            >
              {employeesList.map(employee => (
                <option key={employee} value={employee}>
                  {employee}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {selectedTasks.length > 0 && (
        <div className="tasks-selected-actions">
          <button onClick={deleteSelectedTasks}>Delete</button>
          <button onClick={markSelectedTasksCompleted}>Mark Completed</button>
          {selectedTasks.length === 1 && <button onClick={editSelectedTask}>Edit</button>}
        </div>
      )}

      <table className="tasks-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Date</th>
            <th>Status</th>
            <th>Task</th>
            <th>Employees</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => toggleTaskSelection(task.id)}
                />
              </td>
              <td>{task.date}</td>
              <td>{task.status}</td>
              <td>{task.description}</td>
              <td>{task.employees.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddModalOpen && (
        <AddTaskModal
          onClose={() => { setIsAddModalOpen(false); setTaskToEdit(null); }}
          onSave={(task) => {
            if (taskToEdit) {
              updateTask(task);
            } else {
              addTask(task);
            }
            setIsAddModalOpen(false);
          }}
          taskToEdit={taskToEdit}
          employeesList={employeesList}
        />
      )}
    </div>
  );
}

export default Tasks;
