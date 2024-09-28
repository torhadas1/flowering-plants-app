import React from 'react';
import Table from './Table'; // Assuming you'll create a Table component

// In Plot.js
function Plot({ plotName, tablesData,onTableDataUpdate  }) { // Remove selectedArea prop if not needed
  return (
    <div className="plot">
      <h2>{plotName}</h2>
      <div className="plot-grid">
        {tablesData.map(({ tableId, ...rest }) => (
          <div key={tableId} className="plot-cell"> {/* Ensure tableId is unique */}
            <Table tableData={{ tableId, ...rest }} onTableDataUpdate={onTableDataUpdate} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plot;