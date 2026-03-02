import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPinIcon, 
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Button, Typography, Pagination, Stack, Chip, TextField, InputAdornment } from '@mui/material';
import Axios from "axios";
import { toast } from 'react-toastify';

const LostItemsModern = () => {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const user_info = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoading(true);
    Axios({
      url: "http://localhost:4000/items",
      method: "GET",
    })
      .then((response) => {
        const lostItems = response.data.items
          .reverse()
          .filter(item => item.type === "Lost");
        
        setAllItems(lostItems);
        paginateItems(lostItems, page, searchQuery);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        toast.error("Failed to load lost items");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    paginateItems(allItems, page, searchQuery);
  }, [page, searchQuery]);

  const paginateItems = (items, currentPage, query) => {
    // Filter by search query
    let filteredItems = items;
    if (query) {
      filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.location?.toLowerCase().includes(query.toLowerCase())
      );
    }

    const itemsPerPage = 9;
    setMaxPages(Math.ceil(filteredItems.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setItems(filteredItems.slice(startIndex, endIndex));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, rgb(239 68 68), rgb(220 38 38))'
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
              Lost Items
            </Typography>
            <Typography
              variant="h6"
              className="text-white opacity-90"
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              Browse through items people have lost. Help them find their belongings!
            </Typography>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <TextField
            fullWidth
            placeholder="Search by name, description, or location..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: 'gray.50'
              }
            }}
          />
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
              No lost items found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {searchQuery ? 'Try a different search query' : 'No one has reported any lost items yet'}
            </Typography>
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
                    background: 'linear-gradient(135deg, rgb(254 202 202), rgb(252 165 165))'
                  }}>
                    <img
                      src={item.img || 'https://via.placeholder.com/400'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <Chip
                      label="LOST"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'error.main',
                        color: 'white',
                        fontWeight: 600,
                        px: 1
                      }}
                    />
                    {item.userId === user_info?._id && (
                      <Chip
                        label="Your Post"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          bgcolor: 'primary.main',
                          color: 'white',
                          fontWeight: 600,
                          px: 1
                        }}
                      />
                    )}
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
                      {item.location && (
                        <div className="flex items-start gap-2 text-gray-600">
                          <MapPinIcon className="w-5 h-5 mt-0.5 shrink-0 text-red-500" />
                          <Typography variant="body2" className="line-clamp-1">
                            {item.location}
                          </Typography>
                        </div>
                      )}

                      <div className="flex items-start gap-2 text-gray-600">
                        <ClockIcon className="w-5 h-5 mt-0.5 shrink-0 text-red-500" />
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

                    {/* Action Button */}
                    <Button
                      component={Link}
                      to={`/${item.name}?cid=${item._id}&type=${item.type}`}
                      variant="contained"
                      color="error"
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        mt: 2
                      }}
                    >
                      View Details
                    </Button>
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
              color="error"
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

export default LostItemsModern;
