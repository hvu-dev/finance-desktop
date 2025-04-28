import { Col, Row, Switch, Tabs, TabsProps, Typography } from 'antd';
import { ProductOutlined, ProfileOutlined } from '@ant-design/icons';
import AppearanceComponent from './appearance';
const { Title } = Typography;
type SettingComponentProps = {};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Appearance',
        children: <AppearanceComponent />,
        icon: <ProductOutlined />,
    },
    {
        key: '2',
        label: 'Data',
        children: 'Content of Tab Pane 2',
        icon: <ProfileOutlined />,
    },
];

const SettingComponent: React.FC<SettingComponentProps> = () => {
    return (
        <>
            <Tabs defaultActiveKey='1' items={items} />
        </>
    );
};

export default SettingComponent;
