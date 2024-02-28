import moment from 'moment';

export const getSalesCount = (sales, calendarDate) => {
  let tempArray = [];
  let summary = {};
  sales?.forEach((order) => {
    if (order.isPaid && moment(order.paymentDate).format('YYYY-MM-DD') === moment(calendarDate).format('YYYY-MM-DD')) {
      order.orderDetails.items.forEach((item) => {
        if (summary[item._id]) {
          summary[item._id] = {
            ...item,
            qty: summary[item._id].qty + item.qty,
            subTotal: (summary[item._id].qty + item.qty) * item.price,
          };
        } else {
          summary[item._id] = item;
        }
      });
    }
  });

  let keys = Object.keys(summary);
  keys.forEach((key) => {
    tempArray.push(summary[key]);
  });

  tempArray = tempArray.sort((a, b) => b.subTotal - a.subTotal);
  return tempArray;
};

export const getSalesSummary = (sales, calendarDate) => {
  let downPayment = 0;
  let cash = 0;
  let gCash = 0;
  sales?.forEach((order) => {
    let total = order?.orderDetails?.items?.reduce((total, data) => +data.subTotal + total, 0);
    if (order.isPaid && moment(order.paymentDate).format('YYYY-MM-DD') === moment(calendarDate).format('YYYY-MM-DD')) {
      if (order.isGcash) gCash = gCash + total;
      if (!order.isGcash) cash = cash + total;
    }

    if (order.isDownPayment && moment(order.downPaymentDate).format('YYYY-MM-DD') === moment(calendarDate).format('YYYY-MM-DD')) {
      downPayment = downPayment + order.downPayment;
    }
  });

  let finalData = { cashTotal: cash, gCashTotal: gCash, dpTotal: downPayment, dailyTotal: cash + gCash + downPayment };
  return finalData;
};

export const getOtherSalesData = (sales, date) => {
  let discount = { cash: 0, gcash: 0 };
  let deliveryCharge = { cash: 0, gcash: 0 };
  let downPayment = { cash: 0, gcash: 0 };

  sales.forEach((order) => {
    if (order.isGcash) {
      if (order.downPayment && moment(order.downPaymentDate).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'))
        downPayment = { cash: downPayment.cash, gcash: downPayment.gcash + order.downPayment };
      if (order.discount) discount = { cash: discount.cash, gcash: discount.gcash + order.discount };
      if (order.deliveryCharge) deliveryCharge = { cash: deliveryCharge.cash, gcash: deliveryCharge.gcash + order.deliveryCharge };
    } else {
      if (order.downPayment && moment(order.downPaymentDate).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'))
        downPayment = { gcash: downPayment.gcash, cash: downPayment.cash + order.downPayment };
      if (order.discount) discount = { gcash: discount.gcash, cash: discount.cash + order.discount };
      if (order.deliveryCharge) deliveryCharge = { gcash: deliveryCharge.gcash, cash: deliveryCharge.cash + order.deliveryCharge };
    }
  });

  let otherSalesData = {
    discount: { ...discount, total: discount.cash + discount.gcash },
    deliveryCharge: { ...deliveryCharge, total: deliveryCharge.cash + deliveryCharge.gcash },
    downPayment: { ...downPayment, total: downPayment.cash + downPayment.gcash },
  };
  return otherSalesData;
};

export const getExpenseSummary = (expenses) => {
  let cash = 0;
  let gcash = 0;
  let capital = 0;
  let total = 0;
  expenses?.forEach((expense) => {
    if (expense.source === 'G-cash') gcash = gcash + expense.total;
    if (expense.source === 'Cash') cash = cash + expense.total;
    if (expense.source === 'Capital') capital = capital + expense.total;
    total = total + expense.total;
  });
  return { cash, gcash, capital, total };
};

export const getFinalReportData = (salesSummary, expensesSummary, otherSalesData) => {
  let tempData = [
    {
      source: 'Sales',
      cash: salesSummary?.cashTotal,
      gcash: salesSummary?.gCashTotal,
      capital: 0,
      total: salesSummary?.dailyTotal - otherSalesData?.downPayment?.total,
    },
    {
      source: 'Down Payment',
      cash: otherSalesData?.downPayment?.cash,
      gcash: otherSalesData?.downPayment?.gcash,
      capital: 0,
      total: otherSalesData?.downPayment?.total,
    },
    {
      source: 'Delivery',
      cash: otherSalesData?.deliveryCharge?.cash,
      gcash: otherSalesData?.deliveryCharge?.gcash,
      capital: 0,
      total: otherSalesData?.deliveryCharge?.total,
    },
    {
      source: 'Expenses',
      cash: expensesSummary?.cash,
      gcash: expensesSummary?.gcash,
      capital: expensesSummary?.capital,
      total: expensesSummary?.total - expensesSummary?.capital,
    },
    {
      source: 'Discount',
      cash: otherSalesData?.discount?.cash,
      gcash: otherSalesData?.discount?.gcash,
      capital: 0,
      total: otherSalesData?.discount?.total,
    },
    {
      source: 'Total',
      cash:
        salesSummary?.cashTotal +
        otherSalesData?.downPayment?.cash +
        otherSalesData?.deliveryCharge?.cash -
        expensesSummary?.cash -
        otherSalesData?.discount?.cash,
      gcash:
        salesSummary?.gCashTotal +
        otherSalesData?.downPayment?.gcash +
        otherSalesData?.deliveryCharge?.gcash -
        expensesSummary?.gcash -
        otherSalesData?.discount?.gcash,
      capital: expensesSummary?.capital,
      total:
        salesSummary?.dailyTotal +
        otherSalesData?.deliveryCharge?.total -
        expensesSummary?.total -
        otherSalesData?.discount?.total +
        expensesSummary?.capital,
    },
  ];
  return tempData;
};

export const SUMMARY_HEADER = [
  { display: '', name: 'source' },
  { display: 'Cash', name: 'cash' },
  { display: 'G-cash', name: 'gcash' },
  { display: 'Capital', name: 'capital' },
  { display: 'Total', name: 'total' },
];

export const SALES_COUNT_HEADER = [
  { display: 'Qty', name: 'qty' },
  { display: 'Item', name: 'itemName' },
  { display: 'Size', name: 'size' },
  { display: 'Price', name: 'price' },
  { display: 'Total', name: 'subTotal' },
];

export const EXPENSES_HEADER = [
  { display: 'Source', name: 'source' },
  { display: 'Qty', name: 'qty' },
  { display: 'Item', name: 'item' },
  { display: 'Price', name: 'price' },
  { display: 'Total', name: 'total' },
];
