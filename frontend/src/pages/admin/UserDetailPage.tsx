import { useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { ArrowBack as ArrowBackIcon, CheckCircle } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useUser, useUserTasks } from '../../hooks/useUsers';
import { Role } from '../../models/enums/Role';

function UserDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = Number(id);
  const [taskPage, setTaskPage] = useState(1);

  const { data: user, isLoading: userLoading, error: userError } = useUser(userId);
  const { data: taskPageData, isLoading: tasksLoading } = useUserTasks(userId, taskPage - 1);

  if (userLoading || tasksLoading) {
    return <CircularProgress />;
  }

  if (userError || !user) {
    return <Alert severity="error">{t('admin.userDetail.notFound')}</Alert>;
  }

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/admin')} sx={{ mb: 3 }}>
        {t('admin.userDetail.back')}
      </Button>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {user.username}
          </Typography>

          <Typography color="text.secondary">
            {t('admin.userDetail.roleLabel')}:{' '}
            {user.role === Role.ROLE_ADMIN ? t('admin.userDetail.role.admin') : t('admin.userDetail.role.user')}
          </Typography>

          <Typography color="text.secondary">
            {t('admin.userDetail.registered')}: {new Date(user.createdAt).toLocaleDateString(i18next.language)}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" mb={2}>
        {t('admin.userDetail.tasksTitle', {
          count: taskPageData?.totalElements || 0,
        })}
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {taskPageData?.totalElements === 0 ? (
        <Typography>{t('admin.userDetail.noTasks')}</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {taskPageData?.content.map((task) => (
            <Card key={task.id} variant="outlined">
              <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }}
                  >
                    {task.title}
                  </Typography>

                  {task.completed && <CheckCircle color="success" fontSize="small" />}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {t('admin.userDetail.dueDate')}: {new Date(task.dueDate).toLocaleDateString(i18next.language)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {taskPageData && taskPageData.totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={taskPageData.totalPages}
            page={taskPage}
            onChange={(_, v) => setTaskPage(v)}
            color="primary"
            variant="outlined"
          />
        </Box>
      )}
    </Box>
  );
}

export default UserDetailPage;
