import { Button, Col, Form, Row, Switch, Typography } from 'antd';
const { Title } = Typography;
type AppearanceComponentProps = {};

const AppearanceComponent: React.FC<AppearanceComponentProps> = (props) => {
    const [form] = Form.useForm();

    return (
        <>
            <Form form={form}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Row>
                                    <Title level={5} style={{ margin: 0 }}>
                                        Enable Dark Theme
                                    </Title>
                                </Row>
                                <Row>
                                    <Switch defaultChecked />
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row justify='end'>
                    <Button color='primary' variant='solid'>
                        Save
                    </Button>
                </Row>
            </Form>
        </>
    );
};

export default AppearanceComponent;
