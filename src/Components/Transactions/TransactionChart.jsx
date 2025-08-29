import { useQuery } from "@tanstack/react-query";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import React, { useMemo, useState } from "react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { listTransactionsAPI } from "../../services/transactions/transactionService";
import { motion } from "framer-motion";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

const TransactionChart = ({ filters }) => {
  const { data: transactions } = useQuery({
    queryKey: ["list-transactions", filters],
    queryFn: () => listTransactionsAPI(filters),
  });

  const [chartType, setChartType] = useState("donut");
  const types = ["donut", "bar", "line"];
  const labelsMap = { donut: "Donut", bar: "Bar", line: "Line" };

  // Safe totals
  const totals = useMemo(() => {
    const base = { income: 0, expense: 0 };
    return (transactions ?? []).reduce((acc, t) => {
      if (t?.type === "income") acc.income += Number(t?.amount) || 0;
      else acc.expense += Number(t?.amount) || 0;
      return acc;
    }, base);
  }, [transactions]);

  const income = Number(totals.income) || 0;
  const expense = Number(totals.expense) || 0;

  // Donut & Bar
  const donutData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [income, expense],
        backgroundColor: ["#FCD34D", "#E07A00"],
        borderColor: ["#FCD34D", "#E07A00"],
        borderWidth: 1,
        hoverOffset: 6,
      },
    ],
  };

  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [income, expense],
        backgroundColor: ["#FCD34D", "#E07A00"],
        borderColor: ["#FCD34D", "#E07A00"],
        borderWidth: 1,
      },
    ],
  };

  // Line chart
  const lineData = useMemo(() => {
    if (!transactions) return { labels: [], datasets: [] };

    const grouped = {};

    transactions.forEach((t) => {
      const date = new Date(t.date);
      const key = date.toISOString().split("T")[0]; // YYYY-MM-DD for sorting

      if (!grouped[key]) grouped[key] = { income: 0, expense: 0 };
      if (t.type === "income") grouped[key].income += Number(t.amount) || 0;
      else if (t.type === "expense") grouped[key].expense += Number(t.amount) || 0;
    });

    const sortedKeys = Object.keys(grouped).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    const labels = sortedKeys.map((d) =>
      new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );

    const incomeData = sortedKeys.map((d) => grouped[d].income);
    const expenseData = sortedKeys.map((d) => grouped[d].expense);

    return {
      labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          borderColor: "#FCD34D",
          backgroundColor: "#FCD34D",
          tension: 0.4,
          fill: false,
        },
        {
          label: "Expense",
          data: expenseData,
          borderColor: "#E07A00",
          backgroundColor: "#E07A00",
          tension: 0.4,
          fill: false,
        },
      ],
    };
  }, [transactions]);

  // Common title
  const commonTitle = {
    display: true,
    text: "Income vs Expense",
    color: "#92400E",
    font: { size: 18, weight: "bold" },
    padding: { top: 10, bottom: 30 },
  };

  const donutOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { padding: 25, boxWidth: 12, font: { size: 14 }, color: "#92400E" },
      },
      title: commonTitle,
    },
    cutOut: "70%",
  };

  const barOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: commonTitle,
    },
    scales: { x: { beginAtZero: true } },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { font: { size: 14 }, color: "#92400E" } },
      title: commonTitle,
    },
    scales: {
      x: { 
        title: { display: true, text: "Date" },
        ticks: {
          callback: function(value) {
            return this.getLabelForValue(value);
          },
          maxRotation: 0,
          autoSkip: true,
        },
      },
      y: { beginAtZero: true, title: { display: true, text: "Amount" } },
    },
  };

  return (
    <div className="relative min-h-screen bg-yellow-100 flex flex-col items-center justify-center px-4 py-8 text-yellow-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#fcd34d_20%,transparent_21%)] [background-size:40px_40px] opacity-20 animate-honeycomb"></div>

      <div className="relative w-full max-w-4xl bg-yellow-50 p-6 rounded-3xl shadow-2xl border border-yellow-400 z-10 flex flex-col items-center">
        <h1 className="text-2xl font-extrabold text-yellow-700 text-center mb-6">
          Transaction Overview
        </h1>

        {/* Chart type toggle */}
        <div className="w-72 mb-6">
          <div className="relative bg-yellow-200 p-1 rounded-full flex gap-1">
            {types.map((type) => {
              const active = chartType === type;
              return (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className="relative flex-1 py-2 rounded-full font-semibold text-center overflow-hidden"
                >
                  {active && (
                    <motion.span
                      layoutId="chartTypePill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-yellow-400 rounded-full shadow-md"
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      active ? "text-yellow-900" : "text-yellow-700"
                    }`}
                  >
                    {labelsMap[type]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-[350px] md:w-[700px] mx-auto">
          {chartType === "donut" && <Doughnut data={donutData} options={donutOptions} />}
          {chartType === "bar" && <Bar data={barData} options={barOptions} />}
          {chartType === "line" && <Line data={lineData} options={lineOptions} />}
        </div>
      </div>

      <style>{`
        @keyframes honeycomb-move {
          0% { background-position: 0 0; }
          50% { background-position: 20px 20px; }
          100% { background-position: 0 0; }
        }
        .animate-honeycomb {
          animation: honeycomb-move 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TransactionChart;