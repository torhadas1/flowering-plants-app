import React, { useState, useEffect } from 'react';
import GrowingTables from './GrowingTables.js'; // Import GrowingTables component
import Menu from './menu.js'; // Import your Menu component
import './App.css'; // Import your CSS file 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { HashRouter , Routes, Route  } from 'react-router-dom';
import Tasks from './Tasks'; // Import Tasks component

function App() {
  const [tablesData, setTablesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state   
  const [selectedPlot, setSelectedPlot] = useState('Ganei Am'); // Default to Ganei Am
  const [selectedArea, setSelectedArea] = useState(null); // Initially no area selected
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('./growing_tables.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Update plot values
        const updatedData = Object.entries(data).reduce((acc, [tableId, tableData]) => {
          acc[tableId] = {
            ...tableData,
            plot: tableData.plot === 'Ganei Am' ? 'Ganei Am' : 'Ramatayim'
          };
          return acc;
        }, {});

        setTablesData(updatedData);
        const storedData = localStorage.getItem('tablesData');
        if (storedData) {
          setTablesData(JSON.parse(storedData));
        } else {
          setTablesData(data);
        }

      } catch (error) {
        console.error('Err  or fetching data:', error);
        setError(error); // Set error state
      } finally {
        setIsLoading(false); // Set loading state to false, regardless of success or failure
      }
    };

    fetchData();
  }, []);


  const handleTableDataUpdate = (tableId, updatedData) => {
    setTablesData(prevData => {
      const newData = { ...prevData };
      newData[tableId] = updatedData;
      // Save changes to local storage
      localStorage.setItem('tablesData', JSON.stringify(newData));
      console.log('Data saved to local storage');

      return newData;
    });
  };



  if (isLoading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  // ... (other parts of your App component, including state variables, useEffect, and handleTableDataUpdate)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <HashRouter>
    
      <div className="App">
        <header className="app-header"> {/* Add the header */}
          <img src="/logo.jpg" alt="Logo" className="app-logo" /> {/* Add your logo image */}
          <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </header>

        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> {/* Render the Menu component */}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="plot-selection">
                  {/* Plot selection buttons */}
                  {['Ganei Am', 'Ramatayim'].map(plot => (
                    <label key={plot} style={selectedPlot === plot ? { backgroundColor: '#cfdbff', fontWeight: '550' } : {}}>
                      <input
                        type="radio"
                        value={plot}
                        checked={selectedPlot === plot}
                        onChange={() => setSelectedPlot(plot)}
                      />
                      {plot}
                    </label>
                  ))}
                  {/* Area selection (now also radio buttons) */}
                  {selectedPlot === 'Ganei Am' && (
                    <div className="area-selection">
                      {[100, 200, 300, 400, 500, 600, 700].map(area => (
                        <label key={area} style={selectedArea === area ? { backgroundColor: '#cfdbff', fontWeight: '550' } : {}}> {/* Wrap each radio button in a label */}
                          <input
                            type="radio"
                            name="area"  // Add a name attribute to group the radio buttons
                            value={area}
                            checked={selectedArea === area}
                            onChange={() => setSelectedArea(area)}
                          />
                          {area}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <GrowingTables
                  tablesData={tablesData}
                  selectedPlot={selectedPlot}
                  selectedArea={selectedArea}
                  onTableDataUpdate={handleTableDataUpdate}
                />
              </>
            }
          />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
