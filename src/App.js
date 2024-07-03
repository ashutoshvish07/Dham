import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import VerificationForm from './Forms/VerificationForm';
import LoginForm from './Forms/LoginForm';
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';

import "./Asset/Styles/login.css"

import 'antd/dist/reset.css';
import { useSelector } from 'react-redux';
import Country from './Components/Dashboard/Country/Country';
import Dashboard from './Components/Dashboard';
import State from './pages/State';
import City from './pages/City';
import DashboardLayout from './Components/layout/DashboardLayout';
import Profile from './pages/Profile';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(`isAuthenticated: ${isAuthenticated}`)

  useEffect(() => {
    const token = localStorage.getItem('token');
    // setIsAuthenticated(!!token);
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#c95808',
          colorTextBase: "#00000066",
          colorBgLayout: "#FFF",
          colorLink: "#c95808",
          colorBgContainer: "#F1E4CB",
          colorPrimaryText: "#00000099",
          colorBgBase: "#FFF9ED",
          borderRadiusLG: 20,
          borderRadiusSM: 8,
          fontSizeHeading1: 40,
          fontSizeHeading2: 30,
          fontSizeHeading3: 24,
          fontSizeHeading4: 20,
          fontSizeHeading5: 18,
          fontSizeHeading6: 16,
          fontSizeSM: 12,
          fontSizeLG: 14,
          fontSizeXLG: 16,
          fontSizeXXL: 18,
          fontSizeXXXL: 20,
        }
      }}
    >

      <BrowserRouter>
        {isAuthenticated !== null && (
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="location/country" element={<Country />} />
                  <Route path="location/state" element={<State />} />
                  <Route path="location/city" element={<City />} />
                </Route>
                <Route path="profile" element={<Profile />} />
                {/* <Route path="logout" element={<Logout />} /> */}
              </>
            ) : (
              <>
                {/* <Route path="/" element={<UserHomePage />} /> */}
                <Route path="/" element={<LoginForm />} />
                <Route path="/otp-verification" element={<VerificationForm />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        )}
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
