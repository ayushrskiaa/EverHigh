import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Aug 1", orders: 30, revenue: 450, category: "Men", size: "M", payment: "Card" },
  { date: "Aug 2", orders: 45, revenue: 700, category: "Women", size: "L", payment: "UPI" },
  { date: "Aug 3", orders: 25, revenue: 400, category: "Kids", size: "S", payment: "Card" },
  { date: "Aug 4", orders: 60, revenue: 950, category: "Men", size: "XL", payment: "Cash" },
  { date: "Aug 5", orders: 40, revenue: 620, category: "Women", size: "M", payment: "Card" },
  { date: "Aug 6", orders: 55, revenue: 880, category: "Men", size: "L", payment: "UPI" },
  { date: "Aug 7", orders: 20, revenue: 300, category: "Kids", size: "S", payment: "Card" },
  { date: "Aug 8", orders: 35, revenue: 500, category: "Women", size: "M", payment: "Cash" },
  { date: "Aug 9", orders: 50, revenue: 760, category: "Men", size: "XL", payment: "Card" },
  { date: "Aug 10", orders: 65, revenue: 1100, category: "Women", size: "L", payment: "UPI" },
];

// Aggregations
const categoryData = [
  { category: "Men", revenue: data.filter(d => d.category === "Men").reduce((a, b) => a + b.revenue, 0) },
  { category: "Women", revenue: data.filter(d => d.category === "Women").reduce((a, b) => a + b.revenue, 0) },
  { category: "Kids", revenue: data.filter(d => d.category === "Kids").reduce((a, b) => a + b.revenue, 0) },
];

const paymentData = [
  { method: "Card", value: data.filter(d => d.payment === "Card").length },
  { method: "UPI", value: data.filter(d => d.payment === "PayPal").length },
  { method: "Cash", value: data.filter(d => d.payment === "Cash").length },
];

const sizeData = [
  { size: "S", value: data.filter(d => d.size === "S").length },
  { size: "M", value: data.filter(d => d.size === "M").length },
  { size: "L", value: data.filter(d => d.size === "L").length },
  { size: "XL", value: data.filter(d => d.size === "XL").length },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Analytics = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Analytics</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Orders Over Time */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Orders Over Time</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue by Category */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Revenue by Category</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={categoryData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Payment Methods</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={paymentData} dataKey="value" nameKey="method" cx="50%" cy="50%" outerRadius={80} label>
              {paymentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="revenue" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Size Distribution */}
      <div className="bg-white rounded-xl shadow p-6 md:col-span-2">
        <h2 className="font-semibold mb-4">Size Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius={90} data={sizeData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="size" />
            <PolarRadiusAxis />
            <Radar dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default Analytics;
