import React, { useEffect, useRef } from 'react';
import styles from './Sidebar.module.css';

// Updated getInitials function to ensure uppercase
const getInitials = (name) => {
  const names = name.split(' ');
  const initials = names.length > 1
    ? `${names[0][0]}${names[1][0]}`
    : `${names[0][0]}`;
  return initials.toUpperCase(); // Convert initials to uppercase
};

export default function Sidebar({ groups, onSelectGroup, selectedGroup }) {
  const groupListRef = useRef(null);

  useEffect(() => {
    if (groupListRef.current) {
      groupListRef.current.scrollTop = 0; // Ensure scroll starts at the top
    }
  }, []);

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Pocket Notes</h2>
      <div className={styles.groupList} ref={groupListRef}>
        {groups.map((group, index) => (
          <div 
            key={index} 
            className={`${styles.groupItem} ${selectedGroup === group ? styles.selected : ''}`} 
            onClick={() => onSelectGroup(group)}
          >
            <div
              className={styles.groupCircle}
              style={{ backgroundColor: group.color }}
            >
              <span className={styles.initials}>{getInitials(group.name)}</span>
            </div>
            <span className={styles.groupName}>{group.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
