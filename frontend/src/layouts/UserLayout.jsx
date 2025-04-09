import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography,
  Menu, Container, Avatar, Button, Tooltip, MenuItem, Link
} from '@mui/material';
import { useEffect, useState } from 'react';
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router';
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import logo from "../images/logo.png";

function UserLayout({ children }) {
  const [isadmin, setIsadmin] = useState(false);
  const [isSuperadmin, setIsSuperAdmin] = useState(false);
  const [isLogin, setIslogin] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('access-token');
    if (token) {
      setIslogin(true);
      const data = decodeToken(token);
      if (data?.isAdmin) setIsadmin(true);
      if (data?.isSuperAdmin) setIsSuperAdmin(true);
      if (data?.name) setName(data.name);
    }
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar>
            <img src={logo} alt="logo" height={50} width={50} />
            <Typography
              variant="h6"
              component="a"
              href="/home"
              sx={{
                mr: 0,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SAAS
            </Typography>

            <Typography
              variant="h5"
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SAAS
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex' }, px: 3 }}>
              <MenuItem sx={{ px: 4 }}>
                <Link href="/home" textAlign="center" sx={{ color: (theme) => theme.palette.secondary.main }}>
                  Home
                </Link>
              </MenuItem>
            </Box>

            {isLogin ? (
              <>
                <Box sx={{ flexGrow: 0.02, px: 1 }}>
                  <Tooltip title={`Logged in as ${name}`}>
                    <IconButton onClick={handleOpenUserMenu}>
                      <Avatar sx={{ backgroundColor: (theme) => theme.palette.common.grey }}>
                        {name?.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem disabled>
                      <Typography textAlign="center">Hi, {name || "User"}</Typography>
                    </MenuItem>

                    {isadmin && (
                      <>
                        <MenuItem>
                          <Typography textAlign="center" onClick={() => navigate('/dashboard/users')}>
                            Dashboard Users
                          </Typography>
                        </MenuItem>

                        {isSuperadmin && (
                          <MenuItem>
                            <Typography onClick={() => navigate('/dashboard/services')} textAlign="center">
                              Dashboard Service
                            </Typography>
                          </MenuItem>
                        )}
                      </>
                    )}

                    <MenuItem>
                      <Typography
                        onClick={() => {
                          sessionStorage.removeItem('access-token');
                          setIslogin(false);
                          handleCloseUserMenu();
                          navigate('/home');
                        }}
                        textAlign="center"
                      >
                        Log out
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
                <IconButton
                  color="inherit"
                  sx={{ backgroundColor: (theme) => theme.palette.common.grey }}
                  onClick={() => navigate('/cart')}
                >
                  <LocalMallSharpIcon sx={{ fontSize: 25 }} />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  href="/signup"
                  variant="h6"
                  component="a"
                  sx={{
                    display: { xs: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  SignUp
                </Button>
                <Button
                  href="/login"
                  variant="h6"
                  component="a"
                  sx={{
                    display: { xs: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  LogIn
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </>
  );
}

export default UserLayout;
