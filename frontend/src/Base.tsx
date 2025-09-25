import { Outlet } from 'react-router'
import { Layout } from 'antd'
import NavHeader from './infrastructure/components/nav/Header'
import NavFooter from './infrastructure/components/nav/Footer'

const Base = () => {
    return (
        <Layout>
            <NavHeader />
            <Outlet />
            <NavFooter />
        </Layout>
    )
}

export default Base