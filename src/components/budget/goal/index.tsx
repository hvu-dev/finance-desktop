import React from 'react';
import { Col, Row } from 'antd';

type GoalComponentProps = {};

const GoalComponent: React.FC<GoalComponentProps> = () => {
    return (
        <>
            <Row>
                <Col span={24}>GoalComponent says hello!</Col>
            </Row>
        </>
    );
};

export default GoalComponent;
