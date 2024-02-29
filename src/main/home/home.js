import React from 'react';

import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.home_container}>
      <div className={styles.title_container}>
        <h2 className={styles.main_title}>WELCOME</h2>
        <p className={styles.description}>Go to REPORTS to check the test project.</p>
      </div>
    </div>
  );
};

export default Home;
