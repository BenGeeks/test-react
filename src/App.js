import { useState } from 'react';

import Header from './header/header';
import Footer from './footer/footer';
import Main from './main/main';

import styles from './App.module.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className={styles.main_container}>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className={styles.page_container}>
        <Main currentPage={currentPage} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
