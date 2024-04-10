import "chart.js/auto";
import { Bar } from 'react-chartjs-2';

export default function PaymentChart() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Total debts for each month',
                data: [150, 140, 90, 120, 50, 20, 0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.9)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ height: '400px', width: '600px' }}>
            <Bar data={data} />
        </div>
    );
}