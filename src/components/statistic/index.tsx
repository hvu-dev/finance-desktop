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

export type StatisticComponentProps = {};

export const options = {
    responsive: true,
};

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

const StatisticComponent: React.FC<StatisticComponentProps> = ({}) => {
    const [sumByCategory, setSumByCategory] = useState<ChartData>(null);
    const [spendingTrend, setSpendingTrend] = useState<ChartData>(null);

    useEffect(() => {
        Promise.all([
            // @ts-ignore
            window.statisticService.getSumByCategory(),
            // @ts-ignore
            // TODO: make this configurable
            window.statisticService.getSumExpenseByPeriod(7),
        ]).then((data) => {
            setSumByCategory(() =>
                transformReportData(
                    data[0],
                    'Expense Break Down',
                    'name',
                    'total'
                )
            );
            setSpendingTrend(() =>
                transformReportData(
                    data[1],
                    'Spending Trend',
                    'spentDate',
                    'total'
                )
            );
        });
    }, []);

    const transformReportData = (
        data: any,
        label: string,
        labelsName: string,
        valueName: string
    ) => {
        let transformedData: number[] = [];
        let labels: string[] = [];
        for (const d of data) {
            labels.push(d[labelsName]);
            transformedData.push(d[valueName]);
        }

        return {
            labels: labels,
            datasets: [
                {
                    label: label,
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
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Row gutter={16}>
                        <Col span={16}>
                            <Card
                                style={{ width: '100%' }}
                                // TODO: make this number configurable
                                title='Current 7 days spending'>
                                {spendingTrend && (
                                    <Line
                                        options={options}
                                        data={spendingTrend}></Line>
                                )}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                style={{ width: '100%', height: '100%' }}
                                title='All-time expense breakdown'>
                                {sumByCategory && (
                                    <Doughnut data={sumByCategory} />
                                )}
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={16}>
                        <Col span={12}>Budget</Col>
                        <Col span={12}>Your Goals</Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default StatisticComponent;
