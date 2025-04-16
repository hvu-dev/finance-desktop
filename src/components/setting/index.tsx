import { Col, Row, Switch, Typography } from 'antd';
const { Title } = Typography;
type SettingComponentProps = {};

const SettingComponent: React.FC<SettingComponentProps> = () => {
    return (
        <>
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
        </>
    );
};

export default SettingComponent;
