import { Box, Card, CardContent, Grid, Theme, Typography } from '@mui/material';
import { ProjectResponse } from '../models/payload/ProjectResponse';

interface ProjectCardProps {
  project: ProjectResponse;
  onClick: () => void;
  theme: Theme;
}

export function ProjectCard({ project, onClick, theme }: ProjectCardProps) {
  const borderColor = theme.palette.primary.main;

  return (
    <Grid item xs={12} sm={6} md={4} key={project.id}>
      <Card
        sx={{
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: '0.2s',
          bgcolor: 'background.paper',
          borderLeft: `6px solid ${borderColor}`,
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 4,
          },
        }}
        onClick={onClick}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box mb={1.5}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {project.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {project.description || ''}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
