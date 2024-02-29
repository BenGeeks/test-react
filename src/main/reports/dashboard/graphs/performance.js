import { PieChart, Pie, Cell } from 'recharts';

import styles from '../dashboard.module.css';

const PerformancePieGraphWithNeedle = ({ report }) => {
  const RADIAN = Math.PI / 180;
  const data = [
    { name: 'A', value: 5000, color: 'red' },
    { name: 'B', value: 3500, color: '#FF8042' },
    { name: 'C', value: 2500, color: '#FFBB28' },
    { name: 'D', value: 2000, color: '#00C49F' },
    { name: 'E', value: 2000, color: '#0088FE' },
  ];
  const cx = 250;
  const cy = 200;
  const iR = 80;
  const oR = 150;
  const value = report[report?.length - 2]?.movingAverage;

  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path
        key="path"
        d={`M${xba || 0} ${yba || 0}L${xbb || 0} ${ybb || 0} L${xp || 0} ${yp || 0} L${xba || 0} ${yba || 0}`}
        stroke="#none"
        fill={color}
      />,
    ];
  };
  return (
    <div className={styles.graph_container}>
      <h2 className={styles.graph_header}>Weekly Performance Meter</h2>
      <div className={styles.performance_value}>{report[report.length - 2]?.movingAverage}</div>
      <PieChart width={500} height={230}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, '#8884d8')}
      </PieChart>
      <div className={styles.performance_0_label}>0</div>
      <div className={styles.performance_5k_label}>5000</div>
      <div className={styles.performance_8k5_label}>8500</div>
      <div className={styles.performance_11k_label}>11000</div>
      <div className={styles.performance_13k_label}>13000</div>
      <div className={styles.performance_15k_label}>15000</div>
    </div>
  );
};

export default PerformancePieGraphWithNeedle;
