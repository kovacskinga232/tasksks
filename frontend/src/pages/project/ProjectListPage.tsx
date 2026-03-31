import { Box, Typography, Button, CircularProgress, Alert, useTheme, Grid } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../../hooks/useProjects';
import { ProjectCard } from '../../components/ProjectCard';

function ProjectListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { data, isLoading } = useProjects();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          {t('projects.title')}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/projects/new')}>
          {t('projects.newProject')}
        </Button>
      </Box>

      {data?.content.length === 0 && <Alert severity="info">{t('projects.empty')}</Alert>}

      <Grid container spacing={3}>
        {data?.content.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => navigate(`/projects/${project.id}`)}
            theme={theme}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default ProjectListPage;
