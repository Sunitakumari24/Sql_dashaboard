import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import "./LineChart.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function LineChart({ data }) {
  const chartData = {
    labels: data.map(d => d.month || d.name),
    datasets: [
      {
        label: "Average Grade",
        data: data.map(d => d.average || d.marks),
        borderColor: '#10b981',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
          gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.15)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBorderWidth: 2,
        pointHoverBorderWidth: 3,
        borderWidth: 3,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          padding: 15,
          font: {
            size: 12,
            weight: '500'
          },
          color: '#64748b',
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#5b4ce6',
        borderWidth: 2,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return ` ${context.dataset.label}: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: '#e2e8f0',
          lineWidth: 1,
          drawBorder: true,
          borderColor: '#cbd5e1',
          borderWidth: 2
        },
        ticks: {
          color: '#64748b',
          padding: 10,
          font: {
            size: 11,
            weight: '500'
          }
        },
        title: {
          display: true,
          text: 'Average Grade',
          color: '#1e293b',
          font: {
            size: 13,
            weight: 'bold'
          },
          padding: 10
        }
      },
      x: {
        grid: {
          display: true,
          color: '#f1f5f9',
          lineWidth: 1,
          drawBorder: true,
          borderColor: '#cbd5e1',
          borderWidth: 2
        },
        ticks: {
          color: '#64748b',
          padding: 10,
          font: {
            size: 10,
            weight: '500'
          },
          maxRotation: 45,
          minRotation: 0
        }
      }
    }
  };

  return (
    <div className="line-chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default LineChart;
