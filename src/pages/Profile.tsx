import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../utils/api';
import { User } from '../types/User';
import { Box, Button, Card, CardContent, Typography, CircularProgress, Avatar, Grid } from '@mui/material';

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers()
      .then(users => {
        setUser(users[0]);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load user');
        setLoading(false);
      });
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  if (error) return <Box color="error.main" mt={4}>{error}</Box>;
  if (!user) return null;

  return (
    <Box maxWidth={600} mx="auto" mt={6}>
      <Button variant="outlined" onClick={() => navigate('/')}>{'< Back to Dashboard'}</Button>
      <Card sx={{ mt: 3, p: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 64, height: 64 }}>{user.name.split(' ').map(n => n[0]).join('')}</Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h5">{user.name}</Typography>
              <Typography color="text.secondary">{user.email}</Typography>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Typography variant="subtitle2">User ID</Typography>
            <Typography mb={1}>{user.id}</Typography>
            <Typography variant="subtitle2">Email ID</Typography>
            <Typography mb={1}>{user.email}</Typography>
            <Typography variant="subtitle2">Phone</Typography>
            <Typography mb={1}>{user.phone}</Typography>
            <Typography variant="subtitle2">Address</Typography>
            <Typography mb={1}>{user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile; 