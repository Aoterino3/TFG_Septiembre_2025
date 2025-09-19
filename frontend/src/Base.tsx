import { Outlet } from 'react-router'
import { Layout } from 'antd'
import NavHeader from './components/nav/Header'
import NavFooter from './components/nav/Footer'

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