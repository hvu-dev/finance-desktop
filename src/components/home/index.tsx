import React, { CSSProperties, useEffect, useState } from 'react';
import {
    Button,
    Card,
    Col,
    DatePicker,
    Flex,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
} from 'antd';
import ExpenseTable from './expense-table';
import { CreateExpenseDto, Expense } from '../../database/dtos/expense';
import { DATE_FORMAT } from '../const';
import dayjs from 'dayjs';
import { Category } from 'src/database/dtos/category';

const cardStyle: CSSProperties = {
    textAlign: 'center',
};

const ExpenseComponent: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] =
        useState<boolean>(false);
    const [isUpdateModalLoading, setIsUpdateModalLoading] =
        useState<boolean>(false);
    const [updateFormDisabled, setUpdateFormDisabled] =
        useState<boolean>(false);
    const [selectedExpense, setSelectedExpense] = useState<Expense>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    const [form] = Form.useForm();

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            // @ts-ignore
            window.expenseService.getAllExpenses(),
            // @ts-ignore
            window.categoryService.getAllCategories(),
        ]).then((data) => {
            setExpenses(data[0]);
            setCategories(data[1]);
            setIsLoading(false);
        });
    }, []);

    const updateExpense = (record: Expense) => {
        setIsUpdateModalLoading(true);

        const updateExpenseDto: CreateExpenseDto = {
            id: record.id,
            title: form.getFieldValue('title'),
            amount: form.getFieldValue('amount'),
            spentDate: form.getFieldValue('spentDate').format(DATE_FORMAT),
            note: form.getFieldValue('note'),
            categoryId: form.getFieldValue('category').id,
        };
        // @ts-ignore
        window.expenseService
            .update(updateExpenseDto)
            .then((updatedExpense: Expense) => {
                setExpenses(
                    expenses.map((e) =>
                        e.id !== updatedExpense.id ? e : updatedExpense
                    )
                );
                setTimeout(() => {
                    setIsUpdateModalLoading(false);
                    setIsUpdateModalVisible(false);
                    setSelectedExpense(null);
                }, 5000);
            });
    };

    const handleUpdateButtonClick = (record: Expense) => {
        toggleExpenseModalVisibility(record, true, false);
    };

    const handleDeleteButtonClick = (record: Expense) => {};

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

    return (
        <>
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
                        <ExpenseTable
                            data={expenses}
                            isLoading={isLoading}
                            onUpdateButtonClick={handleUpdateButtonClick}
                            onDeleteButtonClick={handleDeleteButtonClick}
                            onTitleClick={(record: Expense) =>
                                toggleExpenseModalVisibility(record, true, true)
                            }></ExpenseTable>
                    </Col>
                </Row>
                {isUpdateModalVisible && (
                    <Modal
                        title='Expense'
                        open={isUpdateModalVisible}
                        onOk={() => updateExpense(selectedExpense)}
                        onCancel={() => setIsUpdateModalVisible(false)}
                        okButtonProps={{
                            style: {
                                display: updateFormDisabled && 'none',
                            },
                            loading: isUpdateModalLoading,
                        }}
                        okText='Update'>
                        <Form
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
                                <InputNumber style={{ width: '100%' }} />
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
                                <Select options={categories} key={'id'} />
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
                                <Input.TextArea />
                            </Form.Item>
                        </Form>
                    </Modal>
                )}
            </div>
        </>
    );
};

export default ExpenseComponent;
