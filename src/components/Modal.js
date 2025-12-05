import React from 'react';

function Modal({ entry, isEditing, editData, setEditData, onSave, onCancel, onEdit, onDelete, onClose }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = () => { // New: Confirm before saving
    if (window.confirm('Are you sure you want to save the changes?')) {
      onSave();
    }
  };

  const handleDelete = () => { // New: Confirm before deleting
    if (window.confirm('Are you sure you want to delete this entry?')) {
      onDelete();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <textarea
              name="content"
              value={editData.content}
              onChange={handleChange}
              placeholder="Content"
            />
            <input
              type="text"
              name="image"
              value={editData.image || ''}
              onChange={handleChange}
              placeholder="Image URL"
            />
            <input
              type="text"
              name="imageSource"
              value={editData.imageSource || ''}
              onChange={handleChange}
              placeholder="Image Source"
            />
            <div className="modal-buttons">
              <button onClick={handleSave}>Save</button> {/* Use handleSave */}
              <button onClick={onCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="view-mode">
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
            {entry.image && (
              <div className="image-box">
                <img src={entry.image} alt="Entry Image" className="entry-image" />
                {entry.imageSource && <p className="image-source">Source: {entry.imageSource}</p>}
              </div>
            )}
            <div className="modal-buttons">
              <button onClick={onEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button> {/* Use handleDelete */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;