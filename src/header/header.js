import { NAVS } from './resources';

import styles from './header.module.css';

const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <div className={styles.header_container}>
      <h1 className={styles.company_name}>Ben's Test App</h1>
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
