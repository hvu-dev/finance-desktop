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
import {
    CreateExpenseDto,
    Expense,
    UpdateExpenseDto,
} from '../../database/dtos/expense';
import { DATE_FORMAT } from '../const';
import dayjs from 'dayjs';
import { Category } from 'src/database/dtos/category';

enum ExpenseModalMode {
    CREATE,
    UPDATE,
    VIEW,
}

const ExpenseComponent: React.FC = () => {
    // Status states
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUpdateModalVisible, setIsExpenseModalVisible] =
        useState<boolean>(false);
    const [isUpdateModalLoading, setIsUpdateModalLoading] =
        useState<boolean>(false);
    const [updateFormDisabled, setUpdateFormDisabled] =
        useState<boolean>(false);

    // Data states
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [selectedExpense, setSelectedExpense] = useState<Expense>(null);

    const [expenseModalViewMode, setExpenseModalViewMode] =
        useState<ExpenseModalMode>(ExpenseModalMode.VIEW);

    // Text states
    const [modalExpenseText, setExpenseModalText] = useState<string>('');

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

    const createExpense = (): Promise<void> => {
        const createExpenseDto: CreateExpenseDto = {
            ...form.getFieldsValue(),
            title: form.getFieldValue('title'),
            amount: form.getFieldValue('amount'),
            spentDate: form.getFieldValue('spentDate').format(DATE_FORMAT),
            note: form.getFieldValue('note'),
            categoryId: categories.find(
                (element) => element.value === form.getFieldValue('category')
            ).id,
        };

        // @ts-ignore
        return window.expenseService
            .create(createExpenseDto)
            .then((newExpense: Expense) => {
                setExpenses([newExpense, ...expenses]);
            });
    };

    const updateExpense = (record: Expense): Promise<void> => {
        const updateExpenseDto: UpdateExpenseDto = {
            id: record.id,
            title: form.getFieldValue('title'),
            amount: form.getFieldValue('amount'),
            spentDate: form.getFieldValue('spentDate').format(DATE_FORMAT),
            note: form.getFieldValue('note'),
            categoryId: form.getFieldValue('category').id,
        };
        // @ts-ignore
        return window.expenseService
            .update(updateExpenseDto)
            .then((updatedExpense: Expense) => {
                setExpenses(
                    expenses.map((e) =>
                        e.id !== updatedExpense.id ? e : updatedExpense
                    )
                );
            });
    };

    const handleUpdateButtonClick = (record: Expense) => {
        toggleExpenseModalVisibility(record, ExpenseModalMode.UPDATE);
    };

    const handleDeleteButtonClick = (record: Expense) => {};

    const handleExpenseOkButtonClick = (record: Expense) => {
        setIsUpdateModalLoading(true);
        let response: Promise<void> = null;
        if (expenseModalViewMode === ExpenseModalMode.CREATE) {
            response = createExpense();
        } else {
            response = updateExpense(record);
        }

        response.finally(() => {
            hideExpenseModal();
        });
    };

    const hideExpenseModal = () => {
        setIsUpdateModalLoading(false);
        setIsExpenseModalVisible(false);
        setSelectedExpense(null);
    };

    const toggleExpenseModalVisibility = (
        record: Expense,
        mode: ExpenseModalMode = ExpenseModalMode.VIEW
    ) => {
        if (mode === ExpenseModalMode.VIEW) {
            setUpdateFormDisabled(true);
            setExpenseModalText('View');
        } else if (mode === ExpenseModalMode.UPDATE) {
            setUpdateFormDisabled(false);
            setExpenseModalText('Update');
        } else if (mode === ExpenseModalMode.CREATE) {
            setUpdateFormDisabled(false);
            setExpenseModalText('Create');
        }

        if (mode === ExpenseModalMode.CREATE) {
            form.resetFields();
        } else {
            form.setFieldsValue({
                ...record,
                spentDate: dayjs(record.spentDate),
            });
        }

        setExpenseModalViewMode(mode);
        setIsExpenseModalVisible(true);
        setSelectedExpense(record);
    };

    return (
        <>
            <div>
                <Row justify='space-evenly'>
                    <Col span={8}>
                        <Card
                            title='Total amount spent'
                            style={{
                                textAlign: 'center',
                            }}>
                            100.000
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            title='Most spent category'
                            style={{
                                textAlign: 'center',
                            }}>
                            100.000
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            title='Remaining budget'
                            style={{
                                textAlign: 'center',
                            }}>
                            100.000
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Flex gap='small' align='center' justify='flex-end'>
                            <Button>Export to Excel</Button>
                            <Button
                                color='primary'
                                variant='solid'
                                onClick={() =>
                                    toggleExpenseModalVisibility(
                                        null,
                                        ExpenseModalMode.CREATE
                                    )
                                }>
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
                                toggleExpenseModalVisibility(
                                    record,
                                    ExpenseModalMode.VIEW
                                )
                            }></ExpenseTable>
                    </Col>
                </Row>
                {isUpdateModalVisible && (
                    <Modal
                        title={`${modalExpenseText} Expense`}
                        open={isUpdateModalVisible}
                        onOk={() => {
                            handleExpenseOkButtonClick(selectedExpense);
                        }}
                        onCancel={() => setIsExpenseModalVisible(false)}
                        okButtonProps={{
                            style: {
                                display: updateFormDisabled && 'none',
                            },
                            loading: isUpdateModalLoading,
                        }}
                        okText={modalExpenseText}>
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
