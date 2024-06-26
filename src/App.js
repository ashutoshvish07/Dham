import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import VerificationForm from './Forms/VerificationForm';
import LoginForm from './Forms/LoginForm';
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import Main from './Components/layout/Main';
import Home from './pages/Home';
import "./Asset/Styles/main.css";
import "./Asset/Styles/responsive.css";
import "./Asset/Styles/login.css"

import 'antd/dist/reset.css';
import Tables from './pages/Tables';
import Billing from './pages/Billing';
import Profile from './pages/Profile';
import { useSelector } from 'react-redux';
import Country from './Components/Dashboard/Country/Country';
import UserHomePage from './Components/UserPanel/UserHomePage/UserHomePage';

function App() {
  // const { isAuthenticated } = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  console.log(`isAuthenticated: ${isAuthenticated}`)

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#c95808',
          colorTextBase: "#00000066",
          colorBgLayout: "#FFF",
          colorLink: "#c95808",
          // colorBgContainer: "#F1E4CB",
          // colorPrimaryText: "#00000099",
          // colorBgBase: "#FFF9ED",
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
            {isAuthenticated ? (
              <>
                <Route path="/dashboard" element={<Main><Home /></Main>} />
                <Route path="/country" element={<Main><Country /></Main>} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<UserHomePage />} />
                <Route path="/login" element={<LoginForm />} />
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
