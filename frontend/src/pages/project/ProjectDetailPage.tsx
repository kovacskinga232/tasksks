import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Alert,
  Grid,
  Divider,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useProject, useDeleteProject } from '../../hooks/useProjects';
import { TaskCard } from '../../components/TaskCard';

function ProjectDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { data: project, isLoading, error } = useProject(Number(id));
  const deleteProjectMutation = useDeleteProject();

  const handleDelete = async () => {
    await deleteProjectMutation.mutateAsync(Number(id));
    navigate('/projects');
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !project) {
    return <Alert severity="error">{t('projects.details.error')}</Alert>;
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/projects')} sx={{ mr: 2 }}>
          {t('projects.details.back')}
        </Button>

        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {project.name}
        </Typography>

        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/projects/${id}/edit`)}
          sx={{ mr: 1 }}
        >
          {t('projects.details.edit')}
        </Button>

        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => setOpenDeleteDialog(true)}>
          {t('projects.details.delete')}
        </Button>
      </Box>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>{t('projects.details.deleteTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('projects.details.deleteConfirm')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>{t('projects.details.cancel')}</Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={deleteProjectMutation.isPending}>
            {deleteProjectMutation.isPending ? t('projects.details.deleting') : t('projects.details.delete')}
          </Button>
        </DialogActions>
      </Dialog>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="body1" paragraph>
            {project.description || t('projects.details.noDescription')}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t('projects.details.createdAt')}: {new Date(project.createdAt).toLocaleDateString(i18next.language)}
          </Typography>
        </CardContent>
      </Card>

      <Box mb={2}>
        <Typography variant="h5" gutterBottom>
          {t('projects.details.tasks')} ({project.tasks.length})
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {project.tasks.length === 0 ? (
          <Typography color="text.secondary">{t('projects.details.noTasks')}</Typography>
        ) : (
          <Grid container spacing={2}>
            {project.tasks.map((task) => (
              <TaskCard key={task.id} task={task} theme={theme} onClick={() => navigate(`/tasks/${task.id}`)} />
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default ProjectDetailPage;
