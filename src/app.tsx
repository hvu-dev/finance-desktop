import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

import React, { useEffect, useState } from 'react';
import './index.css';
import {
    BankOutlined,
    BookOutlined,
    PieChartOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { Route, Routes, Link, HashRouter, Navigate } from 'react-router';

// Components
import ExpenseComponent from './components/expense';
import StatisticComponent from './components/statistic';
import SettingComponent from './components/setting';
import BudgetComponent from './components/budget';

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
    getItem(<Link to='/home'>Expenses</Link>, '1', <BookOutlined />),
    getItem(<Link to='/budget'>Budgets</Link>, '2', <BankOutlined />),
    getItem(<Link to='/statistic'>Statistics</Link>, '3', <PieChartOutlined />),
    getItem(<Link to='/setting'>Settings</Link>, '4', <SettingOutlined />),
];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    useEffect(() => {
        // @ts-ignore
        window.settingService
            .getSettings()
            .then((setting) => console.log(setting));
    }, []);
    return (
        <HashRouter>
            <ConfigProvider
                theme={{
                    algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
                }}>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}>
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
                                    path='/budget'
                                    element={<BudgetComponent />}
                                />
                                <Route
                                    path='/statistic'
                                    element={<StatisticComponent />}
                                />
                                <Route
                                    path='/setting'
                                    element={<SettingComponent />}
                                />
                                <Route
                                    path='*'
                                    element={<Navigate to='/home' replace />}
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
