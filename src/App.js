import Header from './header/header';
import Main from './main/main';
import Footer from './footer/footer';
import { useState } from 'react';
import styles from './App.module.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  return (
    <div className={styles.main_container}>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Main currentPage={currentPage} />
      <Footer />
    </div>
  );
}

export default App;
