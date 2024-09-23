import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Layout as AntdLayout, notification } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Outlet } from "react-router-dom";
import Routes from "../../../types/routes";
import Logout from "../../../features/auth/components/Logout";

const { Content, Footer } = AntdLayout;

const menuItems = [
    {
        path: Routes.HOME,
        name: 'Repository',
        icon: <HomeOutlined/>,
    }
];

function Dashboard() {
    const contextHolder = notification.useNotification()[1];

    return (
        <ProLayout
            title="Github Admin"
            logo="/github-logo.png"
            menu={{
                request: async () => menuItems,
            }}
            layout="mix"
            fixSiderbar
            fixedHeader
            navTheme="realDark"
            links={[
                <Logout key="logout"/>,
            ]}
        >

            <PageContainer
                header={{
                    title: 'Repository',
                    breadcrumb: {
                        items: [
                            { path: '/repository', breadcrumbName: 'Repository' },
                        ],
                    },
                }}
            >
                <Content style={{ padding: '24px', minHeight: '80vh' }}>
                    {contextHolder}
                    <Outlet/>
                </Content>
            </PageContainer>

            <Footer style={{ textAlign: 'center' }}>
                Github Admin ©2024 Created by Taoufik Ajaanit
            </Footer>
        </ProLayout>
    );
}

export default Dashboard;
