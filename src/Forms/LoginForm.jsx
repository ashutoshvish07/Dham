import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Typography, Row, Col, Image, theme, notification } from 'antd';
import { loginAsync } from '../Redux/Slices/authSlice';
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';




const { Text } = Typography

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.auth);
    const [api, contextHolder] = notification.useNotification();

    const { token } = theme.useToken()

    const isDesktop = useMediaQuery({ minWidth: 768 })
    const navigate = useNavigate();

    const onFinish = (value) => {
        setLoading(true)
        dispatch(loginAsync(value)).then((action) => {
            if (action.type === 'auth/loginAsync/fulfilled') {
                setLoading(false)
                navigate('/otp-verification');
                api.success({
                    message: "Please check your email for OTP",
                    description: "",
                });
            }
            if (action.type === 'auth/loginAsync/rejected') {
                setLoading(false)
                api.error({
                    message: "Something went wrong.",
                    description: " Please try again !",
                });
            }
        });
    };



    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    };


    const contentStyle = {
        color: token.colorTextTertiary,
        backgroundColor: token.colorBgBase,
        borderTopLeftRadius: isDesktop ? token.borderRadiusLG : '0',
        borderBottomLeftRadius: isDesktop ? token.borderRadiusLG : '0',
        height: '100vh',
        width: "50%",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        overflow: 'hidden',
        overflowY: 'scroll'
    };


    const LogoStyle = {
        height: isDesktop ? "200px" : "150px",
        width: isDesktop ? "200px" : "150px",
        margin: "0 auto",
        objectFit: 'contain',
        mixBlendMode: "multiply"
    }

    const container = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundImage: "url(/img/bgimage.jpeg)",
        height: '100vh',
        backgroundSize: "cover",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
    }

    const formContainer = {
        padding: isDesktop ? "40px 24px 0px 24px" : "",
    }


    const input = {
        marginTop: "6px",
        padding: isDesktop ? "12px !important" : "10px important",
        borderRadius: "50px !important",
    }
    const inputEmail = {
        marginTop: "6px",
        padding: isDesktop ? "10px" : "8px",
        borderRadius: "50px",
    }

    const ImageContainer = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: isDesktop ? "0" : "12%",

    }

    const InputContainer = {
        padding: isDesktop ? "0 0 0 0 " : "0px",

    }

    const navLinks = {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        margin: "10px 4px",
        fontWeight: "bold",
        opacity: 0.8,
    }

    const leftImage = {
        height: '100vh',
        backgroundSize: "contain",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
    }

    const brandLogoBox = {
        marginTop: "10px",
        position: 'absolute',
        top: 0,
        left: 15
    }

    const brandLogo = {
        height: "50px",
        width: "50px",
        objectFit: 'contain',
        mixBlendMode: "multiply"
    }

    return (
        <>
            {contextHolder}
            <Row style={container}>
                <Col xs={0} md={12} lg={12} style={leftImage}  >
                    <div style={brandLogoBox} >
                        <img style={brandLogo} src="/img/LOGO.jpeg" alt="logo" />
                    </div>
                </Col>
                <Col xs={24} md={12} lg={12} style={contentStyle}>
                    <div style={formContainer} >
                        <div style={ImageContainer}>
                            <Image
                                visible={false}
                                preview={false}
                                style={LogoStyle} src="/img/LOGO.jpeg" alt="logo" />
                        </div>
                        <div style={InputContainer}>
                            <Form
                                name="basic"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                style={{ width: isDesktop ? "79%" : "86%", margin: '0 auto', }}
                                initialValues={{ remember: false }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: "Please input your email!" },
                                    ]}
                                    style={{ marginBottom: "20px" }}
                                >
                                    <Input style={input} size='large' placeholder="Email" />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        { required: true, message: "Please input your password!" },
                                    ]}
                                    style={{ marginBottom: "20px", marginTop: "20px" }}
                                >
                                    <Input.Password style={input} size='large' placeholder="Password" />
                                </Form.Item>

                                {error ? <span style={{ color: "red" }}>{error}</span> : null}

                                <Form.Item >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        loading={loading}
                                        disabled={loading}
                                        style={{ width: "100%" }}
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>

                                <div style={navLinks}>
                                    <Text style={{ cursor: 'pointer', color: token.colorPrimary }} onClick={() => ''}>Forgot Password ?</Text>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Col>

            </Row>
        </>
    );
};

export default LoginForm;
