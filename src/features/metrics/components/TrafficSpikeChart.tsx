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
import { TopPath } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  data: TopPath[];
}

export const TrafficSpikeChart = ({ data }: Props) => {
  const chartData = {
    labels: data.map((d) => d.path),
    datasets: [
      {
        label: 'Request Count',
        data: data.map((d) => d.count),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'y' as const,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Traffic — Requests by Endpoint' },
    },
  };

  return <Bar data={chartData} options={options} />;
};