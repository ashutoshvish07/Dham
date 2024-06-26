import React, { useEffect, useState } from 'react';
import { Layout, Menu, Row, Col, Button, Dropdown, Flex, Typography, Divider, theme, Drawer } from 'antd';
import { UserOutlined, GlobalOutlined, MenuOutlined } from '@ant-design/icons';
import { FaUsers } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { AiOutlineSolution } from "react-icons/ai";
import { ImMenu } from "react-icons/im";


import { PiBuildingApartmentFill } from "react-icons/pi";

import "./UserHeader.css"
const { Header } = Layout;
const { Text } = Typography
const AppHeader = () => {

    const { token } = theme.useToken()
    const [isMobile, setIsMobile] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Check initial window size

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const menu = (
        <Menu>
            <Menu.Item key="1">English</Menu.Item>
            <Menu.Item key="2">Spanish</Menu.Item>
            {/* Add more languages as needed */}
        </Menu>
    );

    const renderMenu = () => (
        <>
            <Col xs={24} sm={24} md={4}>
                <Flex horizontal align='center' justify='center'>
                    <div>
                        <FaUsers style={{ color: token.colorPrimary }} size='30px' />
                    </div>
                    <Flex vertical justify='center' align='center'>
                        <Button className='header-button' type="link">
                            Become a Member
                        </Button>
                        <Text className="sub-text">Additional 10% off on stays</Text>
                    </Flex>
                </Flex>
            </Col>
            <Divider style={{ height: isMobile ? "0" : "4em" }} type={isMobile ? 'horizontal' : 'vertical'} />
            <Col xs={24} sm={24} md={4}>
                <Flex horizontal align='center' justify='center'>
                    <div>
                        <AiOutlineSolution size="25px" style={{ color: token.colorPrimary }} />
                    </div>
                    <Flex vertical justify='center' align='center'>
                        <Button className='header-button' type="link">
                            Dham for Business
                        </Button>
                        <Text className="sub-text">Trusted by 5000 Corporates</Text>
                    </Flex>
                </Flex>
            </Col>
            <Divider style={{ height: isMobile ? "0" : "4em" }} type={isMobile ? 'horizontal' : 'vertical'} />
            <Col xs={24} sm={24} md={4}>
                <Flex horizontal align='center' justify='center'>
                    <div>
                        <PiBuildingApartmentFill size="25px" style={{ color: token.colorPrimary }} />
                    </div>
                    <Flex vertical justify='center' align='center'>
                        <Button className='header-button' type="link">
                            List your property
                        </Button>
                        <Text className="sub-text">Start earning in 30 mins</Text>
                    </Flex>
                </Flex>
            </Col>
            <Divider style={{ height: isMobile ? "0" : "4em" }} type={isMobile ? 'horizontal' : 'vertical'} />
            <Col xs={24} sm={24} md={4}>
                <Flex horizontal align='center' justify='center'>
                    <div>
                        <IoCall size="25px" style={{ color: token.colorPrimary }} />
                    </div>
                    <Flex vertical justify='center' align='center'>
                        <Button className='header-button' type="link">
                            0124-6201611
                        </Button>
                        <Text className="sub-text">Call us to Book now</Text>
                    </Flex>
                </Flex>
            </Col>
            <Divider style={{ height: isMobile ? "0" : "4em" }} type={isMobile ? 'horizontal' : 'vertical'} />
            <Col xs={24} sm={24} md={3} >
                <Dropdown overlay={menu} placement="bottomRight" arrow>
                    <Button className='header-button' type="link" icon={<GlobalOutlined size='40px' />}>
                        English
                    </Button>
                </Dropdown>
            </Col>
            <Divider type={isMobile ? 'horizontal' : 'vertical'} style={{ height: isMobile ? "0" : "4em" }} />
            <Col xs={24} sm={24} md={3}>
                <Button className='header-button' type="link" icon={<UserOutlined />}>
                    Login / Signup
                </Button>
            </Col>
        </>
    );




    return (
        <Header className="header">
            <Row justify="space-between" align="middle">
                <Col>
                    <img src="/img/LOGO.jpeg" alt="Logo" className="logo" />
                    <Text style={{ fontWeight: "800", fontSize: "30px", color: token.colorPrimary }}>DHAM</Text>
                </Col>
                <Col>
                    {isMobile ? (
                        <>
                            <Button
                                type="link"
                                icon={<ImMenu size={25} style={{ color: token.colorPrimary }} />}
                                onClick={() => setDrawerVisible(true)}
                            />
                            <Drawer
                                title="Menu"
                                placement="right"
                                onClose={() => setDrawerVisible(false)}
                                visible={drawerVisible}
                            >
                                <Row gutter={24} align="middle">
                                    {renderMenu()}
                                </Row>
                            </Drawer>
                        </>
                    ) : (
                        <Row gutter={24} align="middle">
                            {renderMenu()}
                        </Row>
                    )}
                    {/* <Row gutter={24} align="middle">
                        <Col>
                            <Flex horizontal align='center' justify='center'  >
                                <div>
                                    <FaUsers style={{ color: token.colorPrimary }} size='30px' />
                                </div>
                                <Flex vertical justify='center' align='center' >
                                    <Button className='header-button' type="link"  >
                                        Become a Member
                                    </Button>
                                    <Text className="sub-text">Additional 10% off on stays</Text>
                                </Flex>
                            </Flex>
                        </Col>
                        <Divider style={{ height: "4em" }} type='vertical' />
                        <Col>
                            <Flex horizontal align='center' justify='center'  >
                                <div>
                                    <AiOutlineSolution size="25px" style={{ color: token.colorPrimary }} />
                                </div>
                                <Flex vertical justify='center' align='center' >
                                    <Button className='header-button' type="link"  >
                                        Dham for Business
                                    </Button>
                                    <Text className="sub-text">Trusted by 5000 Corporates</Text>
                                </Flex>
                            </Flex>
                        </Col>
                        <Divider style={{ height: "4em" }} type='vertical' />
                        <Col>
                            <Flex horizontal align='center' justify='center'>
                                <div>
                                    <PiBuildingApartmentFill size="25px" style={{ color: token.colorPrimary }} />
                                </div>
                                <Flex vertical justify='center' align='center' >

                                    <Button className='header-button' type="link"  >
                                        List your property
                                    </Button>
                                    <Text className="sub-text">Start earning in 30 mins</Text>
                                </Flex>
                            </Flex>
                        </Col>
                        <Divider style={{ height: "4em" }} type='vertical' />
                        <Col>
                            <Flex horizontal align='center' justify='center'>
                                <div>
                                    <IoCall size="25px" style={{ color: token.colorPrimary }} />
                                </div>
                                <Flex vertical justify='center' align='center' >
                                    <Button className='header-button' type="link" >
                                        0124-6201611
                                    </Button>
                                    <Text className="sub-text">Call us to Book now</Text>

                                </Flex>
                            </Flex>
                        </Col>
                        <Divider style={{ height: "4em" }} type='vertical' />
                        <Col>
                            <Dropdown overlay={menu} placement="bottomRight" arrow>
                                <Button className='header-button' type="link" icon={<GlobalOutlined size='40px' />} >
                                    English
                                </Button>
                            </Dropdown>
                        </Col>
                        <Divider type='vertical' style={{ height: "4em" }} />
                        <Col>
                            <Button className='header-button' type="link" icon={<UserOutlined />} >
                                Login / Signup
                            </Button>
                        </Col>
                    </Row> */}
                </Col>
            </Row>
        </Header>
    )
}

export default AppHeader