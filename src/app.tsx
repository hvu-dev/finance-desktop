import { createRoot } from 'react-dom/client';

const root = createRoot(document.body);

import React, { useState } from 'react';
import './index.css';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Typography } from 'antd';
import { BrowserRouter, Route, Routes, Link } from 'react-router';
import ExpenseComponent from './components/home';
import StatisticsComponent from './components/statistics';

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

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
    getItem(<Link to='/'>Numbers</Link>, '1', <DesktopOutlined />),
    getItem(
        <Link to='/statistics'>Statistics</Link>,
        '2',
        <PieChartOutlined />
    ),
];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
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
                <Layout>
                    <Content>
                        <Routes>
                            <Route path='/' element={<ExpenseComponent />} />
                            <Route
                                path='/statistics'
                                element={<StatisticsComponent />}
                            />
                        </Routes>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Personal Finance ©{new Date().getFullYear()} Created by
                        Huy Vu
                    </Footer>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
};

export default App;

root.render(<App></App>);
