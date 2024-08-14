import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Chatbox from './Chatbox';
import CreateGroupModal from './CreateGroupModal';
import Notes from './Notes';
import styles from './Container.module.css';

export default function Container() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check initial screen width

  // Load groups from local storage when component mounts
  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(savedGroups);
  }, []);

  // Save groups to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  // Update the mobile view state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (newGroup) => {
    if (newGroup) {
      // Add new group to the list
      const updatedGroups = [...groups, newGroup];
      setGroups(updatedGroups);
      setSelectedGroup(newGroup); // Select the newly created group
    }
    setIsModalOpen(false);
  };

  const handleBack = () => {
    setSelectedGroup(null);
  };

  return (
    <div className={styles.container}>
      {isMobile && selectedGroup === null && (
        <Sidebar groups={groups} onSelectGroup={setSelectedGroup} selectedGroup={selectedGroup} />
      )}
      {isMobile && selectedGroup && (
        <div className={styles.mobileView}>
          <Chatbox group={selectedGroup} onBack={handleBack} />
        </div>
      )}
      {!isMobile && (
        <>
          <Sidebar groups={groups} onSelectGroup={setSelectedGroup} selectedGroup={selectedGroup} />
          {selectedGroup ? <Chatbox group={selectedGroup} /> : <Notes />}
        </>
      )}
      <button className={styles.fab} onClick={handleOpenModal}>+</button>
      {isModalOpen && <CreateGroupModal onClose={handleCloseModal} />}
    </div>
  );
}
