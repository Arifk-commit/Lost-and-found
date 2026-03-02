import React, { useState } from 'react'
import { setConstraint } from "../constraints";
import { Button, Menu, MenuItem, Stack, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

function NavbarModern() {
  const token = window.localStorage.getItem("token");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const signout = () => {
    setConstraint(false);
    localStorage.clear();
    window.location.href="/log-in";
  };

  const navLinkStyle = {
    fontSize: '0.95rem',
    fontWeight: 600,
    textTransform: 'none',
    color: 'text.primary',
    px: 2,
    py: 1,
    borderRadius: 2,
    '&:hover': {
      color: 'primary.main',
      backgroundColor: 'primary.50',
    },
  };

  const drawer = (
    <Stack sx={{ width: 280, pt: 2, height: '100%', bgcolor: 'background.paper' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" px={2} mb={2}>
        <img src='https://i.ibb.co/G2851XX/Main-Logo-1.png' alt="logo" style={{ width: '120px' }} />
        <IconButton onClick={handleDrawerToggle}>
          <XMarkIcon className="w-6 h-6" />
        </IconButton>
      </Stack>
      <Divider />
      <List>
        {token ? (
          <>
            <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton component={Link} to="/lostitems" onClick={handleDrawerToggle}>
              <ListItemText primary="Lost Items" />
            </ListItemButton>
            <ListItemButton component={Link} to="/founditems" onClick={handleDrawerToggle}>
              <ListItemText primary="Found Items" />
            </ListItemButton>
            <ListItemButton component={Link} to="/postitem" onClick={handleDrawerToggle}>
              <ListItemText primary="Post Item" />
            </ListItemButton>
            <ListItemButton component={Link} to="/mylistings" onClick={handleDrawerToggle}>
              <ListItemText primary="My Listings" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItem>
              <Button
                fullWidth
                variant="contained"
                onClick={() => { handleDrawerToggle(); signout(); }}
                sx={{ textTransform: 'none', py: 1.5 }}
              >
                Logout
              </Button>
            </ListItem>
          </>
        ) : (
          <>
            <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton component={Link} to="/lostitems" onClick={handleDrawerToggle}>
              <ListItemText primary="Lost Items" />
            </ListItemButton>
            <ListItemButton component={Link} to="/founditems" onClick={handleDrawerToggle}>
              <ListItemText primary="Found Items" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItem>
              <Button
                fullWidth
                variant="outlined"
                component={Link}
                to="/log-in"
                onClick={handleDrawerToggle}
                sx={{ textTransform: 'none', py: 1.5, mb: 1 }}
              >
                Login
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                variant="contained"
                component={Link}
                to="/sign-up"
                onClick={handleDrawerToggle}
                sx={{ textTransform: 'none', py: 1.5 }}
              >
                Sign Up
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </Stack>
  );

  return (
    <>
      {/* Modern Navbar - Glassmorphism */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50"
      >
        <div className="glass border-b border-white/20">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              maxWidth: '1440px',
              mx: 'auto',
              px: { xs: 2, sm: 3, md: 5 },
              py: 2,
            }}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src='https://i.ibb.co/G2851XX/Main-Logo-1.png'
                  alt="logo"
                  className="h-12 md:h-14"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              display={{ xs: 'none', md: 'flex' }}
            >
              {token ? (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button component={Link} to="/" sx={navLinkStyle} disableRipple>
                      Home
                    </Button>
                  </motion.div>

                  {/* Items Browser Dropdown */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleClick}
                      sx={navLinkStyle}
                      endIcon={
                        <motion.div
                          animate={{ rotate: open ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDownIcon className="w-4 h-4" />
                        </motion.div>
                      }
                      disableRipple
                    >
                      Browse Items
                    </Button>
                  </motion.div>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        borderRadius: 3,
                        boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
                        minWidth: 180,
                      }
                    }}
                  >
                    <MenuItem
                      component={Link}
                      to="/lostitems"
                      onClick={handleClose}
                      sx={{ py: 1.5, px: 3, fontSize: '0.95rem' }}
                    >
                      🔍 Lost Items
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/founditems"
                      onClick={handleClose}
                      sx={{ py: 1.5, px: 3, fontSize: '0.95rem' }}
                    >
                      ✨ Found Items
                    </MenuItem>
                  </Menu>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button component={Link} to="/postitem" sx={navLinkStyle} disableRipple>
                      Post Item
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button component={Link} to="/mylistings" sx={navLinkStyle} disableRipple>
                      My Listings
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="contained"
                      onClick={signout}
                      sx={{
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        ml: 2,
                        borderRadius: 2,
                      }}
                      disableRipple
                    >
                      Logout
                    </Button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button component={Link} to="/" sx={navLinkStyle} disableRipple>
                      Home
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleClick}
                      sx={navLinkStyle}
                      endIcon={
                        <motion.div
                          animate={{ rotate: open ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDownIcon className="w-4 h-4" />
                        </motion.div>
                      }
                      disableRipple
                    >
                      Browse Items
                    </Button>
                  </motion.div>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        borderRadius: 3,
                        boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
                        minWidth: 180,
                      }
                    }}
                  >
                    <MenuItem
                      component={Link}
                      to="/log-in"
                      onClick={handleClose}
                      sx={{ py: 1.5, px: 3, fontSize: '0.95rem' }}
                    >
                      🔍 Lost Items
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/log-in"
                      onClick={handleClose}
                      sx={{ py: 1.5, px: 3, fontSize: '0.95rem' }}
                    >
                      ✨ Found Items
                    </MenuItem>
                  </Menu>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outlined"
                      component={Link}
                      to="/log-in"
                      sx={{
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        ml: 2,
                        borderRadius: 2,
                      }}
                      disableRipple
                    >
                      Login
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="contained"
                      component={Link}
                      to="/sign-up"
                      sx={{
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                      }}
                      disableRipple
                    >
                      Sign Up
                    </Button>
                  </motion.div>
                </>
              )}
            </Stack>

            {/* Mobile Menu Button */}
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <Bars3Icon className="w-6 h-6" />
            </IconButton>
          </Stack>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default NavbarModern;
