import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  Alert,
  FormControl,
  Stack,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Pagination,
  useTheme,
} from '@mui/material';
import { Add as AddIcon, FilterListOff as FilterListOffIcon } from '@mui/icons-material';
import { ChangeEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Priority } from '../../models/enums/Priority';
import { Tag } from '../../models/enums/Tag';
import { useFilteredTasks } from '../../hooks/useTasks';
import { TaskFilters } from '../../models/TaskFilters';
import { TaskCard } from '../../components/TaskCard';

function TaskListPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<TaskFilters>({
    title: '',
    priority: undefined,
    tag: undefined,
    completed: undefined,
  });
  const [debouncedTitle, setDebouncedTitle] = useState(filters.title);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTitle(filters.title), 500);
    return () => clearTimeout(timer);
  }, [filters.title]);

  useEffect(() => setPage(1), [filters, debouncedTitle]);

  const {
    data: pageData,
    isLoading,
    isFetching,
    error,
  } = useFilteredTasks({ ...filters, title: debouncedTitle }, page - 1);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value === '' ? undefined : value }));
  };

  if (error)
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {t('tasks.list.error', { message: (error as Error).message })}
      </Alert>
    );

  return (
    <Box sx={{ pb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          {t('tasksTitle')}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/tasks/new')}>
          {t('tasks.list.newTask')}
        </Button>
      </Box>

      <Card
        variant="outlined"
        sx={{
          mb: 4,
          p: 2,
          borderRadius: 2,
          bgcolor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'background.paper',
        }}
      >
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label={t('tasks.list.filters.search')}
              name="title"
              size="small"
              value={filters.title || ''}
              onChange={handleFilterChange}
              fullWidth
            />
            <FormControl size="small" fullWidth>
              <InputLabel>{t('tasks.list.filters.priority')}</InputLabel>
              <Select
                name="priority"
                label={t('tasks.list.filters.priority')}
                value={filters.priority || ''}
                onChange={handleFilterChange}
              >
                <MenuItem value="">{t('tasks.list.filters.all')}</MenuItem>
                {Object.values(Priority).map((p) => (
                  <MenuItem key={p} value={p}>
                    {t(`priority.${p}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>{t('tasks.list.filters.tag')}</InputLabel>
              <Select
                name="tag"
                label={t('tasks.list.filters.tag')}
                value={filters.tag || ''}
                onChange={handleFilterChange}
              >
                <MenuItem value="">{t('tasks.list.filters.all')}</MenuItem>
                {Object.values(Tag).map((ta) => (
                  <MenuItem key={ta} value={ta}>
                    {t(`tag.${ta}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filters.completed}
                  onChange={(e) => setFilters((p) => ({ ...p, completed: e.target.checked ? true : undefined }))}
                  color="primary"
                />
              }
              label={t('tasks.list.filters.completedOnly')}
            />
            <Button
              size="small"
              startIcon={<FilterListOffIcon />}
              onClick={() => {
                setFilters({ title: '', priority: undefined, tag: undefined, completed: undefined });
                setPage(1);
              }}
              color="inherit"
            >
              {t('tasks.list.filters.clear')}
            </Button>
          </Box>
        </Stack>
      </Card>

      {(isLoading || isFetching) && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress size={24} />
        </Box>
      )}

      {pageData?.content?.length === 0 && !isLoading ? (
        <Alert severity="info">{t('tasks.list.empty')}</Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {pageData?.content?.map((task) => (
              <TaskCard key={task.id} task={task} theme={theme} onClick={() => navigate(`/tasks/${task.id}`)} />
            ))}
          </Grid>
          {pageData && pageData.totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={5}>
              <Pagination
                count={pageData.totalPages}
                page={page}
                onChange={(_, v) => {
                  setPage(v);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                color="primary"
                variant="outlined"
                shape="rounded"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default TaskListPage;
