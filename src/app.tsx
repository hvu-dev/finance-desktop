import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

import React, { useState } from 'react';
import './index.css';
import {
    BookOutlined,
    PieChartOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { BrowserRouter, Route, Routes, Link, HashRouter } from 'react-router';

// Components
import ExpenseComponent from './components/expense';
import StatisticComponent from './components/statistic';
import SettingComponent from './components/setting';

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to='/'>Expenses</Link>, '1', <BookOutlined />),
    getItem(<Link to='/statistic'>Statistics</Link>, '2', <PieChartOutlined />),
    getItem(<Link to='/setting'>Settings</Link>, '3', <SettingOutlined />),
];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <HashRouter>
            <ConfigProvider
                theme={{
                    algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
                }}>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        style={siderStyle}
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}>
                        <div className='demo-logo-vertical' />
                        <Menu
                            theme='dark'
                            defaultSelectedKeys={['1']}
                            mode='inline'
                            items={items}
                        />
                    </Sider>
                    <Layout style={{ padding: '12px' }}>
                        <Content>
                            <Routes>
                                <Route
                                    path='/home'
                                    element={<ExpenseComponent />}
                                    index
                                />
                                <Route
                                    path='/statistic'
                                    element={<StatisticComponent />}
                                />
                                <Route
                                    path='/setting'
                                    element={<SettingComponent />}
                                />
                            </Routes>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Personal Finance ©{new Date().getFullYear()} Created
                            by Huy Vu
                        </Footer>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </HashRouter>
    );
};

export default App;

root.render(<App></App>);
