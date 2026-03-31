import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useTask, useDeleteTask } from '../../hooks/useTasks';
import { getPriorityColor } from '../../utilities/getPriorityColor';
import { getTagColor } from '../../utilities/getTagColor';

function TaskDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { data: task, isLoading, error } = useTask(Number(id));
  const deleteTaskMutation = useDeleteTask();

  const handleDelete = async () => {
    try {
      await deleteTaskMutation.mutateAsync(Number(id));
      navigate(-1);
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !task) {
    return (
      <Alert severity="error">
        {t('tasks.details.errorLoading')}: {error ? (error as Error).message : t('tasks.details.notFound')}
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          {t('tasks.details.back')}
        </Button>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          {t('tasks.details.detailsTitle')}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/tasks/${id}/edit`)}
          sx={{ mr: 1 }}
        >
          {t('tasks.details.edit')}
        </Button>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => setOpenDeleteDialog(true)}>
          {t('tasks.details.delete')}
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box display="flex" gap={1} mb={2}>
            <Chip label={t(`priority.${task.priority}`)} color={getPriorityColor(task.priority)} />
            <Chip label={t(`tag.${task.tag}`)} sx={{ bgcolor: getTagColor(task.tag), color: 'white' }} />
            {task.completed && <Chip label={t('tasks.details.completed')} />}
          </Box>

          <Typography variant="h5" component="h2" gutterBottom>
            {task.title}
          </Typography>

          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            {task.description}
          </Typography>

          <Box mt={3}>
            {task.projectName && (
              <Typography variant="body2" color="text.secondary">
                <strong>{t('tasks.details.project')}:</strong> {task.projectName}
              </Typography>
            )}

            <Typography variant="body2" color="text.secondary">
              <strong>{t('tasks.details.deadline')}:</strong>{' '}
              {new Date(task.dueDate).toLocaleDateString(i18next.language)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>{t('tasks.details.confirmDelete')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('tasks.details.deleteConfirm')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={deleteTaskMutation.isPending}>
            {deleteTaskMutation.isPending ? t('tasks.details.deleting') : t('tasks.details.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TaskDetailPage;
