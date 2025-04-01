import React, { CSSProperties, useEffect, useState } from 'react';
import { Button, Card, Col, Flex, Row } from 'antd';
import ExpenseTable from './expense-table';
import { Expense } from '../../database/dtos/expense';

const cardStyle: CSSProperties = {
    textAlign: 'center',
};

const ExpenseComponent: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        // @ts-ignore
        window.expenseService.getAllExpenses().then((response) => {
            setExpenses(response);
            console.log(response);
        });
    }, []);

    return (
        <div>
            <Row justify='space-evenly'>
                <Col span={8}>
                    <Card title='Total amount spent' style={cardStyle}>
                        100.000
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title='Most spent category' style={cardStyle}>
                        100.000
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title='Remaining budget' style={cardStyle}>
                        100.000
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Flex gap='small' align='center' justify='flex-end'>
                        <Button>Export to Excel</Button>
                        <Button color='primary' variant='solid'>
                            Create new
                        </Button>
                    </Flex>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <ExpenseTable data={expenses}></ExpenseTable>
                </Col>
            </Row>
        </div>
    );
};

export default ExpenseComponent;
