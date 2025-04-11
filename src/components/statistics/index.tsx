import React from 'react';
import { Card, Col, Row } from 'antd';
import { Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export type StatisticsComponentProps = {};

export const options = {
    responsive: true,
    plugins: {
        legend: {},
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map((value, index) => index * 100),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map((value, index) => index * 122),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const data2 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const StatisticsComponent: React.FC<StatisticsComponentProps> = ({}) => {
    return (
        <>
            <Row>
                <Col span={16}>
                    <Card
                        style={{ width: '100%' }}
                        title='Spending Trend By Month'>
                        <Line options={options} data={data}></Line>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        style={{ width: '100%', height: '100%' }}
                        title='Expense Breakdown'>
                        <Doughnut data={data2} />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={12}>col-aaaa</Col>
                <Col span={12}>col-12</Col>
            </Row>
        </>
    );
};

export default StatisticsComponent;
