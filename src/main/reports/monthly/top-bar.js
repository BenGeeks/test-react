import moment from 'moment';

import styles from './monthly.module.css';

const MonthlyTopBar = ({ date, monthStart, reportSummary }) => {
  let total = monthStart + reportSummary?.totalCapital + reportSummary?.totalProfit - reportSummary?.totalWithdrawal;

  return (
    <div className={styles.total_box}>
      <div>{moment(date).format('MMMM YYYY')}</div>
      <div>{total.toLocaleString('en') === 'NaN' ? 0 : total.toLocaleString('en')}</div>
    </div>
  );
};

export default MonthlyTopBar;
