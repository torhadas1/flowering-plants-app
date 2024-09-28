import React from 'react';
import Plot from './Plot'; // Assuming you'll create a Plot component

function PlotList({ tablesData, onTableDataUpdate }) {
  // Extract unique plot names from the filtered tables (considering selectedArea)
  const plotNames = [...new Set(tablesData.map(table => table.plot))];

  return (
    <div className="plot-list">
      {plotNames.length > 0 ? (
        plotNames.map(plotName => (
          <Plot
            key={plotName}
            plotName={plotName}
            tablesData={tablesData}
            onTableDataUpdate={onTableDataUpdate}
          />
        ))
      ) : (
        <div>No plots found for the selected area.</div>
      )}
    </div>
  );
}

export default PlotList;