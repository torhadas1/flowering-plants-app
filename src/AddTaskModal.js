// AddTaskModal.js
import React, { useState } from 'react';
import './AddTaskModal.css'; // Create CSS file for modal styles

function AddTaskModal({ onClose, onSave, taskToEdit, employeesList }) {
  const [taskDescription, setTaskDescription] = useState(taskToEdit ? taskToEdit.description : '');
  const [selectedEmployees, setSelectedEmployees] = useState(taskToEdit ? taskToEdit.employees : []);
  
  const handleSave = () => {
    const newTask = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      date: taskToEdit ? taskToEdit.date : new Date().toLocaleDateString(),
      status: taskToEdit ? taskToEdit.status : 'Not Completed',
      description: taskDescription,
      employees: selectedEmployees,
    };
    onSave(newTask);
  };

  const handleEmployeeChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i=0; i<options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedEmployees(selected);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{taskToEdit ? 'Edit Task' : 'Add Task'}</h2>
        <div className="modal-body">
          <div>
            <label>Employees:</label>
            <select
              value={selectedEmployees}
              onChange={handleEmployeeChange}
            >
              {employeesList.map(employee => (
                <option key={employee} value={employee}>
                  {employee}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Task:</label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default AddTaskModal;
