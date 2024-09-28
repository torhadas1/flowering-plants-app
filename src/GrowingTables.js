import React from 'react';
import PlotList from './PlotList'; 

// In GrowingTables.js
function GrowingTables({ tablesData, selectedPlot, selectedArea, onTableDataUpdate }) {
  const filteredTables = Object.entries(tablesData)
    .filter(([_, tableData]) => 
      tableData.plot === selectedPlot && 
      (selectedArea === null || tableData.area === selectedArea) 
    )
    .map(([tableId, tableData]) => ({ tableId, ...tableData }));

  // Check if there are any filtered tables
  if (filteredTables.length === 0) {
    return <div>No tables found for the selected plot and area.</div>;
  }

  return (
    <div>
      <PlotList tablesData={filteredTables} onTableDataUpdate={onTableDataUpdate} /> 
    </div>
  );
}
export default GrowingTables;