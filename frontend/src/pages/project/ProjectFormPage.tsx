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
  Typography,
  CircularProgress,
  Alert,
  Stack,
  Grid,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';
import { useProject, useCreateProject, useUpdateProject } from '../../hooks/useProjects';
import { ProjectFormValues, projectSchema } from '../../models/schemas/projectSchema';

function ProjectFormPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { data: project, isLoading } = useProject(Number(id));
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (isEditMode && project) {
      reset({
        name: project.name,
        description: project.description ?? '',
      });
    }
  }, [project, isEditMode, reset]);

  const onSubmit = async (data: ProjectFormValues) => {
    setErrorMessage(null);

    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id: Number(id), project: data });
        navigate(`/projects/${id}`);
      } else {
        const created = await createMutation.mutateAsync(data);
        navigate(`/projects/${created.id}`);
      }
    } catch {
      setErrorMessage(t('projectForm.saveError'));
    }
  };

  const getButtonLabel = () => {
    const isSaving = createMutation.isPending || updateMutation.isPending;
    if (isSaving) return isEditMode ? t('projectForm.saving') : t('projectForm.creating');
    return isEditMode ? t('projectForm.save') : t('projectForm.create');
  };

  if (isEditMode && isLoading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth="md" mx="auto">
      <Stack direction="row" alignItems="center" mb={3} spacing={2}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/projects')}>
          {t('projectForm.back')}
        </Button>
        <Typography variant="h4" fontWeight="bold">
          {isEditMode ? t('projectForm.editProject') : t('projectForm.newProject')}
        </Typography>
      </Stack>

      {(errorMessage || createMutation.isError || updateMutation.isError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage || t('projectForm.saveError')}
        </Alert>
      )}

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={t('projectForm.projectName')}
                      error={!!errors.name}
                      helperText={errors.name ? t(errors.name.message!) : ''}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={t('projectForm.description')}
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description ? t(errors.description.message!) : ''}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} mt={2}>
                  <Button type="submit" variant="contained" fullWidth size="large">
                    {getButtonLabel()}
                  </Button>
                  <Button variant="outlined" onClick={() => navigate('/projects')} fullWidth size="large">
                    {t('projectForm.cancel')}
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

export default ProjectFormPage;
