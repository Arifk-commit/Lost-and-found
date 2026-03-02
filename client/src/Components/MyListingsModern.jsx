import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPinIcon, 
  ClockIcon, 
  TrashIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Button, Typography, Pagination, Stack, Box, Chip } from '@mui/material';
import Axios from "axios";
import { toast } from 'react-toastify';

const MyListingsModern = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'lost', 'found'

  const getUserId = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return user ? user : null;
  };

  const user_info = getUserId();

  useEffect(() => {
    setLoading(true);
    Axios({
      url: "http://localhost:4000/items",
      method: "GET",
    })
      .then((response) => {
        const allItems = response.data.items.reverse();
        
        // Filter by user and type
        let userItems = allItems.filter(item => item.userId === user_info._id);
        if (filter !== 'all') {
          userItems = userItems.filter(item => item.type.toLowerCase() === filter);
        }

        const itemsPerPage = 9;
        setMaxPages(Math.ceil(userItems.length / itemsPerPage));
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = userItems.slice(startIndex, endIndex);
        
        setItems(paginatedItems);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        toast.error("Failed to load items");
        setLoading(false);
      });
  }, [page, filter]);

  const handleDelete = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error("You must be logged in to delete items");
        return;
      }

      console.log("Deleting item:", itemId);
      console.log("Token:", token);
      
      Axios.delete(`http://localhost:4000/items/delete/${itemId}`, {
        headers: {
          token: token
        }
      })
        .then((response) => {
          console.log("Delete response:", response);
          toast.success("Item deleted successfully");
          // Remove item from the current display
          setItems(items.filter(item => item._id !== itemId));
        })
        .catch((err) => {
          console.error("Delete error:", err);
          console.error("Error response:", err.response);
          toast.error(err.response?.data?.msg || "Failed to delete item");
        });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, rgb(59 130 246), rgb(37 99 235))'
      }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              className="text-white font-bold mb-2"
              sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}
            >
              My Listings
            </Typography>
            <Typography
              variant="h6"
              className="text-white opacity-90"
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              Welcome back, {user_info?.nickname || 'User'}! Here are your posted items
            </Typography>
          </motion.div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-3 flex-wrap">
            {['all', 'lost', 'found'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setFilter(type);
                  setPage(1);
                }}
                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  filter === type
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} Items
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="loading-skeleton h-96 rounded-2xl"></div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <MagnifyingGlassIcon className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <Typography variant="h5" color="text.secondary" className="mb-2">
              No items found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              You haven't posted any {filter !== 'all' ? filter : ''} items yet
            </Typography>
            <Button
              component={Link}
              to="/postitem"
              variant="contained"
              sx={{ mt: 3, borderRadius: 3 }}
            >
              Post Your First Item
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden" style={{
                    background: 'linear-gradient(135deg, rgb(219 234 254), rgb(191 219 254))'
                  }}>
                    <img
                      src={item.img || 'https://via.placeholder.com/400'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <Chip
                      label={item.type}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: item.type === 'Lost' ? 'error.main' : 'success.main',
                        color: 'white',
                        fontWeight: 600,
                        px: 1
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <Typography
                      variant="h6"
                      className="font-bold mb-3 truncate"
                      sx={{ fontSize: '1.25rem' }}
                    >
                      {item.name}
                    </Typography>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2 text-gray-600">
                        <MapPinIcon className="w-5 h-5 mt-0.5 shrink-0 text-blue-500" />
                        <Typography variant="body2" className="line-clamp-1">
                          {item.location || 'No location specified'}
                        </Typography>
                      </div>

                      <div className="flex items-start gap-2 text-gray-600">
                        <ClockIcon className="w-5 h-5 mt-0.5 shrink-0 text-blue-500" />
                        <Typography variant="body2">
                          {formatDate(item.createdAt)}
                        </Typography>
                      </div>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="line-clamp-2 mt-2"
                      >
                        {item.description}
                      </Typography>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <Button
                        component={Link}
                        to={`/${item.name}?cid=${item._id}&type=${item.type}/true`}
                        variant="contained"
                        size="small"
                        fullWidth
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600
                        }}
                      >
                        View Details
                      </Button>
                      
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-300"
                        title="Delete"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {!loading && items.length > 0 && (
          <Stack alignItems="center" sx={{ mt: 6 }}>
            <Pagination
              count={maxPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </div>
    </div>
  );
};

export default MyListingsModern;
