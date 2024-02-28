import React, { useState } from 'react';
import moment from 'moment';

import Dashboard from './dashboard/dashboard';
import Monthly from './monthly/monthly';
import Daily from './daily/daily';
import IconBar from './icon-bar';

import DatePicker from '../../assets/date-picker';
import DashboarDatePicker from '../../assets/dashboard-date-picker';

const ReportsPage = () => {
  const [openMonthlyCalendar, setOpenMonthlyCalendar] = useState(false);
  const [openDailyCalendar, setOpenDailyCalendar] = useState(false);
  const [openDashboardCalendar, setOpenDashboardCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [date, setDate] = useState({ year: moment().year(), month: moment().month(), day: moment().date() });
  const [addEntry, setAddEntry] = useState(false);

  const [month, setMonth] = useState(moment().month());
  const [quarter, setQuarter] = useState(moment().quarter());
  const [year, setYear] = useState(moment().year());
  const [filterBy, setFilterBy] = useState('year');
  const [filterValue, setFilterValue] = useState(moment().year());

  const setDayDateHandler = (date) => {
    setDate(date);
    setTimeout(() => {
      setOpenDailyCalendar(false);
    }, 10);
  };

  const setMonthDateHandler = (date) => {
    setDate(date);
    setTimeout(() => {
      setOpenMonthlyCalendar(false);
    }, 10);
  };

  const onDashboardFilterSelect = () => {
    filterBy === 'year' && setFilterValue(year);
    filterBy === 'quarter' && setFilterValue(`Q${quarter}_${year}`);
    filterBy === 'month' && setFilterValue(`${month}_${year}`);
    setOpenDashboardCalendar(false);
  };
  return (
    <>
      {openDailyCalendar && (
        <DatePicker
          open={openDailyCalendar}
          close={() => setOpenDailyCalendar(false)}
          onSave={setDayDateHandler}
          defaultDate={date}
          noDay={false}
        />
      )}
      {openMonthlyCalendar && (
        <DatePicker
          open={openMonthlyCalendar}
          close={() => setOpenMonthlyCalendar(false)}
          onSave={setMonthDateHandler}
          defaultDate={date}
          noDay={true}
        />
      )}
      {openDashboardCalendar && (
        <DashboarDatePicker
          open={openDashboardCalendar}
          close={() => setOpenDashboardCalendar(false)}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          filterValue={filterValue}
          month={month}
          setMonth={setMonth}
          quarter={quarter}
          setQuarter={setQuarter}
          year={year}
          setYear={setYear}
          onSave={onDashboardFilterSelect}
        />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard
          filterBy={filterBy}
          filterValue={filterValue}
          year={year}
          quarter={quarter}
          month={month}
          openDashboardCalendar={openDashboardCalendar}
        />
      )}
      {currentPage === 'monthly' && (
        <Monthly date={date} setDate={setDate} openMonthlyCalendar={openMonthlyCalendar} setAddEntry={setAddEntry} addEntry={addEntry} />
      )}
      {currentPage === 'daily' && <Daily date={date} setDate={setDate} openDailyCalendar={openDailyCalendar} />}
      <IconBar
        openDailyCalendar={openDailyCalendar}
        openMonthlyCalendar={openMonthlyCalendar}
        setOpenDashboardCalendar={setOpenDashboardCalendar}
        setOpenDailyCalendar={setOpenDailyCalendar}
        setOpenMonthlyCalendar={setOpenMonthlyCalendar}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setAddEntry={setAddEntry}
      />
    </>
  );
};

export default ReportsPage;
