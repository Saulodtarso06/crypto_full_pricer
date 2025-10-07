
import React from 'react';
import { Line } from 'react-chartjs-2';

const CryptoChart = ({ prices }) => {
    const data = {
        labels: prices.map((_, i) => i),
        datasets: [{
            data: prices,
            borderColor: '#007bff',
            borderWidth: 2,
            fill: false,
            tension: 0.3,
        }],
    };

    const options = {
        elements: { point: { radius: 0 } },
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } },
    };

    return <Line data={data} options={options} height={60} />;
};

export default CryptoChart;
