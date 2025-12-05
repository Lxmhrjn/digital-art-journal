import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import SearchBar from './components/SearchBar';
import Checklist from './components/Checklist';
import Modal from './components/Modal'; // Add this import
import './App.css';

const sampleEntries = [
  {
    id: 1,
    title: 'My First Sketch',
    content: 'Experimented with charcoal today. Feeling inspired by nature.',
    image: 'https://picsum.photos/300/200?random=10',
    imageSource: 'Lorem Picsum (placeholder)'
  },
  {
    id: 2,
    title: 'Color Palette Exploration',
    content: 'Mixed warm and cool tones for a sunset scene. Learned a lot about balance.',
    image: 'https://picsum.photos/300/200?random=11',
    imageSource: 'Lorem Picsum (placeholder)'
  },
  {
    id: 3,
    title: 'Perspective Practice',
    content: 'Drew a cityscape with one-point perspective. Challenging but rewarding!',
    image: 'https://picsum.photos/300/200?random=12',
    imageSource: 'Lorem Picsum (placeholder)'
  }
];

function App() {
  const [entries, setEntries] = useState([]);
  const [currentView, setCurrentView] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null); // New: For modal
  const [isEditing, setIsEditing] = useState(false); // New: For edit mode
  const [editData, setEditData] = useState({}); // New: Temp edit data

  useEffect(() => {
    let savedEntries = JSON.parse(localStorage.getItem('artJournalEntries')) || [];
    if (savedEntries.length === 0) {
      savedEntries = sampleEntries;
      localStorage.setItem('artJournalEntries', JSON.stringify(savedEntries));
    }
    setEntries(savedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem('artJournalEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => {
    setEntries([...entries, { ...entry, id: Date.now() }]);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
    setSelectedEntry(null); // Close modal if deleting
  };

  const openModal = (entry) => { // New: Open modal
    setSelectedEntry(entry);
    setEditData({ ...entry });
    setIsEditing(false);
  };

  const closeModal = () => { // New: Close modal
    setSelectedEntry(null);
    setIsEditing(false);
  };

  const saveEdit = () => { // New: Save edits
    setEntries(entries.map(entry => entry.id === selectedEntry.id ? editData : entry));
    setIsEditing(false);
  };

  const cancelEdit = () => { // New: Cancel edits
    setEditData({ ...selectedEntry });
    setIsEditing(false);
  };

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="main-content">
        {currentView === 'add' && (
          <>
            <EntryForm onAddEntry={addEntry} />
            <Checklist />
          </>
        )}
        {currentView === 'view' && (
          <>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <EntryList entries={filteredEntries} onDeleteEntry={deleteEntry} onOpenModal={openModal} /> {/* Add onOpenModal */}
          </>
        )}
      </main>
      <Footer />
      {selectedEntry && ( // New: Render modal
        <Modal
          entry={selectedEntry}
          isEditing={isEditing}
          editData={editData}
          setEditData={setEditData}
          onSave={saveEdit}
          onCancel={cancelEdit}
          onEdit={() => setIsEditing(true)}
          onDelete={() => deleteEntry(selectedEntry.id)}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;