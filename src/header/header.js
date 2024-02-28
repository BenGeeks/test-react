import React from 'react';
import { NAVS } from './resources';
import styles from './header.module.css';

const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <div className={styles.header_container}>
      <h2>My Test App</h2>
      <nav>
        <ul className={styles.main_link_container}>
          {NAVS.map((nav) => {
            return (
              <li
                key={nav}
                className={currentPage === nav ? styles.main_link_active : styles.main_link}
                onClick={() => setCurrentPage(nav)}
              >
                {nav}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
