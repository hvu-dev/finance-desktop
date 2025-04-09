import React from 'react';
import {
    Button,
    Pagination,
    Popconfirm,
    Space,
    Table,
    TableProps,
    Tag,
} from 'antd';
import { Expense } from 'src/database/dtos/expense';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../const';

const COLOR_TAGS_MAP = {
    food: 'volcano',
    accomodation: 'geekblue',
    books: 'green',
};

export type ExpenseTableProps = {
    data: Expense[];
    isLoading: boolean;
    onChangePage: Function;
    onDeleteButtonClick: Function;
    onTitleClick: Function;
    onUpdateButtonClick: Function;
};

const ExpenseTable: React.FC<ExpenseTableProps> = ({
    data,
    onChangePage,
    onDeleteButtonClick,
    onUpdateButtonClick,
    onTitleClick,
    isLoading,
}) => {
    const columns: TableProps<Expense>['columns'] = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => (
                <a onClick={() => onTitleClick(record)}>{record.title}</a>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Spent Date',
            dataIndex: 'spentDate',
            key: 'spentDate',
            render: (value: Date) => {
                return dayjs(value).format(DATE_FORMAT);
            },
        },
        {
            title: 'Category',
            key: 'category',
            dataIndex: 'category',
            render: (_, { category }) => {
                return (
                    <>
                        <Tag
                            color={COLOR_TAGS_MAP[category.value.toLowerCase()]}
                            key={category.id}>
                            {category.name.toUpperCase()}
                        </Tag>
                    </>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Button
                        onClick={() => onUpdateButtonClick(record)}
                        color='primary'
                        variant='outlined'>
                        Update
                    </Button>
                    <Popconfirm
                        title='Delete the task'
                        description='Are you sure to delete this task?'
                        okText='Yes'
                        cancelText='No'
                        onConfirm={() => onDeleteButtonClick(record)}>
                        <Button color='danger' variant='outlined'>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table<Expense>
                loading={isLoading}
                columns={columns}
                dataSource={data}
                rowKey={'id'}
                pagination={false}
            />
            <Pagination
                align='end'
                defaultCurrent={1}
                total={50}
                onChange={(page, _) => onChangePage(page)}
            />
        </>
    );
};

export default ExpenseTable;
