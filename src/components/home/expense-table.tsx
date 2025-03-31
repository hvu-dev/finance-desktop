import React, { useState } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Popconfirm,
    Select,
    Space,
    Table,
    TableProps,
    Tag,
} from 'antd';
import { Expense } from 'src/database/dtos/expense';

const COLOR_TAGS_MAP = {
    food: 'volcano',
    accomodation: 'geekblue',
    books: 'green',
};

export type ExpenseTableProps = {
    data: Expense[];
};

const ExpenseTable: React.FC = ({ data }: ExpenseTableProps) => {
    const [isUpdateModalVisible, setIsUpdateModalVisible] =
        useState<boolean>(false);
    const [updateFormDisabled, setUpdateFormDisabled] =
        useState<boolean>(false);
    const [selectedExpense, setSelectedExpense] = useState<Expense>(null);

    const [form] = Form.useForm();

    const columns: TableProps<Expense>['columns'] = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => (
                <a
                    onClick={() =>
                        toggleExpenseModalVisibility(record, true, true)
                    }>
                    {record.title}
                </a>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Date Spent',
            dataIndex: 'dateSpent',
            key: 'dateSpent',
            render: (value) => {
                return value.toLocaleDateString();
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
                        onClick={() =>
                            toggleExpenseModalVisibility(record, true, false)
                        }
                        color='primary'
                        variant='outlined'>
                        Update
                    </Button>
                    <Popconfirm
                        title='Delete the task'
                        description='Are you sure to delete this task?'
                        okText='Yes'
                        cancelText='No'
                        onConfirm={() => handleDeleteExpense(record)}>
                        <Button color='danger' variant='outlined'>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const toggleExpenseModalVisibility = (
        record: Expense,
        isVisiable: boolean,
        disabledForm: boolean = false
    ) => {
        setUpdateFormDisabled(disabledForm);
        setIsUpdateModalVisible(isVisiable);
        setSelectedExpense(record);
    };

    const handleDeleteExpense = (record: Expense) => {
        console.log('Deleting', record);
    };

    const handleUpdateExpense = (record: Expense) => {
        console.log('Updating', record);
        setIsUpdateModalVisible(false);
        setSelectedExpense(null);
    };

    return (
        <>
            <Table<Expense> columns={columns} dataSource={data} rowKey={'id'} />
            {isUpdateModalVisible && (
                <Modal
                    title='Expense'
                    open={isUpdateModalVisible}
                    onOk={() => handleUpdateExpense(selectedExpense)}
                    onCancel={() => setIsUpdateModalVisible(false)}
                    okButtonProps={{
                        style: { display: updateFormDisabled && 'none' },
                    }}
                    okText='Update'>
                    <Form
                        // {...formItemLayout}
                        form={form}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        layout='horizontal'
                        variant={'filled'}
                        style={{ maxWidth: 600 }}
                        initialValues={{
                            variant: 'filled',
                        }}
                        disabled={updateFormDisabled}>
                        <Form.Item
                            label='Title'
                            name='title'
                            rules={[
                                { required: true, message: 'Please input!' },
                            ]}>
                            <Input defaultValue={selectedExpense.title} />
                        </Form.Item>
                        <Form.Item
                            label='Amount'
                            name='amount'
                            rules={[
                                {
                                    required: true,
                                    message: 'Amount is required',
                                },
                            ]}>
                            <InputNumber
                                defaultValue={selectedExpense.amount}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Category'
                            name='category'
                            rules={[
                                {
                                    required: true,
                                    message: 'Category is required',
                                },
                            ]}>
                            <Select />
                        </Form.Item>
                        <Form.Item
                            label='Date spent'
                            name='dateSpent'
                            rules={[
                                { required: true, message: 'Please input!' },
                            ]}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label='Note' name='TextArea'>
                            <Input.TextArea />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    );
};

export default ExpenseTable;
