import React from 'react';
import styles from './Notes.module.css';
import logo from '../images/image-removebg-preview 1.png';
import lock from '../images/Vector.png'

export default function Notes() {
  return (
   
    <div className={styles.notes}>
      
      <div className={styles.image}>
        <img src={logo} alt="pic" />
        <h1>Pocket Notes</h1>
        <p>Send and receive messages without keeping your phone online. <br></br> Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
      </div>
      
      <div className={styles.encryption}>
      <img src={lock} alt="lock" />
      <p className={styles.encrypt}>end-to-end encrypted</p>
      </div>
    </div>
   
  );
}


