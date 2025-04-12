import React, { useEffect, useState } from 'react';
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
import { CategorySum } from 'src/database/dtos/statistic';

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
};

const weeklyLabels: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];
const monthlyLabels: string[] = ['1st', '2nd', '3rd', '4th'];
const yearlyLabels: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
];

type ChartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
};

const StatisticsComponent: React.FC<StatisticsComponentProps> = ({}) => {
    const [sumByCategory, setSumByCategory] = useState<ChartData>(null);
    const [spendingTrend, setSpendingTrend] = useState<ChartData>(null);

    useEffect(() => {
        Promise.all([
            // @ts-ignore
            window.statisticService.getSumByCategory(),
        ]).then((data) => {
            setSumByCategory(() => transformSumByCategoryData(data[0]));
            setSpendingTrend(() => transformSumByCategoryData(data[0]));
        });
    }, []);

    const transformSumByCategoryData = (data: CategorySum[]): ChartData => {
        let transformedData: number[] = [];
        let labels: string[] = [];
        for (const d of data) {
            labels.push(d.name);
            transformedData.push(d.total);
        }

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Expense Breakdown',
                    data: transformedData,
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
    };

    return (
        <>
            <Row>
                <Col span={16}>
                    <Card
                        style={{ width: '100%' }}
                        title='This week spending trend'>
                        {spendingTrend && (
                            <Line options={options} data={spendingTrend}></Line>
                        )}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        style={{ width: '100%', height: '100%' }}
                        title='All-time expense breakdown'>
                        {sumByCategory && <Doughnut data={sumByCategory} />}
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
