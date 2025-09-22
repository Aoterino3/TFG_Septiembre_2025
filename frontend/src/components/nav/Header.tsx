import { Header } from 'antd/es/layout/layout';
import { Flex, Image } from 'antd';
import { logoUNED } from '../../assets/images'

const NavHeader = () => {
    return (
        <Header style={{ display: 'flex', color: '#FFF', height: '94px', lineHeight: '120px', fontSize: '64pt' }} >
            <Flex justify="space-between" align="center" style={{width: '100%'}}>
                <span>teacher.ai</span>
                <Image src={logoUNED} alt="Logo" style={{ marginLeft: '16px' }} preview={false} />
            </Flex>
        </Header>
    )
}

export default NavHeader