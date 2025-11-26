import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function MoodChart({ moods }) {
  // Create gradient fill for the chart line
  const createGradient = (ctx, area) => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, "rgba(99, 102, 241, 0.1)");
    gradient.addColorStop(0.5, "rgba(99, 102, 241, 0.3)");
    gradient.addColorStop(1, "rgba(99, 102, 241, 0.5)");
    return gradient;
  };

  const data = {
    labels: moods.map((m) =>
      m.date ? new Date(m.date).toLocaleDateString() : ""
    ),
    datasets: [
      {
        label: "Mood History",
        data: moods.map((m) =>
          ["😄 Happy", "😊 Good", "😐 Neutral", "😢 Sad", "😡 Angry"].indexOf(
            m.mood
          )
        ),
        fill: true,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }
          return createGradient(ctx, chartArea);
        },
        borderColor: "rgba(99, 102, 241, 0.8)",
        borderWidth: 3,
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "#fff",
        pointHoverRadius: 7,
        pointRadius: 5,
        pointHoverBorderWidth: 3,
        tension: 0.4,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
        shadowBlur: 15,
        shadowColor: "rgba(99, 102, 241, 0.4)",
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Mood Trend Over Time",
        font: {
          size: 22,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
        color: "#4c51bf",
      },
      tooltip: {
        backgroundColor: "#4c51bf",
        titleFont: { size: 16, weight: "bold" },
        bodyFont: { size: 14 },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const moodsLabels = [
              "😄 Happy",
              "😊 Good",
              "😐 Neutral",
              "😢 Sad",
              "😡 Angry",
            ];
            return "Mood: " + moodsLabels[context.parsed.y];
          },
          title: (context) => {
            return context[0].label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#6b7280",
          maxRotation: 45,
          minRotation: 45,
          maxTicksLimit: 10,
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 4,
        ticks: {
          stepSize: 1,
          color: "#6b7280",
          font: {
            size: 14,
            weight: "bold",
          },
          callback: function (value) {
            return ["😄", "😊", "😐", "😢", "😡"][value];
          },
        },
        grid: {
          borderDash: [6, 8],
          color: "#e0e7ff",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
