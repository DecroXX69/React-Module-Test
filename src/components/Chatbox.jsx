import React, { useState, useEffect } from 'react';
import styles from './Chatbox.module.css';
import sendIcon from '../images/send.png';
import idleIcon from '../images/idle.png';
import dotIcon from '../images/dot.png'; 
import backArrow from '../images/backArrow.png'; 

export default function Chatbox({ group, onBack }) {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem(`notes_${group.id}`)) || [];
    setNotes(savedNotes);
  }, [group.id]);

  const handleSendNote = () => {
    if (note.trim() !== '') {
      const newNotes = [...notes, { text: note, timestamp: new Date() }];
      setNotes(newNotes);
      localStorage.setItem(`notes_${group.id}`, JSON.stringify(newNotes));
      setNote('');
    }
  };

  const formatDate = (date) => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const getInitials = () => {
    return group.name
      .split(' ')
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); 
      handleSendNote();
    }
  };

  return (
    <div className={`${styles.chatbox} ${styles.mobileView}`}>
      {/* Back arrow */}
      <img
        src={backArrow}
        alt="back"
        className={styles.backArrow}
        onClick={onBack}
      />
      <div className={styles.header}>
        <div 
          className={styles.groupIcon} 
          style={{ backgroundColor: group.color }}
        >
          {getInitials()}
        </div>
        <span className={styles.groupName}>{group.name}</span>
      </div>
      <div className={styles.notesArea}>
        {notes.map((note, index) => (
          <div key={index} className={styles.note}>
            {note.text}
            <div className={styles.noteTimestamp}>
              <span>{new Date(note.timestamp).toLocaleDateString()}</span>
              <img src={dotIcon} alt="dot" className={styles.dotIcon} />
              <span>{new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <textarea 
          value={note} 
          onChange={(e) => setNote(e.target.value)} 
          placeholder="Enter your text here..."
          onKeyDown={handleKeyDown} 
        />
        <img 
          src={note.trim() === '' ? idleIcon : sendIcon} 
          alt="send" 
          className={styles.sendIcon} 
          onClick={handleSendNote}
        />
      </div>
    </div>
  );
}
