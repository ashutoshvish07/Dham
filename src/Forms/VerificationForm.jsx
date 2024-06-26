import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, theme, notification, Row, Col, Image } from 'antd';
import "../Asset/Styles/login.css"
import { verifyOtpAsync } from '../Redux/Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const VerificationForm = () => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const { status, error, email } = useSelector((state) => state.auth);
    const [loading, setloading] = useState(false)
    console.log(`Verification value`, email, status);

    const [api, contextHolder] = notification.useNotification();

    const { token } = theme.useToken()

    const isDesktop = useMediaQuery({ minWidth: 768 })


    const navigate = useNavigate()

    const onChange = (text) => {
        console.log('onChange:', text);
        setOtp(text);
    };
    const sharedProps = {
        onChange,
    };

    const onFinish = (value) => {
        setloading(true);
        const email = value.email ? value.email : email
        dispatch(verifyOtpAsync({ email, otp })).then((action) => {
            if (action.type === 'auth/verifyOtpAsync/fulfilled') {
                navigate('/dashboard');
                setloading(false)
                api.success({
                    message: 'OTP verified successfully',
                    description:
                        'Welcome to Dashboard !',
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
        padding: isDesktop ? "12px" : "10px",
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
                                initialValues={{ email }}
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
                                    <Input defaultValue={email} style={input} size='large' placeholder="Email" />
                                </Form.Item>

                                <Form.Item
                                    name="Otp"
                                    label="Enter OTP"
                                    rules={[
                                        { required: true, message: "Please input your password!" },
                                    ]}
                                    style={{ marginBottom: "20px", marginTop: "20px" }}
                                >
                                    <Input.OTP length={6} {...sharedProps} style={input} size='large' placeholder="Password" />
                                </Form.Item>

                                {error ? <span style={{ color: "red" }}>{error}</span> : null}

                                <Form.Item >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        loading={loading}
                                        disabled={loading}
                                        style={{ width: "100%", }}
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Col>

            </Row>
        </>
        // <Card>
        //     <Form onFinish={onFinish}>
        //         <Form.Item
        //             label="Email"
        //             name="email"
        //         >
        //             <Input value={email} disabled />
        //         </Form.Item>
        //         <Form.Item
        //             label="OTP"
        //             name="otp"
        //             rules={[{ required: true, message: 'Please input the OTP!' }]}
        //         >
        //             <Input value={otp} onChange={e => setOtp(e.target.value)} />
        //         </Form.Item>
        //         <Form.Item>
        //             <Button type="primary" htmlType="submit">Submit</Button>
        //         </Form.Item>
        //     </Form>
        // </Card>
    );
};

export default VerificationForm;
