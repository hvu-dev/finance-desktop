import React, { useEffect, useState } from 'react';
import {
    Button,
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
import { PlusOutlined } from '@ant-design/icons';

import IncomeTableComponent from '@components/budget/income/income-table';
import { Income } from '@data/dtos/income';

type IncomeComponentProps = {};

const IncomeComponent: React.FC<IncomeComponentProps> = () => {
    const [form] = Form.useForm();
    const [isUpdateModalVisible, setIsUpdateModalVisible] =
        useState<boolean>(false);
    const [modalIncomeText, setModalIncomeText] = useState<string>('Create');
    const [selectedIncome, setSelectedIncome] = useState();
    const [updateFormDisabled, setUpdateFormDisabled] =
        useState<boolean>(false);
    const [isUpdateModalLoading, setIsUpdateModalLoading] =
        useState<boolean>(false);
    const [isCustomPeriodDisabled, setIsCustomPeriodDisabled] =
        useState<boolean>(true);

    const [incomes, setIncomes] = useState<Income[]>([]);
    const [displayIncomes, setDisplayIncomes] = useState<Income[]>([]);

    useEffect(() => {
        Promise.all([
            // @ts-ignore
            window.incomeService.getAllIncomes(),
        ]).then((data) => {
            setIncomes(data[0]);
            setDisplayIncomes(data[0]);
        });
    }, []);

    const onPeriodSelectionChange = (value, option) => {
        const selectedPeriod = value;
        if (selectedPeriod === 'other') {
            setIsCustomPeriodDisabled(false);
        } else {
            setIsCustomPeriodDisabled(true);
        }
    };

    const handleBudgetOkButtonClick = (selectedIncome) => {};

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Row>
                        <Col span={24}>
                            <Flex gap='small' align='center' justify='flex-end'>
                                <Button
                                    color='primary'
                                    variant='solid'
                                    onClick={() =>
                                        setIsUpdateModalVisible(true)
                                    }>
                                    Create new <PlusOutlined />
                                </Button>
                            </Flex>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <IncomeTableComponent data={displayIncomes} />
                </Col>
            </Row>
            {isUpdateModalVisible && (
                <Modal
                    title={`${modalIncomeText} Income`}
                    open={isUpdateModalVisible}
                    onOk={() => {
                        handleBudgetOkButtonClick(selectedIncome);
                    }}
                    onCancel={() => setIsUpdateModalVisible(false)}
                    okButtonProps={{
                        style: {
                            display: updateFormDisabled && 'none',
                        },
                        loading: isUpdateModalLoading,
                    }}
                    okText={modalIncomeText}>
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
                            label='Type'
                            name='type'
                            rules={[
                                {
                                    required: true,
                                    message: 'Type is required',
                                },
                            ]}>
                            <Select options={[]} key={'id'} />
                        </Form.Item>
                        <Form.Item
                            label='Received Date'
                            name='receivedDate'
                            rules={[
                                {
                                    required: true,
                                    message: 'Received date is required',
                                },
                            ]}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label='Period' name='period'>
                            <Select
                                onSelect={onPeriodSelectionChange}
                                options={[
                                    {
                                        id: '1',
                                        value: '0',
                                        label: 'Not regular',
                                    },
                                    { id: '2', value: '7', label: 'Weekly' },
                                    { id: '3', value: '30', label: 'Monthly' },
                                    { id: '4', value: '365', label: 'Yearly' },
                                    {
                                        id: '5',
                                        value: 'other',
                                        label: 'Custom',
                                    },
                                ]}
                                key={'id'}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Custom period'
                            name='customPeriod'
                            hidden={isCustomPeriodDisabled}>
                            <InputNumber
                                style={{ width: '100%' }}
                                disabled={isCustomPeriodDisabled}
                                placeholder='Frequency in days'
                            />
                        </Form.Item>
                        <Form.Item label='Note' name='note'>
                            <Input.TextArea placeholder='Note something important regarding to this income' />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    );
};

export default IncomeComponent;
