import React from "react";
import { Stack, Typography, Button, Box, Container, Grid, Card, CardContent } from '@mui/material'
import { motion } from 'framer-motion'
import { MagnifyingGlassIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const Home = () => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem('user'));

  const handleButtonClick = () => {
    window.location.href = isLoggedIn ? "/postitem" : "/log-in";
  };

  const handleButtonClickLost = () => {
    window.location.href = isLoggedIn ? "/lostItems" : "/log-in";
  };

  const handleButtonClickFound = () => {
    window.location.href = isLoggedIn ? "/founditems" : "/log-in";
  };

  const features = [
    {
      icon: <MagnifyingGlassIcon className="w-12 h-12 text-primary-500" />,
      title: "Search Lost Items",
      description: "Browse through thousands of lost and found items to find what belongs to you"
    },
    {
      icon: <SparklesIcon className="w-12 h-12 text-primary-500" />,
      title: "Post Found Items",
      description: "Help reunite someone with their lost belongings by posting what you found"
    },
    {
      icon: <ShieldCheckIcon className="w-12 h-12 text-primary-500" />,
      title: "Secure & Trusted",
      description: "Safe and verified community of helpful people looking to reconnect items"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50">
      {/* Hero Section - Modern Glassmorphism */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4">
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Stack gap={4}>
                  <Typography
                    variant="h1"
                    className="text-gradient"
                    sx={{
                      fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                      fontWeight: 800,
                      lineHeight: 1.1,
                      mb: 2
                    }}
                  >
                    Find Your Lost Items!
                  </Typography>

                  <div className="h-1 w-24 bg-gradient-primary rounded-full"></div>

                  <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '1.1rem', md: '1.3rem' },
                      fontWeight: 400,
                      lineHeight: 1.8,
                      maxWidth: '600px'
                    }}
                  >
                    We know how hard it is to lose something important. Let our community help you reunite with your belongings!
                  </Typography>

                  <Stack direction="row" gap={2} flexWrap="wrap" mt={2}>
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handleButtonClick}
                        variant="contained"
                        size="large"
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          borderRadius: 3
                        }}
                      >
                        Get Started →
                      </Button>
                    </motion.div>
                    
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handleButtonClickLost}
                        variant="outlined"
                        size="large"
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          borderRadius: 3
                        }}
                      >
                        Browse Items
                      </Button>
                    </motion.div>
                  </Stack>
                </Stack>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10">
                  <img
                    src="https://i.ibb.co/9Z8qTQj/bg2.png"
                    alt="Lost and Found Illustration"
                    className="w-full h-auto drop-shadow-2xl animate-float"
                  />
                </div>
                {/* Glassmorphism card floating */}
                <motion.div
                  className="absolute top-10 -left-4 glass p-4 rounded-2xl shadow-soft-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Typography variant="h6" className="text-primary-600 font-bold">1000+</Typography>
                  <Typography variant="body2" color="text.secondary">Items Found</Typography>
                </motion.div>

                <motion.div
                  className="absolute bottom-10 -right-4 glass p-4 rounded-2xl shadow-soft-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                >
                  <Typography variant="h6" className="text-accent-600 font-bold">500+</Typography>
                  <Typography variant="body2" color="text.secondary">Happy Users</Typography>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Features Section - Modern Cards */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Typography variant="h2" className="text-gradient mb-4" sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' } }}>
              Why Choose Us?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
              We're more than just a lost and found platform - we're a community dedicated to helping people
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card 
                    className="card-hover h-full"
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: 'rgba(59, 130, 246, 0.1)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardContent>
                      <div className="mb-4 p-3 bg-primary-50 rounded-2xl inline-block">
                        {feature.icon}
                      </div>
                      <Typography variant="h5" fontWeight={600} mb={2} color="primary.dark">
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* CTA Section - Modern Gradient with Glassmorphism */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-95"></div>
        <div className="absolute inset-0 bg-[url('https://www.yourzbs.com/wp-content/uploads/2019/06/The-Emotional-Side-Of-Returning-Lost-Objects.jpg')] bg-cover bg-center opacity-10"></div>
        
        <Container maxWidth="lg" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Typography 
              variant="h2" 
              className="text-white mb-6" 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '3rem' },
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}
            >
              Ready to Find Your Lost Item?
            </Typography>
            
            <Typography 
              variant="h6" 
              className="text-white/90 mb-8"
              sx={{ maxWidth: '700px', mx: 'auto', lineHeight: 1.8 }}
            >
              Join thousands of users who have successfully reunited with their belongings through our platform
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} gap={3} justifyContent="center" flexWrap="wrap">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleButtonClickLost}
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)',
                    color: 'primary.main',
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.95)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 48px rgba(255, 255, 255, 0.4)',
                    }
                  }}
                >
                  Browse Lost Items
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleButtonClickFound}
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    borderWidth: 2,
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    backdropFilter: 'blur(8px)',
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(255, 255, 255, 0.2)',
                    }
                  }}
                >
                  Post Found Item
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleButtonClick}
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    borderWidth: 2,
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    backdropFilter: 'blur(8px)',
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(255, 255, 255, 0.2)',
                    }
                  }}
                >
                  Post Lost Item
                </Button>
              </motion.div>
            </Stack>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

export default Home;
