import React from 'react';
import dayjs from 'dayjs';

import {
    Button,
    Col,
    Pagination,
    Popconfirm,
    Row,
    Space,
    Table,
    TableProps,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { DATE_FORMAT } from '../../const';
import { Income } from '@database/dtos/income';

type IncomeTableComponentProps = {
    data: Income[];
};

const IncomeTableComponent: React.FC<IncomeTableComponentProps> = ({
    data,
}) => {
    const columns: TableProps<Income>['columns'] = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (_, { type }) => {
                return type.name;
            },
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (value) => {
                return value.toLocaleString();
            },
        },
        {
            title: 'Received Date',
            dataIndex: 'receivedDate',
            key: 'id',
            render: (value: Date) => {
                return dayjs(value).format(DATE_FORMAT);
            },
        },
        {
            title: 'Action',
            key: 'action',
            width: '15%',
            render: (_, record) => (
                <Space size='middle'>
                    <Button
                        color='primary'
                        variant='outlined'
                        title='Update expense'>
                        <EditOutlined />
                    </Button>
                    <Popconfirm
                        title='Delete the task'
                        description='Are you sure to delete this task?'
                        okText='Yes'
                        cancelText='No'>
                        <Button
                            color='danger'
                            variant='outlined'
                            title='Delete expense'>
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Table<Income>
                        columns={columns}
                        dataSource={data}
                        rowKey={'id'}
                        pagination={false}
                        bordered
                    />
                </Col>
                <Col span={24}>
                    <Pagination align='end' defaultCurrent={1} />
                </Col>
            </Row>
        </>
    );
};

export default IncomeTableComponent;
