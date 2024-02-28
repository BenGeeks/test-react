import styles from './monthly.module.css';

const MonthlySummary = ({ monthStart, reportSummary }) => {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return (
    <div className={styles.info_box}>
      <div className={styles.sub_info}>
        <div className={styles.sub_info_set}>
          <div className={styles.sub_info_title}>Month Start: </div>
          <div className={styles.sub_info_value}>{monthStart?.toLocaleString('en', options)}</div>
        </div>
        <div className={styles.sub_info_set}>
          <div className={styles.sub_info_title}>Total Capital: </div>
          <div className={styles.sub_info_value}>{reportSummary?.totalCapital?.toLocaleString('en', options)}</div>
        </div>
        <div className={styles.sub_info_set}>
          <div className={styles.sub_info_title}>Total Withdrawal: </div>
          <div className={styles.sub_info_value}>{reportSummary?.totalWithdrawal?.toLocaleString('en', options)}</div>
        </div>
      </div>

      <div className={styles.sub_info}>
        <div className={styles.sub_info_set}>
          <div className={styles.sub_info_title}>Average Sales: </div>
          <div className={styles.sub_info_value}>
            {reportSummary?.averageSales?.toLocaleString('en', options) === 'NaN'
              ? 0
              : reportSummary?.averageSales?.toLocaleString('en', options)}
          </div>
        </div>
        <div className={styles.sub_info_set}>
          <div className={styles.sub_info_title}>Average Expenses: </div>
          <div className={styles.sub_info_value}>
            {reportSummary?.averageExpenses?.toLocaleString('en', options) === 'NaN'
              ? 0
              : reportSummary?.averageExpenses?.toLocaleString('en', options)}
          </div>
        </div>
        <div className={styles.sub_info_set}>
          <div className={styles.sub_info_title}>Average Profit: </div>
          <div className={styles.sub_info_value}>
            {reportSummary?.averageProfit?.toLocaleString('en', options) === 'NaN'
              ? 0
              : reportSummary?.averageProfit?.toLocaleString('en', options)}
          </div>
        </div>
      </div>

      <div className={styles.sub_info}>
        <div className={styles.sub_info_set}>
          <div className={styles.sub_info_title}>Total Sales: </div>
          <div className={styles.sub_info_value}>{reportSummary?.totalSales?.toLocaleString('en', options)}</div>
        </div>
        <div className={styles.sub_info_set}>
          <div className={styles.sub_info_title}>Total Expenses: </div>
          <div className={styles.sub_info_value}>{reportSummary?.totalExpenses?.toLocaleString('en', options)}</div>
        </div>
        <div className={styles.sub_info_set}>
          <div className={styles.sub_info_title}>Total Profit: </div>
          <div className={styles.sub_info_value}>{reportSummary?.totalProfit?.toLocaleString('en', options)}</div>
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;
