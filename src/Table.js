import React, { useState } from 'react';

function Table({ tableData, onTableDataUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...tableData });

  // Calculate background color based on fullness
  const fullness = tableData.full_or_empty;
  const red = 240 - Math.round(240 * (fullness / 100)); // Scale red from 240 to 0
  const green = 240 + Math.round(15 * (fullness / 100)); // Scale green from 240 to 255
  const blue = 240 - Math.round(240 * (fullness / 100)); // Scale blue from 240 to 0
  const backgroundColor = `rgb(${red}, ${green}, ${blue})`; // Calculate height for the fullness bar
  const fullnessBarHeight = `${tableData.full_or_empty}%`;

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const toggleDetails = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal on click
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
    event.stopPropagation(); // Stop event propagation
  };

  const handleSave = (event) => {
    onTableDataUpdate(tableData.tableId, editedData);
    setIsEditing(false);
    event.stopPropagation(); // Stop event propagation
  };

  const handleCancel = (event) => {
    setEditedData({ ...tableData }); // Revert to original data
    setIsEditing(false);
    event.stopPropagation(); // Stop event propagation
  };

  return (
    <div 
      className={`table ${tableData.type} ${isExpanded ? 'expanded' : ''}`} 
      onClick={toggleDetails}
       // Apply dynamic background color
    >
      <div className="table-header">
        <h4>{tableData.tableId.replace('table_', '')}</h4> {/* Remove "table_" prefix */}
        <p>{tableData.flower_type}</p> 
      </div>

      {/* Modal for table details */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            
            
            <h2>Table {tableData.tableId.replace('table_', '')} Details </h2>
            {/* Close button for the modal */}
            
            {/* Display table details here */}
            <p>Type: {isEditing ? (
              <select name="type" value={editedData.type} onChange={handleInputChange}>
                <option value="drip">Drip</option>
                <option value="spray">Spray</option>
              </select>
            ) : tableData.type}</p>
            <p>Fullness: {isEditing ? (
              <input
                type="number"
                name="full_or_empty"
                value={editedData.full_or_empty}
                onChange={handleInputChange}
                onClick={(e) => e.stopPropagation()}
              />
            ) : tableData.full_or_empty}%</p>
            
            <p>Computer: {tableData.computer}</p> {/* Plot is not editable */}
            <p>Tap: {tableData.tap}</p> {/* Area is not editable */}
            <p>Cycles: {tableData.tap}</p> {/* Area is not editable */}
            <p>Notes: {isEditing ? (
              <textarea
                name="notes"
                value={editedData.notes}
                onChange={handleInputChange}
                onClick={(e) => e.stopPropagation()}
              />
            ) : tableData.notes}</p>
            {/* Edit/Save/Cancel buttons */}
            <div className="table-actions">
              <button onClick={(event) => {
                if (isEditing) {
                  handleSave(event);
                } else {
                  setIsEditing(!isEditing);
                }
                event.stopPropagation();
              }}>
                {isEditing ? 'Save' : 'Edit'}
              </button>
              {isEditing && <button onClick={handleCancel}>Cancel</button>}
              
            </div>
            <button onClick={toggleDetails} className="close-button">X</button>
            
          </div>
        </div>
      )}
      <div className="fullness-bar" style={{ height: fullnessBarHeight }}></div> {/* Add fullness bar */} 
    </div>
  );
}

export default Table;