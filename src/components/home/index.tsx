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
import dayjs from 'dayjs';
import { Category } from 'src/database/dtos/category';
import { CategorySum } from 'src/database/dtos/statistic';

enum ExpenseModalMode {
    CREATE,
    UPDATE,
    VIEW,
}

// TODO: replace with useContext and global settings
const expenseTableConfig = {
    pageSize: 10,
};

const ExpenseComponent: React.FC = () => {
    // Status states
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUpdateModalVisible, setIsExpenseModalVisible] =
        useState<boolean>(false);
    const [isUpdateModalLoading, setIsUpdateModalLoading] =
        useState<boolean>(false);
    const [updateFormDisabled, setUpdateFormDisabled] =
        useState<boolean>(false);
    const [loadedPages, setLoadedPages] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Data states
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [displayExpenses, setDisplayExpenses] = useState<Expense[]>([]);

    const [expensesCount, setExpensesCount] = useState<number>(0);

    const [categories, setCategories] = useState<Category[]>([]);

    const [selectedExpense, setSelectedExpense] = useState<Expense>(null);

    const [sumByExpense, setSumByExpense] = useState<number>(0);
    const [sumByCategory, setSumByCategory] = useState<CategorySum[]>([]);

    const [expenseModalViewMode, setExpenseModalViewMode] =
        useState<ExpenseModalMode>(ExpenseModalMode.VIEW);

    // Text states
    const [modalExpenseText, setExpenseModalText] = useState<string>('');

    const [form] = Form.useForm();

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            // @ts-ignore
            window.expenseService.getAllExpenses({
                page: 1,
                pageSize: expenseTableConfig.pageSize,
            }),
            // @ts-ignore
            window.expenseService.countAllExpenses(),
            // @ts-ignore
            window.categoryService.getAllCategories(),
            // @ts-ignore
            window.statisticService.getSumByExpense(),
            // @ts-ignore
            window.statisticService.getSumByCategory(),
        ]).then((data) => {
            setExpenses(data[0]);
            setDisplayExpenses(data[0]);
            setExpensesCount(data[1]);
            setLoadedPages([1]);

            setCategories(data[2]);

            setSumByExpense(data[3]);
            setSumByCategory(data[4]);

            setIsLoading(false);
        });
    }, []);

    const createExpense = (): Promise<void> => {
        const createExpenseDto: CreateExpenseDto = {
            ...form.getFieldsValue(),
            title: form.getFieldValue('title'),
            amount: form.getFieldValue('amount'),
            spentDate: form.getFieldValue('spentDate').toISOString(),
            note: form.getFieldValue('note'),
            categoryId: categories.find(
                (element) => element.value === form.getFieldValue('category')
            ).id,
        };

        // @ts-ignore
        return window.expenseService
            .create(createExpenseDto)
            .then((newExpense: Expense) => {
                setExpenses((prevExpenses) => {
                    const data = [...prevExpenses, newExpense].sort((a, b) =>
                        a.spentDate >= b.spentDate ? -1 : 1
                    );
                    setDisplayExpenses(
                        data.slice(
                            (currentPage - 1) * expenseTableConfig.pageSize,
                            currentPage * expenseTableConfig.pageSize
                        )
                    );
                    return data;
                });
            });
    };

    const updateExpense = (record: Expense): Promise<void> => {
        const updateExpenseDto: UpdateExpenseDto = {
            id: record.id,
            title: form.getFieldValue('title'),
            amount: form.getFieldValue('amount'),
            spentDate: form.getFieldValue('spentDate').toISOString(),
            note: form.getFieldValue('note'),
            categoryId: form.getFieldValue('category').id,
        };
        // @ts-ignore
        return window.expenseService
            .update(updateExpenseDto)
            .then((updatedExpense: Expense) => {
                setExpenses(
                    expenses
                        .map((e) =>
                            e.id !== updatedExpense.id ? e : updatedExpense
                        )
                        .sort((a, b) => (a.spentDate >= b.spentDate ? -1 : 1))
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
        hideExpenseModal();
    };

    const handlePageChangeButtonClick = (page: number): void => {
        if (!loadedPages.includes(page)) {
            // @ts-ignore
            window.expenseService
                .getAllExpenses({
                    page: page,
                    pageSize: expenseTableConfig.pageSize,
                })
                .then((data: Expense[]) => {
                    setExpenses((prevExpenses) => {
                        const newData = [
                            ...prevExpenses.slice(
                                0,
                                expenseTableConfig.pageSize * (page - 1)
                            ),
                            ...data,
                            ...prevExpenses.slice(
                                (page - 1) * expenseTableConfig.pageSize
                            ),
                        ];
                        setDisplayExpenses(() =>
                            newData.slice(
                                (page - 1) * expenseTableConfig.pageSize,
                                page * expenseTableConfig.pageSize
                            )
                        );
                        return newData;
                    });
                    setCurrentPage(page);
                    setLoadedPages([...loadedPages, page]);
                });
        } else {
            setDisplayExpenses(() =>
                expenses.slice(
                    (page - 1) * expenseTableConfig.pageSize,
                    page * expenseTableConfig.pageSize
                )
            );
        }
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
                    <Col span={12}>
                        <Card
                            title='Total amount spent'
                            style={{
                                textAlign: 'center',
                            }}>
                            {sumByExpense}
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card
                            title='Most spent category'
                            style={{
                                textAlign: 'center',
                            }}>
                            {sumByCategory.length > 0
                                ? sumByCategory[0].name
                                : 'None'}
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
                            data={displayExpenses}
                            isLoading={isLoading}
                            onDeleteButtonClick={handleDeleteButtonClick}
                            onChangePage={handlePageChangeButtonClick}
                            onUpdateButtonClick={handleUpdateButtonClick}
                            onTitleClick={(record: Expense) =>
                                toggleExpenseModalVisibility(
                                    record,
                                    ExpenseModalMode.VIEW
                                )
                            }
                            pageSize={expenseTableConfig.pageSize}
                            totalSize={expensesCount}></ExpenseTable>
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
                                <DatePicker />
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
