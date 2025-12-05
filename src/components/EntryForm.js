import React, { useState } from 'react';

function EntryForm({ onAddEntry }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageType, setImageType] = useState('file'); // 'file' or 'url'
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageSource, setImageSource] = useState('');

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageFile(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      const image = imageType === 'file' ? imageFile : imageUrl;
      onAddEntry({ title, content, image, imageSource });
      setTitle('');
      setContent('');
      setImageType('file');
      setImageFile(null);
      setImageUrl('');
      setImageSource('');
    }
  };

  return (
    <section id="add-entry" className="entry-form-section">
      <h2>Add New Entry</h2>
      <form onSubmit={handleSubmit} className="entry-form">
        <input
          type="text"
          placeholder="Entry Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="image-input-group">
          <label>
            <input
              type="radio"
              value="file"
              checked={imageType === 'file'}
              onChange={(e) => setImageType(e.target.value)}
            />
            Upload Image File
          </label>
          <label>
            <input
              type="radio"
              value="url"
              checked={imageType === 'url'}
              onChange={(e) => setImageType(e.target.value)}
            />
            Enter Image URL
          </label>
          {imageType === 'file' ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
            />
          ) : (
            <input
              type="url"
              placeholder="Image URL (e.g., https://example.com/image.jpg)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          )}
        </div>
        <input
          type="text"
          placeholder="Image Source/Reference (optional)"
          value={imageSource}
          onChange={(e) => setImageSource(e.target.value)}
        />
        {(imageFile || imageUrl) && (
          <img src={imageFile || imageUrl} alt="Preview" className="image-preview" />
        )}
        <button type="submit">Add Entry</button>
      </form>
    </section>
  );
}

export default EntryForm;