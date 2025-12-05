import React from 'react';

function EntryList({ entries, onDeleteEntry, onOpenModal }) { // Add onOpenModal prop
  return (
    <section id="entries" className="entry-list-section">
      <h2>Your Entries</h2>
      <div className="entry-list">
        {entries.length === 0 ? (
          <p>No entries match your search.</p>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="entry" onClick={() => onOpenModal(entry)}> {/* Add click handler */}
              <h3>{entry.title}</h3>
              <p>{entry.content}</p>
              {entry.image && (
                <div className="image-box">
                  <img src={entry.image} alt="Entry Image" className="entry-image" />
                  {entry.imageSource && <p className="image-source">Source: {entry.imageSource}</p>}
                </div>
              )}
              <button onClick={(e) => { e.stopPropagation(); onDeleteEntry(entry.id); }}>Del</button> {/* Prevent modal open on delete */}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default EntryList;