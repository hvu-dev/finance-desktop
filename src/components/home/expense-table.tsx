import React, { useEffect, useState } from 'react';
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
import dayjs from 'dayjs';
import { Category } from 'src/database/dtos/category';
import { DATE_FORMAT } from '../const';

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

    const [categories, setCategories] = useState<Category[]>([]);

    const [form] = Form.useForm();

    useEffect(() => {
        // @ts-ignore
        window.categoryService.getAllCategories().then((response) => {
            setCategories(response);
        });
    }, []);

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
        form.setFieldsValue({ ...record, spentDate: dayjs(record.spentDate) });
    };

    const handleDeleteExpense = (record: Expense) => {
        console.log('Deleting', record);
    };

    const handleUpdateExpense = (record: Expense) => {
        const data = form.getFieldsValue();
        data.spentDate = data.spentDate.format(DATE_FORMAT);

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
                                {
                                    required: true,
                                    message: 'Title is required',
                                },
                            ]}>
                            <Input />
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
                            <Select
                                defaultValue={selectedExpense.category.value}
                                options={categories}
                                key={'id'}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Date spent'
                            name='spentDate'
                            rules={[
                                {
                                    required: true,
                                    message: 'Date spent is required',
                                },
                            ]}>
                            <DatePicker format={DATE_FORMAT} />
                        </Form.Item>
                        <Form.Item label='Note' name='note'>
                            <Input.TextArea
                                defaultValue={selectedExpense.note}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    );
};

export default ExpenseTable;
