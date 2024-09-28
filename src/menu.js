// menu.js
import React from 'react';
import { Link } from 'react-router-dom';

function Menu({ isMenuOpen, setIsMenuOpen }) {
  return (
    <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
      <ul>
        <li>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Plot Map</Link>
        </li>
        <li>
          <Link to="/tasks" onClick={() => setIsMenuOpen(false)}>Tasks</Link>
        </li>
        {/* Add more menu items here in the future */}
      </ul>
    </div>
  );
}

export default Menu;