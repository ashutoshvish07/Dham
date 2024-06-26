import React from 'react';
import { Carousel, Image, Layout } from 'antd';
import AppHeader from '../UserHeader/AppHeader';

const { Content } = Layout;
const UserHomePage = () => {

    const contentStyle = {
        height: '260px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        zIndex: 1,

    };

    const imgStyle = {
        height: '360px',
        width: '100%',
        objectFit: 'cover',
        zIndex: 0,
    }
    return (
        <Layout>
            <AppHeader />
            <Content>
                <Carousel autoplay>
                    <div>
                        <img style={imgStyle} src='/img/heroimg/hero1.jpg' />
                    </div>
                    <div>
                        <img style={imgStyle} src='/img/heroimg/hero2.jpg' />
                    </div>
                    <div>
                        <img style={imgStyle} src='/img/heroimg/hero3.jpg' />
                    </div>
                    <div>
                        <img style={imgStyle} src='/img/heroimg/hero4.jpg' />
                    </div>
                </Carousel>
            </Content>
        </Layout>
    )
}

export default UserHomePage