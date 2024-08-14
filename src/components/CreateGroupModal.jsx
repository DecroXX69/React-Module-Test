import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import styles from './CreateGroupModal.module.css';

export default function CreateGroupModal({ onClose }) {
  const [groupName, setGroupName] = useState('');
  const [groupColor, setGroupColor] = useState('');

  const handleCreateGroup = () => {
    if (!groupName || !groupColor) return; 

    const newGroup = {
      id: uuidv4(),
      name: groupName,
      color: groupColor,
    };
    onClose(newGroup);
  };

  const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Create New Group</h3>
        <div className={styles.inputGroup}>
          <label htmlFor="groupName" className={styles.label}>Group Name</label>
          <input
            id="groupName"
            type="text"
            placeholder= "Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.colorOptionsGroup}>
          <span className={styles.label}>Choose color</span>
          <div className={styles.colorOptions}>
            {colors.map((color) => (
              <div
                key={color}
                className={styles.colorCircle}
                style={{ backgroundColor: color }}
                onClick={() => setGroupColor(color)}
              />
            ))}
          </div>
        </div>
        <button 
          onClick={handleCreateGroup} 
          className={styles.button} 
          disabled={!groupName || !groupColor}
        >
          Create
        </button>
      </div>
    </div>
  );
}
