import React, { useEffect, useState } from 'react';
import moment from 'moment';

import styles from './daily.module.css';

import { useQuery } from '@tanstack/react-query';

import { getSalesCount, getSalesSummary, getOtherSalesData, getExpenseSummary, getFinalReportData } from './resources';
import { SUMMARY_HEADER, SALES_COUNT_HEADER, EXPENSES_HEADER } from './resources';
import Table from '../../../assets/table';
import apiRequest from '../../../lib/axios';
import { Loader, Error } from '../../../assets/loader-error';

const Daily = ({ date, setDate, openDailyCalendar }) => {
  const [expensesSummary, setExpenseSummary] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [salesSummary, setSalesSummary] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [finalReportData, setFinalReportData] = useState([]);
  const [otherSalesData, setOtherSalesData] = useState(null);

  useEffect(() => setDate({ year: moment().year(), month: moment().month(), day: moment().date() }), [setDate]);

  const reportsQuery = useQuery({
    queryKey: ['daily'],
    enabled: !openDailyCalendar,
    queryFn: () =>
      apiRequest({
        url: `reports/daily?date=${moment(date).format('YYYY-MM-DD')}`,
        method: 'GET',
      }).then((res) => res.data),
    onSuccess: (data) => {
      setExpenseData(data.expenseList.sort((a, b) => b.total - a.total));
      setExpenseSummary(getExpenseSummary(data.expenseList));
      setSalesSummary(getSalesSummary(data.salesList, date));
      setSalesData(getSalesCount(data.salesList, date));
      setOtherSalesData(getOtherSalesData(data.salesList, date));
    },
  });

  useEffect(() => {
    salesSummary &&
      expensesSummary &&
      otherSalesData &&
      setFinalReportData(getFinalReportData(salesSummary, expensesSummary, otherSalesData));
  }, [salesSummary, expensesSummary, otherSalesData]);

  if (reportsQuery.isLoading)
    return (
      <div className={styles.page_container}>
        <Loader />
      </div>
    );

  if (reportsQuery.isError)
    return (
      <div className={styles.page_container}>
        <Error error={reportsQuery.error} />
      </div>
    );

  return (
    <div className={styles.page_container}>
      <div className={styles.summary_box}>
        <div className={styles.header_box}>
          <h2 className={styles.header}>Sales Report for {moment(date).format('ll')}</h2>
        </div>
        <Table headers={SUMMARY_HEADER} data={finalReportData} />
      </div>
      {salesData?.length !== 0 && (
        <div className={styles.summary_box}>
          <div className={styles.header_box}>
            <h2 className={styles.header}>Sales Summary</h2>
          </div>
          <Table headers={SALES_COUNT_HEADER} data={salesData ? salesData : []} />
        </div>
      )}

      {expenseData?.length !== 0 && (
        <div className={styles.summary_box}>
          <div className={styles.header_box}>
            <h2 className={styles.header}>Expense List</h2>
          </div>
          <Table headers={EXPENSES_HEADER} data={expenseData} />
        </div>
      )}
    </div>
  );
};

export default Daily;
