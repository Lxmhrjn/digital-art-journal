import React, { useState, useEffect } from 'react';

const practices = [
  {
    name: 'Anatomy Study',
    image: 'https://i.pinimg.com/736x/fe/fc/23/fefc23151599bf23c49b7159d8417678.jpg',
    pinterest: 'https://www.pinterest.com/search/pins/?q=anatomy%20drawing'
  },
  {
    name: 'Perspective Drawing',
    image: 'https://i.pinimg.com/1200x/d8/46/89/d8468932c4c109a012af1f366424461b.jpg',
    pinterest: 'https://www.pinterest.com/search/pins/?q=perspective%20drawing'
  },
  {
    name: 'Gesture Sketches',
    image: 'https://i.pinimg.com/736x/ee/90/9e/ee909e6cc5aa096a687be4fa01f69c8f.jpg',
    pinterest: 'https://www.pinterest.com/search/pins/?q=gesture%20sketches'
  },
  {
    name: 'Color Theory',
    image: 'https://i.pinimg.com/736x/05/f6/99/05f699c488c301a40469d7ce53ae9519.jpg',
    pinterest: 'https://www.pinterest.com/search/pins/?q=color%20theory%20art'
  },
  {
    name: 'Composition',
    image: 'https://picsum.photos/200/150?random=5',
    pinterest: 'https://www.pinterest.com/search/pins/?q=art%20composition'
  },
  {
    name: 'Value Studies',
    image: 'https://i.pinimg.com/1200x/a0/e6/a9/a0e6a964736dc214b23c7a8f66a97e35.jpg',
    pinterest: 'https://www.pinterest.com/search/pins/?q=value%20studies%20art'
  },
  {
    name: 'Sketching Warm-ups',
    image: 'https://picsum.photos/200/150?random=7',
    pinterest: 'https://www.pinterest.com/search/pins/?q=sketching%20warm%20ups'
  }
];

function Checklist() {
  const [checkedItems, setCheckedItems] = useState({});
  const [lastReset, setLastReset] = useState('');
  const [hasAlerted, setHasAlerted] = useState(false); // Track if alert has been shown today

  // Load checklist from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('artChecklist')) || {};
    const today = new Date().toDateString();
    if (saved.lastReset !== today) {
      // Reset if it's a new day
      setCheckedItems({});
      setLastReset(today);
      setHasAlerted(false);
      localStorage.setItem('artChecklist', JSON.stringify({ checked: {}, lastReset: today, hasAlerted: false }));
    } else {
      setCheckedItems(saved.checked || {});
      setLastReset(saved.lastReset);
      setHasAlerted(saved.hasAlerted || false);
    }
  }, []);

  // Save to localStorage whenever checkedItems or hasAlerted change
  useEffect(() => {
    localStorage.setItem('artChecklist', JSON.stringify({ checked: checkedItems, lastReset, hasAlerted }));
  }, [checkedItems, lastReset, hasAlerted]);

  const handleCheck = (practice) => {
    setCheckedItems(prev => {
      const updated = { ...prev, [practice]: !prev[practice] };
      // Check if all are completed and alert hasn't been shown yet
      const allCompleted = practices.every(p => updated[p.name]);
      if (allCompleted && !hasAlerted) {
        alert("Congratulations! You've completed your daily art practice checklist!");
        setHasAlerted(true);
      }
      return updated;
    });
  };

  const resetChecklist = () => {
    setCheckedItems({});
    setHasAlerted(false);
    const today = new Date().toDateString();
    setLastReset(today);
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <section className="checklist-section">
      <h2>Daily Art Practice Checklist</h2>
      <p>Track your progress today! ({completedCount}/{practices.length} completed)</p>
      <div className="checklist">
        {practices.map(practice => (
          <div key={practice.name} className="checklist-item">
            <label>
              <input
                type="checkbox"
                checked={checkedItems[practice.name] || false}
                onChange={() => handleCheck(practice.name)}
              />
              <span className="checkmark"></span>
              {practice.name}
            </label>
            <div className="example-ref">
              <img src={practice.image} alt={`${practice.name} example`} className="example-image" />
              <a href={practice.pinterest} target="_blank" rel="noopener noreferrer" className="pinterest-link">
                View on Pinterest
              </a>
            </div>
          </div>
        ))}
      </div>
      <button onClick={resetChecklist} className="reset-btn">Reset Today</button>
    </section>
  );
}

export default Checklist;