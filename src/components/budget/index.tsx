import React from 'react';
import { Col, Row, Tabs } from 'antd';
import IncomeComponent from './income';
import GoalComponent from './goal';

type BudgetComponentProps = {};

const BudgetComponent: React.FC<BudgetComponentProps> = () => {
    return (
        <>
            <Row>
                <Col span={24}>
                    <Tabs
                        defaultActiveKey='1'
                        items={[
                            {
                                label: 'Incomes',
                                key: '1',
                                children: <IncomeComponent />,
                            },
                            {
                                label: 'Goals',
                                key: '2',
                                children: <GoalComponent />,
                            },
                        ]}
                    />
                </Col>
            </Row>
        </>
    );
};

export default BudgetComponent;
