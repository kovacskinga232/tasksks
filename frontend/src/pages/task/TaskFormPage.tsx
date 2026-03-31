import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  Grid,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useTask, useUpdateTask } from '../../hooks/useTasks';
import { useAddTaskToUser } from '../../hooks/useUsers';
import { useAuth } from '../../store/AuthContext';
import { Priority } from '../../models/enums/Priority';
import { Tag } from '../../models/enums/Tag';
import { TaskFormValues, taskSchema } from '../../models/schemas/taskSchema';
import { useProjects } from '../../hooks/useProjects';

function TaskFormPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isEditMode = !!id;
  const { data: task, isLoading: isLoadingTask } = useTask(Number(id));

  const { data: projectsPage } = useProjects(0);
  const projects = projectsPage?.content ?? [];

  const addTaskMutation = useAddTaskToUser();
  const updateTaskMutation = useUpdateTask();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: Priority.MEDIUM,
      tag: Tag.PERSONAL,
      completed: false,
      projectId: null,
    },
  });

  useEffect(() => {
    if (isEditMode && task) {
      reset({ ...task });
    }
  }, [task, isEditMode, reset]);

  const onSubmit = async (data: TaskFormValues) => {
    setAuthError(null);
    try {
      if (isEditMode) {
        await updateTaskMutation.mutateAsync({ id: Number(id), task: data });
        navigate(`/tasks/${id}`);
      } else {
        if (!currentUser?.id) {
          setAuthError(t('tasks.form.authError'));
          return;
        }
        const newTask = await addTaskMutation.mutateAsync({ userId: currentUser.id, task: data });
        navigate(`/tasks/${newTask.id}`);
      }
    } catch {
      setAuthError(t('tasks.form.saveError'));
    }
  };

  const getButtonLabel = () => {
    const isSaving = addTaskMutation.isPending || updateTaskMutation.isPending;
    if (isSaving) return isEditMode ? t('tasks.form.saving') : t('tasks.form.creating');
    return isEditMode ? t('tasks.form.save') : t('tasks.form.create');
  };

  if (isEditMode && isLoadingTask)
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  const fields: {
    name: keyof TaskFormValues;
    label: string;
    type?: string;
    multiline?: boolean;
    rows?: number;
    options?: string[];
  }[] = [
    { name: 'title', label: t('tasks.form.fields.title') },
    { name: 'description', label: t('tasks.form.fields.description'), multiline: true, rows: 4 },
    { name: 'dueDate', label: t('tasks.form.fields.dueDate'), type: 'date' },
    { name: 'priority', label: t('tasks.form.fields.priority'), options: Object.values(Priority) },
    { name: 'tag', label: t('tasks.form.fields.tag'), options: Object.values(Tag) },
  ];

  return (
    <Box maxWidth="md" mx="auto">
      <Stack direction="row" alignItems="center" mb={3} spacing={2}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/tasks')}>
          {t('tasks.details.back')}
        </Button>
        <Typography variant="h4" fontWeight="bold">
          {isEditMode ? t('tasks.form.editTitle') : t('tasks.form.newTitle')}
        </Typography>
      </Stack>

      {(authError || addTaskMutation.isError || updateTaskMutation.isError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {authError || t('tasks.form.saveError')}
        </Alert>
      )}

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              {fields.map((f) => (
                <Grid item xs={12} sm={f.options ? 3 : 12} key={f.name}>
                  <Controller
                    name={f.name}
                    control={control}
                    render={({ field }) =>
                      f.options ? (
                        <TextField {...field} select fullWidth label={f.label}>
                          {f.options.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                              {f.name === 'priority' ? t(`priority.${opt}`) : t(`tag.${opt}`)}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        <TextField
                          {...field}
                          fullWidth
                          label={f.label}
                          type={f.type}
                          multiline={f.multiline}
                          rows={f.rows}
                          InputLabelProps={f.type === 'date' ? { shrink: true } : undefined}
                          error={!!errors[f.name]}
                          helperText={errors[f.name] ? t(errors[f.name]!.message!) : ''}
                        />
                      )
                    }
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Controller
                  name="projectId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label={t('tasks.form.fields.project')}
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                    >
                      <MenuItem value="">{t('tasks.form.noProject')}</MenuItem>

                      {projects.map((project) => (
                        <MenuItem key={project.id} value={project.id}>
                          {project.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="completed"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                      }
                      label={t('tasks.form.fields.completed')}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} mt={2}>
                  <Button type="submit" variant="contained" fullWidth size="large">
                    {getButtonLabel()}
                  </Button>
                  <Button variant="outlined" onClick={() => navigate('/tasks')} fullWidth size="large">
                    {t('tasks.details.cancel')}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TaskFormPage;
