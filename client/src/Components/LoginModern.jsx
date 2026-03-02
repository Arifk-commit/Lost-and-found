import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Typography, Button, Stack, TextField, Container, Card, CardContent, InputAdornment, IconButton } from '@mui/material'
import { motion } from 'framer-motion'
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

function LoginModern() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

  function login(values) {
    setLoading(true);
    const payload = {
      email: values.email,
      password: values.password,
    };
    
    axios.post(`${apiBaseUrl}/users/login`, payload)
      .then((response) => {
        if (response.data.user) {
          toast.success('🎉 Welcome back!', {
            position: "bottom-right",
            autoClose: 2000,
          });
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setTimeout(() => window.location.href="/", 500);
        } else {
          setLoading(false);
          toast.error('❌ Email or Password is incorrect!', {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error('❌ Login failed. Please try again.', {
          position: "bottom-right",
          autoClose: 2000,
        });
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={6}
          alignItems="center"
          justifyContent="center"
          minHeight="80vh"
        >
          {/* Left Side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
          >
            <Stack gap={3} maxWidth={500} display={{ xs: 'none', md: 'flex' }}>
              <Typography variant="h2" className="text-gradient" fontWeight={700}>
                Welcome Back!
              </Typography>
              <Typography variant="h6" color="text.secondary" lineHeight={1.8}>
                Log in to access your account and continue helping reunite lost items with their owners.
              </Typography>
              <img
                src="https://i.ibb.co/G2k63ys/login-1.png"
                alt="Login illustration"
                className="w-full h-auto drop-shadow-xl animate-float"
              />
            </Stack>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ flex: 1, width: '100%', maxWidth: 500 }}
          >
            <Card
              className="card"
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: 4,
                boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.1)',
                border: '1px solid',
                borderColor: 'rgba(59, 130, 246, 0.1)',
              }}
            >
              <CardContent>
                <Stack spacing={4}>
                  {/* Header */}
                  <Stack spacing={1} mb={2}>
                    <Typography variant="h4" fontWeight={700} color="primary.dark">
                      Log In
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Enter your credentials to access your account
                    </Typography>
                  </Stack>

                  {/* Form */}
                  <Formik
                    initialValues={{
                      email: '',
                      password: '',
                    }}
                    onSubmit={(values) => login(values)}
                  >
                    {({ values, handleChange }) => (
                      <Form>
                        <Stack spacing={3}>
                          {/* Email Field */}
                          <TextField
                            fullWidth
                            required
                            id="email"
                            type="email"
                            name="email"
                            label="Email Address"
                            placeholder="you@example.com"
                            value={values.email}
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EnvelopeIcon className="w-5 h-5 text-neutral-400" />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                              }
                            }}
                          />

                          {/* Password Field */}
                          <TextField
                            fullWidth
                            required
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockClosedIcon className="w-5 h-5 text-neutral-400" />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                  >
                                    {showPassword ? 
                                      <EyeSlashIcon className="w-5 h-5 text-neutral-400" /> : 
                                      <EyeIcon className="w-5 h-5 text-neutral-400" />
                                    }
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                              }
                            }}
                          />

                          {/* Submit Button */}
                          <motion.div whileTap={{ scale: 0.98 }}>
                            <Button
                              fullWidth
                              variant="contained"
                              type="submit"
                              disabled={loading}
                              size="large"
                              sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 3,
                                textTransform: 'none',
                                mt: 2,
                              }}
                            >
                              {loading ? 'Logging in...' : 'Log In'}
                            </Button>
                          </motion.div>
                        </Stack>
                      </Form>
                    )}
                  </Formik>

                  {/* Divider */}
                  <Stack direction="row" spacing={2} alignItems="center" my={1}>
                    <div className="flex-1 h-px bg-neutral-200"></div>
                    <Typography variant="body2" color="text.secondary">
                      OR
                    </Typography>
                    <div className="flex-1 h-px bg-neutral-200"></div>
                  </Stack>

                  {/* Sign Up Link */}
                  <Stack direction="row" justifyContent="center" spacing={1}>
                    <Typography variant="body1" color="text.secondary">
                      Don't have an account?
                    </Typography>
                    <Link to="/sign-up" className="no-underline">
                      <Typography variant="body1" color="primary" fontWeight={600} sx={{ '&:hover': { textDecoration: 'underline' } }}>
                        Sign Up
                      </Typography>
                    </Link>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Stack>
      </Container>
    </div>
  );
}

export default LoginModern;
