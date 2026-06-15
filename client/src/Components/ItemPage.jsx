import React, { useState, useEffect } from "react";
import { LOGGED_IN, setConstraint } from "../constraints";
import DeleteIcon from '@mui/icons-material/Delete';
import ContactsIcon from '@mui/icons-material/Contacts';
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import axios from "axios";
import {
  Modal,
  Button,
  Typography,
  Avatar,
  Stack,
  Paper,
} from '@mui/material'
import { Carousel } from 'react-carousel-minimal'
import {MdDateRange} from 'react-icons/md'
import {GrMap} from 'react-icons/gr'



function ItemPage() {
  const [item, setItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const [loading, setloading] = useState(false);
  const [slides, setSlides] = useState([])


  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleCloseContact = () => setShowContact(false);
  const handleShowContact = () => setShowContact(true);

  const handleShow = () => setShow(true);


  setConstraint(true);
  const queryParams = new URLSearchParams(window.location.search);

  

  const item_id = queryParams.get('cid');


  const current_user = queryParams.get('type').split("/")[1];

  console.log(current_user)
  
  useEffect(() => {
    axios({
      url: `http://localhost:4000/items/${item_id}`,
      method: "GET",
    })
      .then((response) => {
        // console.log(response.data);
        const data = response.data.item;
        
          let slides = []
      
          data.img.map((item) => {
              slides.push({ image: item })
          })
      
      
        
        setItem(response.data.item);
        console.log(response.data.item);

        let created_date = new Date(data.createdAt);
        let createdAt =
          created_date.getDate() +
          "/" +
          created_date.getMonth() +
          "/" +
          created_date.getFullYear() +
          " " +
          created_date.getHours() +
          ":" +
          created_date.getMinutes();


          const itemDetails = (
            <Stack
              width="100%"
              px={{ xs: 2, sm: 5, md: 10 }}
              spacing={3}
              mt={2}
              mb={4}
            >
              <Stack
                direction={{ xs: 'column', lg: 'row' }}
                spacing={3}
                width="100%"
                alignItems="stretch"
              >
                <Paper
                  elevation={3}
                  sx={{
                    flex: 1,
                    borderRadius: '24px',
                    p: { xs: 2, md: 3 },
                    background: 'linear-gradient(145deg, #f8fbff, #e7eeff)',
                  }}
                >
                  <Carousel
                    data={slides}
                    width="100%"
                    height="270px"
                    radius="18px"
                    dots={false}
                    automatic={false}
                    slideBackgroundColor="transparent"
                    slideImageFit="contain"
                    thumbnails={false}
                    thumbnailWidth="100px"
                  />
                </Paper>

                <Paper
                  elevation={4}
                  sx={{
                    width: { xs: '100%', lg: '360px' },
                    borderRadius: '24px',
                    background: 'linear-gradient(160deg, #1e88e5, #5c6bc0)',
                    color: '#fff',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      src={data?.userId?.img}
                      alt={data?.userId?.fullname || 'User avatar'}
                      sx={{
                        width: { xs: 70, sm: 90 },
                        height: { xs: 70, sm: 90 },
                        border: '3px solid rgba(255,255,255,0.3)',
                      }}
                    />
                    <Stack spacing={0.5}>
                      <Typography fontSize={{ xs: 18, sm: 22 }} fontWeight="bold">
                        {data?.userId?.fullname || 'Lost & Found User'}
                      </Typography>
                      <Typography fontSize={14} sx={{ opacity: 0.8 }}>
                        Item Owner
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack spacing={1}>
                    <Typography fontSize={13} sx={{ opacity: 0.8 }}>
                      Item Type
                    </Typography>
                    <Typography fontWeight="bold" fontSize={18}>
                      {data?.type}
                    </Typography>
                    <Typography fontSize={14} sx={{ opacity: 0.8 }}>
                      Item Name
                    </Typography>
                    <Typography fontWeight="bold" fontSize={20}>
                      {data?.name}
                    </Typography>
                  </Stack>

                  {current_user === "true" ? (
                    <Button
                      startIcon={<DeleteIcon />}
                      variant="contained"
                      color="inherit"
                      sx={{
                        mt: 1,
                        textTransform: 'none',
                        color: '#1e88e5',
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.9)',
                        },
                      }}
                      onClick={handleShowDelete}
                    >
                      <motion.div
                        whileHover={{ scale: [null, 1.05, 1.05] }}
                        transition={{ duration: 0.4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Delete Post
                      </motion.div>
                    </Button>
                  ) : (
                    <Button
                      startIcon={<ContactsIcon />}
                      variant="contained"
                      color="inherit"
                      sx={{
                        mt: 1,
                        textTransform: 'none',
                        color: '#1e88e5',
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.9)',
                        },
                      }}
                      onClick={handleShowContact}
                    >
                      <motion.div
                        whileHover={{ scale: [null, 1.05, 1.05] }}
                        transition={{ duration: 0.4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Contact
                      </motion.div>
                    </Button>
                  )}
                </Paper>
              </Stack>

              <Paper
                elevation={1}
                sx={{
                  borderRadius: '24px',
                  p: { xs: 2.5, md: 3.5 },
                  backgroundColor: '#fefefe',
                }}
              >
                <Typography fontSize="18px" fontWeight="bold" mb={1.5}>
                  Description
                </Typography>
                <Typography
                  fontSize="16px"
                  sx={{
                    lineHeight: 1.8,
                    color: '#4a4a4a',
                    textAlign: 'justify',
                  }}
                >
                  {data.description}
                </Typography>
              </Paper>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <Paper
                  elevation={2}
                  sx={{
                    flex: 1,
                    borderRadius: '20px',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    backgroundColor: '#eef4ff',
                  }}
                >
                  <MdDateRange fontSize={32} color="#1e88e5" />
                  <Stack spacing={0.5}>
                    <Typography fontSize={14} color="text.secondary">
                      Date Found
                    </Typography>
                    <Typography fontSize={18} fontWeight="bold">
                      {data?.date}
                    </Typography>
                  </Stack>
                </Paper>

                <Paper
                  elevation={2}
                  sx={{
                    flex: 1,
                    borderRadius: '20px',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    backgroundColor: '#eef4ff',
                  }}
                >
                  <GrMap fontSize={32} color="#1e88e5" />
                  <Stack spacing={0.5}>
                    <Typography fontSize={14} color="text.secondary">
                      Location Found
                    </Typography>
                    <Typography fontSize={18} fontWeight="bold">
                      {data?.location}
                    </Typography>
                  </Stack>
                </Paper>
              </Stack>
            </Stack>
          );
        setItemDetails(itemDetails);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  },[]);

  const delete_item = () => {
    console.log("deleted");
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error("You must be logged in to delete items");
      handleCloseDelete();
      return;
    }

    console.log("Token being sent:", token);
    console.log("Item ID:", item_id);

    axios({
      url: `http://localhost:4000/items/delete/${item_id}`,
      method: "DELETE",
      headers: {
        token: token
      }
    })
      .then((response) => {
        console.log("Success response:", response);
        handleCloseDelete();
        toast.success('Item kicked to 🗑️ successfully!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        setTimeout(() => {
          window.location.href="/mylistings"
        }, 1000);
      })
      .catch((err) => {
        console.error("Delete error:", err);
        console.error("Error response:", err.response);
        console.error("Error data:", err.response?.data);
        console.error("Error status:", err.response?.status);
        handleCloseDelete();
        
        if (err.response?.status === 401) {
          toast.error("Your session has expired. Please log in again.");
          setTimeout(() => {
            localStorage.clear();
            window.location.href = "/log-in";
          }, 2000);
        } else {
          toast.error(err.response?.data?.msg || "Failed to delete item");
        }
      });
  };

  

  return (
    <>
    <Stack width='100%' alignItems='center'>
            <Stack
            direction="row"
            width="100%"
            sx={{ backgroundColor: 'primary.main' }}
            height="125px"
            gap="4px"
            alignItems="center"
            justifyContent="center"
        >
            <Stack
                spacing={0}
                position="relative"
                justifyContent="center"
                width="100%"
                maxWidth="1440px"
                height="125px"
                overflow="hidden"
                ml={{xs: 3, sm: 5, md: 10}}
            >
                    
                        <Typography fontSize={{xs: '18px',sm: '22px', md: '25px'}} color="white" fontWeight="">
                        {`${item?.type} Item`}
                        </Typography>

                        <Typography
                            fontSize={{xs: '17px',sm: '21px', md: '23px'}} 
                            color="white"
                            fontWeight="bold"
                        >
                            {'Someone Found'} {item?.name}
                        </Typography>
                   
                    </Stack>
            </Stack>
            <Stack
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '1440px',
                    pb: 6,
                }}
            >
                {itemDetails}
            </Stack>
        </Stack>
        <Modal
                      open={showDelete}
                      onClose={handleCloseDelete}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Stack
                    alignItems="center"
                    justifyContent="center"
                    gap="20px"
                    sx={{
                        
                        borderRadius: '20px',
                        backgroundColor: '#eff5ff',

                        width: '410px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: 24,
                        p: 6,
                    }}
                >
                    <Typography
                            fontSize="18px"
                            component="div"
                            m="0"
                            fontWeight="bold"
                          >
                            Are you sure ?
                          </Typography>
                        <Stack direction="row" width="100%"
                          justifyContent="space-evenly"
                          alignItems="center"
                          spacing={2}
                          >
                          
                          <Button
                            variant="contained"
                            color={'primary'}
                            sx={{
                              textTransform: 'none',
                              borderRadius: '8px',
                            }}
                            onClick={delete_item}
                          >
                            <motion.div
                              whileHover={{ scale: [null, 1.05, 1.05] }}
                              transition={{ duration: 0.4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Yes
                            </motion.div>
                          </Button>
                          <Button
                            variant="contained"
                            color={'primary'}
                            sx={{
                              textTransform: 'none',
                              borderRadius: '8px',
                            }}
                            onClick={handleCloseDelete}
                          >
                            <motion.div
                              whileHover={{ scale: [null, 1.05, 1.05] }}
                              transition={{ duration: 0.4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              No
                            </motion.div>
                          </Button>
                        </Stack>
                        </Stack>
                      </Modal>

                      <Modal
                      open={showContact}
                      onClose={handleCloseContact}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Stack
                    alignItems="center"
                    justifyContent="center"
                    gap="20px"
                    sx={{
                        
                        borderRadius: '20px',
                        backgroundColor: '#eff5ff',

                        width: '410px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: 24,
                        p: 6,
                    }}
                >
                    <Typography
                            fontSize="18px"
                            component="div"
                            m="0"
                            fontWeight="bold"
                          >
                            {item?.userId?.fullname}'s Contact :
                          </Typography>
                          <Stack direction="row" width="100%"
                          justifyContent="space-evenly"
                          alignItems="center"
                          spacing={2}
                          >
                            <Typography
                            fontSize="16px"
                            component="div"
                            m="0"
                            >
                            {item?.number}
                            </Typography>
                          </Stack>
                       
                        </Stack>
                      </Modal>


    </>
  );
}

export default ItemPage;
