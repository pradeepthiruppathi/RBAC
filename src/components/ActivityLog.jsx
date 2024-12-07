import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import '../styles/activity.css';

const data = [
  { name: 'Monday', Logins: 35, Uploads: 20, Updates: 10 },
  { name: 'Tuesday', Logins: 40, Uploads: 15, Updates: 12 },
  { name: 'Wednesday', Logins: 45, Uploads: 25, Updates: 18 },
  { name: 'Thursday', Logins: 50, Uploads: 30, Updates: 22 },
  { name: 'Friday', Logins: 60, Uploads: 40, Updates: 28 },
  { name: 'Saturday', Logins: 70, Uploads: 45, Updates: 30 },
  { name: 'Sunday', Logins: 80, Uploads: 50, Updates: 35 },
];

function ActivityLog() {
  return (
    <div className="activity-log-container">
      <h3>Activity Log</h3>

      <div className="chart-row"> {/* This is the flex container */}
        <div className="chart-container">
          <BarChart width={400} height={200} data={data} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Logins" stackId="a" fill="#8884d8" />
            <Bar dataKey="Uploads" stackId="a" fill="#82ca9d" />
          </BarChart>
        </div>

        <div className="chart-container">
          <LineChart width={400} height={200} data={data} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Updates" stroke="#ff7300" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default ActivityLog;
