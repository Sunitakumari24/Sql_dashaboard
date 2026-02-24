import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./BarChart.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ data, title = "Marks", color = 'rgba(91, 76, 230, 0.7)', showSubmissions = false }) {
  const chartData = {
    labels: data.map(s => s.name),
    datasets: [
      {
        label: title,
        data: data.map(s => s.marks),
        backgroundColor: color,
        borderColor: color.replace('0.7', '1'),
        borderWidth: 0,
        borderRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#1e293b'
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.y;
            if (showSubmissions && data[context.dataIndex].submissions) {
              label += ` (${data[context.dataIndex].submissions} submissions)`;
            }
            return label;
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
          font: {
            size: 11,
            weight: '500'
          },
          padding: 8
        },
        title: {
          display: true,
          text: title,
          color: '#1e293b',
          font: {
            size: 13,
            weight: 'bold'
          }
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
          font: {
            size: 10,
            weight: '500'
          },
          padding: 8,
          maxRotation: 45,
          minRotation: 0
        }
      }
    }
  };

  return (
    <div className="bar-chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default BarChart;