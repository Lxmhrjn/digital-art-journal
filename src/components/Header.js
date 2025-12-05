import React from 'react';

function Header({ currentView, setCurrentView }) {
  return (
    <header className="header">
      <div className="container">
        <h1>Digital Art Journal</h1>
        <select
          value={currentView}
          onChange={(e) => setCurrentView(e.target.value)}
          className="view-dropdown"
        >
          <option value="add">Add Entry</option>
          <option value="view">View Entries</option>
        </select>
      </div>
    </header>
  );
}

export default Header;