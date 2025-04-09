import React, { useEffect } from 'react'
import UserLayout from './UserLayout'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('access-token');
    if (!token) return navigate('/signup');

    const decoded = decodeToken(token);
    const isAdmin = decoded?.isAdmin;
    const isSuperAdmin = decoded?.isSuperAdmin;

    if (!isAdmin && !isSuperAdmin) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <UserLayout>
      <Container component="main" sx={{ pt: 4, pb: 3 }}>
        {children}
      </Container>
    </UserLayout>
  );
}

export default DashboardLayout;
