import { Box, Container, Typography } from '@mui/material';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          Tasksks © {currentYear}
        </Typography>
      </Container>
    </Box>
  );
}
