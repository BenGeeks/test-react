import React from 'react';
import Home from './home/home';
import ReportsPage from './reports/reports';

const Main = ({ currentPage }) => {
  return (
    <>
      {currentPage === 'home' && <Home />}
      {currentPage === 'reports' && <ReportsPage />}
    </>
  );
};

export default Main;
