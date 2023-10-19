import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Typography, Button, Avatar } from '@mui/material';
export default function Profile() {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 5,
        }}
      >
        <Avatar
          alt="User Avatar"
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
          sx={{ width: 150, height: 150, mb: 2 }}
        />
        <Typography variant="h4" sx={{ mb: 2 }}>
          Rizwan Rana
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Web Developer
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          I'm a passionate web developer with several years of experience in creating web applications.
        </Typography>
        <Button variant="contained" color="primary">
          Edit Profile
        </Button>
      </Box>
    </Container>
  );
}
