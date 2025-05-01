import React from 'react';
import { Col, Row } from 'antd';

type IncomeComponentProps = {};

const IncomeComponent: React.FC<IncomeComponentProps> = () => {
    return (
        <>
            <Row>
                <Col span={24}>IncomeComponent says hello!</Col>
            </Row>
        </>
    );
};

export default IncomeComponent;
