import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Layout as AntdLayout } from 'antd';
import { Outlet } from "react-router-dom";

const { Content, Footer } = AntdLayout;

function Public() {
    return (
        <ProLayout
            title="Github Admin"
            logo="github-logo.png"
            layout="mix"
            fixedHeader
            navTheme="realDark"
            suppressSiderWhenMenuEmpty={true}
            pageTitleRender={false}
        >

            <PageContainer>
                <Content style={{ padding: '24px', minHeight: '80vh' }}>
                    <Outlet/>
                </Content>
            </PageContainer>

            <Footer style={{ textAlign: 'center' }}>
                Github Admin ©2024 Created by Taoufik Ajaanit
            </Footer>
        </ProLayout>
    );
}

export default Public;
