import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import { Footer } from './Footer';

interface Props {
  children: ReactNode;
}

function Layout(props: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        {props.children}
      </Container>

      <Footer />
    </Box>
  );
}

export default Layout;
