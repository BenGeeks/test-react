import { BsCalendarDate, BsCalendarMonth } from 'react-icons/bs';
import { AiOutlineDashboard } from 'react-icons/ai';

import styles from './icon-bar.module.css';

const IconBar = ({ setOpenDashboardCalendar, setOpenDailyCalendar, setOpenMonthlyCalendar, currentPage, setCurrentPage, setAddEntry }) => {
  return (
    <div className={styles.icon_bar_container}>
      <div
        className={styles.icon_box}
        title="dashboard"
        onClick={() => (currentPage === 'dashboard' ? setOpenDashboardCalendar(true) : setCurrentPage('dashboard'))}
      >
        <div className={styles.icon}>
          <AiOutlineDashboard />
        </div>
        <p className={styles.icon_text}>Dashboard</p>
      </div>
      <div
        className={styles.icon_box}
        title="daily"
        onClick={() => (currentPage === 'daily' ? setOpenDailyCalendar(true) : setCurrentPage('daily'))}
      >
        <div className={styles.icon}>
          <BsCalendarDate />
        </div>
        <p className={styles.icon_text}>Daily</p>
      </div>
      <div
        className={styles.icon_box}
        title="monthly"
        onClick={() => (currentPage === 'monthly' ? setOpenMonthlyCalendar(true) : setCurrentPage('monthly'))}
      >
        <div className={styles.icon}>
          <BsCalendarMonth />
        </div>
        <p className={styles.icon_text}>Monthly</p>
      </div>
    </div>
  );
};

export default IconBar;
