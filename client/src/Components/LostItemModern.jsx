import React, { useState } from "react";
import axios from "axios";
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import { Container, Grid, Button, Typography, Stack, TextField, Select, InputLabel, MenuItem, FormControl, Card, CardContent, Chip, Box } from '@mui/material';
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import { PhotoIcon, MapPinIcon, CalendarIcon, PhoneIcon, DocumentTextIcon, TagIcon } from '@heroicons/react/24/outline'

const LostItemModern = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const usertoken = window.localStorage.getItem("token");
  
  const getUserId = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return user ? user._id : null;
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || [])
    setImages(files)
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('Item name is required'),
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Item type is required'),
    location: Yup.string().required('Location is required'),
    date: Yup.string().required('Date is required'),
    number: Yup.string().required('Phone number is required'),
  });

  const handleSubmit = async (values) => {
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (error) {
      const errorMessages = error.inner.map((err) => err.message);
      toast.error(errorMessages.join(', '), {
        position: "bottom-right",
        autoClose: 2000,
      })
      return;
    }
  
    if (!images.length) {
      toast.error('📸 Please upload at least one image', {
        position: "bottom-right",
        autoClose: 2000,
      })
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value)
      })

      if (!values.userId && getUserId()) {
        formData.append('userId', getUserId())
      }

      images.forEach((file) => {
        formData.append('images', file)
      })

      axios.post(`${apiBaseUrl}/Items/newItem`, formData, {
        headers: {
          token: usertoken,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          toast.success('🎉 Item posted successfully!', {
            position: "bottom-right",
            autoClose: 2000,
          })
          setLoading(false)
          setImages([])
          setPreviewImages([])
          setTimeout(() => window.location.href = "/mylistings", 1000)
        })
        .catch((error) => {
          console.log("An error occurred:", error)
          toast.error('❌ Something went wrong. Please try again.', {
            position: "bottom-right",
            autoClose: 2000,
          })
          setLoading(false)
        })
    } catch (error) {
      console.error(error)
      toast.error('❌ Failed to post item', {
        position: "bottom-right",
        autoClose: 2000,
      })
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-50 via-white to-accent-50 py-12 px-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Typography variant="h3" className="text-gradient mb-3" fontWeight={700}>
            Post an Item
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Help reunite lost items with their owners or report what you've found
          </Typography>
        </motion.div>

        <Grid container spacing={6} justifyContent="center">
          {/* Form Card */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
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
                  <Formik
                    initialValues={{
                      name: '',
                      userId: getUserId(),
                      description: '',
                      type: '',
                      location: '',
                      date: '',
                      number: '',
                    }}
                    validationSchema={schema}
                    onSubmit={(values) => handleSubmit(values)}
                  >
                    {({ values, handleChange, errors, touched }) => (
                      <Form>
                        <Stack spacing={4}>
                          {/* Image Upload Section */}
                          <Box>
                            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                              <PhotoIcon className="w-6 h-6 text-primary-500" />
                              <Typography variant="h6" fontWeight={600}>
                                Upload Images
                              </Typography>
                            </Stack>
                            
                            <Button
                              variant="outlined"
                              component="label"
                              fullWidth
                              sx={{
                                py: 3,
                                borderRadius: 3,
                                borderStyle: 'dashed',
                                borderWidth: 2,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                  borderWidth: 2,
                                  bgcolor: 'primary.50',
                                }
                              }}
                            >
                              <Stack alignItems="center" spacing={1}>
                                <PhotoIcon className="w-8 h-8 text-primary-500" />
                                <Typography>
                                  Click to upload images (up to 5)
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  JPG, JPEG, PNG (Max 5 images)
                                </Typography>
                              </Stack>
                              <input
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                                onChange={handleImageUpload}
                              />
                            </Button>

                            {/* Image Previews */}
                            {previewImages.length > 0 && (
                              <Grid container spacing={2} mt={2}>
                                {previewImages.map((preview, index) => (
                                  <Grid item xs={6} sm={4} md={3} key={index}>
                                    <motion.div
                                      initial={{ scale: 0.8, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      className="relative"
                                    >
                                      <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-xl"
                                      />
                                      <Button
                                        size="small"
                                        onClick={() => removeImage(index)}
                                        sx={{
                                          position: 'absolute',
                                          top: -8,
                                          right: -8,
                                          minWidth: 'auto',
                                          width: 24,
                                          height: 24,
                                          borderRadius: '50%',
                                          bgcolor: 'error.main',
                                          color: 'white',
                                          '&:hover': {
                                            bgcolor: 'error.dark',
                                          }
                                        }}
                                      >
                                        ×
                                      </Button>
                                    </motion.div>
                                  </Grid>
                                ))}
                              </Grid>
                            )}
                          </Box>

                          {/* Item Details Section */}
                          <Box>
                            <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                              <TagIcon className="w-6 h-6 text-primary-500" />
                              <Typography variant="h6" fontWeight={600}>
                                Item Details
                              </Typography>
                            </Stack>

                            <Stack spacing={3}>
                              {/* Item Name */}
                              <TextField
                                fullWidth
                                required
                                id="name"
                                name="name"
                                label="Item Name"
                                placeholder="What did you lose/find?"
                                value={values.name}
                                onChange={handleChange}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                  }
                                }}
                              />

                              {/* Description */}
                              <TextField
                                fullWidth
                                required
                                id="description"
                                name="description"
                                label="Description"
                                placeholder="Describe the item in detail..."
                                multiline
                                rows={4}
                                value={values.description}
                                onChange={handleChange}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                                InputProps={{
                                  startAdornment: (
                                    <DocumentTextIcon className="w-5 h-5 text-neutral-400 mr-2 mt-2" />
                                  ),
                                }}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                  }
                                }}
                              />

                              {/* Location */}
                              <TextField
                                fullWidth
                                required
                                id="location"
                                name="location"
                                label="Location"
                                placeholder="Where did you lose/find it?"
                                value={values.location}
                                onChange={handleChange}
                                error={touched.location && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                                InputProps={{
                                  startAdornment: (
                                    <MapPinIcon className="w-5 h-5 text-neutral-400 mr-2" />
                                  ),
                                }}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                  }
                                }}
                              />

                              {/* Date */}
                              <TextField
                                fullWidth
                                required
                                id="date"
                                name="date"
                                label="Date"
                                placeholder="When did you lose/find it?"
                                value={values.date}
                                onChange={handleChange}
                                error={touched.date && Boolean(errors.date)}
                                helperText={touched.date && errors.date}
                                InputProps={{
                                  startAdornment: (
                                    <CalendarIcon className="w-5 h-5 text-neutral-400 mr-2" />
                                  ),
                                }}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                  }
                                }}
                              />

                              {/* Phone Number */}
                              <TextField
                                fullWidth
                                required
                                id="number"
                                name="number"
                                label="Contact Number"
                                placeholder="How can we contact you?"
                                value={values.number}
                                onChange={handleChange}
                                error={touched.number && Boolean(errors.number)}
                                helperText={touched.number && errors.number}
                                InputProps={{
                                  startAdornment: (
                                    <PhoneIcon className="w-5 h-5 text-neutral-400 mr-2" />
                                  ),
                                }}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                  }
                                }}
                              />

                              {/* Item Type */}
                              <FormControl 
                                fullWidth 
                                required
                                error={touched.type && Boolean(errors.type)}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                  }
                                }}
                              >
                                <InputLabel>Item Type</InputLabel>
                                <Select
                                  id="type"
                                  name="type"
                                  value={values.type}
                                  onChange={handleChange}
                                  label="Item Type"
                                >
                                  <MenuItem value="Lost">🔍 Lost Item</MenuItem>
                                  <MenuItem value="Found">✨ Found Item</MenuItem>
                                </Select>
                                {touched.type && errors.type && (
                                  <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                                    {errors.type}
                                  </Typography>
                                )}
                              </FormControl>
                            </Stack>
                          </Box>

                          {/* Submit Button */}
                          <motion.div whileTap={{ scale: 0.98 }}>
                            <Button
                              type="submit"
                              variant="contained"
                              fullWidth
                              disabled={loading}
                              size="large"
                              sx={{
                                py: 2,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: 3,
                                textTransform: 'none',
                                mt: 2,
                              }}
                            >
                              {loading ? 'Posting...' : 'Post Item'}
                            </Button>
                          </motion.div>
                        </Stack>
                      </Form>
                    )}
                  </Formik>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Sidebar - Tips */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Stack spacing={3}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: 'primary.50',
                    border: '1px solid',
                    borderColor: 'primary.100',
                  }}
                >
                  <Typography variant="h6" fontWeight={600} color="primary.dark" mb={2}>
                    📝 Tips for Better Results
                  </Typography>
                  <Stack spacing={1.5}>
                    <Typography variant="body2" color="text.secondary">
                      • Upload clear, well-lit photos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Provide detailed descriptions
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Include exact location and time
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Add contact information
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Be honest and accurate
                    </Typography>
                  </Stack>
                </Card>

                {/* Illustration */}
                <motion.div
                  className="animate-float"
                  style={{ animationDelay: '1s' }}
                >
                  <img
                    src="https://i.ibb.co/Q65DB0d/list-item.png"
                    alt="Post item illustration"
                    className="w-full h-auto drop-shadow-xl rounded-2xl"
                  />
                </motion.div>
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LostItemModern;
