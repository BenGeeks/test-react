import moment from 'moment';

export const getReportSummary = (data) => {
  let totalSales = 0;
  let totalExpenses = 0;
  let totalCapital = 0;
  let totalWithdrawal = 0;
  let salesCount = 0;

  let list = [];
  data.forEach((item) => {
    item.sales !== 0 && salesCount++;
    totalSales = totalSales + item.sales;
    totalExpenses = totalExpenses + item.expenses;
    totalCapital = totalCapital + item.capital;
    totalWithdrawal = totalWithdrawal + item.withdrawal;
    let profit = item.sales - item.expenses;
    let total = item.sales + item.capital - item.expenses - item.withdrawal;
    list.push({
      _id: item._id,
      date: item.date,
      day: moment(item.date).format('DD'),
      capital: item.capital === 0 ? ' ' : item.capital.toLocaleString('en'),
      withdrawal: item.withdrawal === 0 ? ' ' : item.withdrawal.toLocaleString('en'),
      sales: item.sales === 0 ? ' ' : item.sales.toLocaleString('en'),
      expenses: item.expenses === 0 ? ' ' : item.expenses.toLocaleString('en'),
      profit: profit === 0 ? ' ' : profit.toLocaleString('en'),
      total: total === 0 ? ' ' : total.toLocaleString('en'),
    });
  });

  let totalProfit = totalSales - totalExpenses;
  let averageSales = totalSales / salesCount;
  let averageExpenses = totalExpenses / salesCount;
  let averageProfit = (totalSales - totalExpenses) / salesCount;
  return { totalSales, totalExpenses, totalProfit, averageSales, averageExpenses, averageProfit, totalCapital, totalWithdrawal, list };
};

export const MONTHLY_REPORT_HEADER = [
  { display: 'Date', name: 'day' },
  { display: 'Capital', name: 'capital' },
  { display: 'Withdrawal', name: 'withdrawal' },
  { display: 'Sales', name: 'sales' },
  { display: 'Expenses', name: 'expenses' },
  { display: 'Profit', name: 'profit' },
  { display: 'Total', name: 'total' },
];

export const MONTHLY_REPORT_HEADER_MOBILE = [
  { display: 'D', name: 'day' },
  { display: 'C', name: 'capital' },
  { display: 'W', name: 'withdrawal' },
  { display: 'S', name: 'sales' },
  { display: 'E', name: 'expenses' },
  { display: 'P', name: 'profit' },
  { display: 'T', name: 'total' },
];

export const INPUT = [
  { type: 'date', name: 'date', label: 'Date' },
  { type: 'number', name: 'capital', label: 'Capital' },
  { type: 'number', name: 'withdrawal', label: 'Withdrawal' },
  { type: 'number', name: 'sales', label: 'Sales' },
  { type: 'number', name: 'expenses', label: 'Expenses' },
];
