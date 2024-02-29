import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import moment from 'moment';

import MonthlySummary from './summary';
import MonthlyTopBar from './top-bar';

import { MONTHLY_REPORT_HEADER, MONTHLY_REPORT_HEADER_MOBILE, getReportSummary } from './resources';
import { Loader, Error } from '../../../assets/loader-error';
import apiRequest from '../../../lib/axios';
import Table from '../../../assets/table';

import styles from './monthly.module.css';

const Monthly = ({ date, openMonthlyCalendar }) => {
  const [reportSummary, setReportSummary] = useState({});
  const [monthStart, setMonthStart] = useState({});

  const reportsQuery = useQuery({
    queryKey: ['reports'],
    enabled: !openMonthlyCalendar,
    queryFn: () =>
      apiRequest({ url: `reports/month?date=${date.year}-${moment(date).format('MM')}`, method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => setReportSummary(getReportSummary(data)),
  });

  const startQuery = useQuery({
    queryKey: ['start'],
    enabled: !openMonthlyCalendar,
    queryFn: () => apiRequest({ url: `reports/start?date=${date.year}-${date.month + 1}`, method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => setMonthStart(data.length === 0 ? null : data[0]?.value),
  });

  if (reportsQuery.isLoading || startQuery.isLoading)
    return (
      <div className={styles.page_container}>
        <Loader />
      </div>
    );

  if (reportsQuery.isError || startQuery.isError)
    return (
      <div className={styles.page_container}>
        <Error error={reportsQuery.isError || startQuery.isError} />
      </div>
    );

  return (
    <div className={styles.page_container}>
      <MonthlyTopBar date={date} monthStart={monthStart} reportSummary={reportSummary} />
      <MonthlySummary date={date} monthStart={monthStart} reportSummary={reportSummary} monthStartData={startQuery?.data} />
      <div className={styles.table_box}>
        <Table headers={MONTHLY_REPORT_HEADER} data={reportSummary?.list} enableRowClick={false} alignRight={true} />
      </div>
      <div className={styles.table_box_mobile}>
        <Table headers={MONTHLY_REPORT_HEADER_MOBILE} data={reportSummary?.list} enableRowClick={false} x_small={true} alignRight={true} />
      </div>
    </div>
  );
};

export default Monthly;
