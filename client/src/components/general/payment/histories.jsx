import "chart.js/auto";
import { Bar } from 'react-chartjs-2';

export default function PaymentChart({ ...props }) {
    const { label, money, color } = props;

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: label,
                data: money,
                backgroundColor: color,
                borderColor: color,
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