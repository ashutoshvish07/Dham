
import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

import { Layout, Menu, Dropdown, Avatar, theme, Affix } from 'antd';
import { UserOutlined, DashboardOutlined, GlobalOutlined } from '@ant-design/icons';
import { Header } from "antd/es/layout/layout";
import "../../Asset/Styles/Slider.css"
const { Header: AntHeader, Content, Sider } = Layout;
function DashboardLayout({ children }) {
  const [visible, setVisible] = useState(false);

  const { token } = theme.useToken()


  const profileMenu = (
    <Menu>
      <Menu.Itunset linear key="1">
        <Link to="/profile">Profile</Link>
      </Menu.Itunset>
      <Menu.Item key="2">
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh", background: `${token.colorPrimary}!important` }} >
      <Sider collapsible={false} style={{ background: `${token.colorPrimary}!important` }}>
        <div className="logo" style={{ height: '90px', margin: "10px 0", display: "flex", justifyContent: "center", alignItems: "center" }} >
          <img src="/img/LOGO.jpeg" style={{ height: '80px', height: '80px', }} />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.SubMenu key="sub1" icon={<GlobalOutlined />} title="Location Management">
            <Menu.Item key="2">
              <Link to="/location/country">Country</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/location/state">State</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/location/city">City</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout >
        <Affix style={{ background: `#fff !important`, padding: 0 }}>
          <AntHeader  >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Dashboard
            </div>
          </AntHeader>
        </Affix>
        <Content style={{ padding: 24, minHeight: '100vh' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout >
  );
}

export default DashboardLayout;
