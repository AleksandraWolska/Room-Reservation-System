import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface UserRegister {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<UserRegister>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', width: '100%', maxWidth: 400, m: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Register</Typography>
      <TextField
        name="firstname"
        label="First Name"
        variant="outlined"
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        name="lastname"
        label="Last Name"
        variant="outlined"
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        variant="outlined"
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </Box>
  );
};
