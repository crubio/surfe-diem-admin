import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ByStatusCode } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  data: ByStatusCode[];
}

export const ErrorRateChart = ({ data }: Props) => {
  const errors = data.filter((d) => d.status >= 400);

  const chartData = {
    labels: errors.map((d) => `${d.status}`),
    datasets: [
      {
        label: 'Error Count',
        data: errors.map((d) => d.count),
        backgroundColor: errors.map((d) =>
          d.status >= 500 ? 'rgba(239, 68, 68, 0.8)' : 'rgba(245, 158, 11, 0.8)'
        ),
        borderColor: errors.map((d) =>
          d.status >= 500 ? 'rgba(239, 68, 68, 1)' : 'rgba(245, 158, 11, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Error Rate — 4xx / 5xx Responses' },
    },
  };

  return <Bar data={chartData} options={options} />;
};