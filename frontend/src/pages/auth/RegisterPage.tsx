import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Link,
  Collapse,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../store/AuthContext';
import { RegisterFormValues, registerSchema } from '../../models/schemas/registerSchema';

function RegisterPage() {
  const { t } = useTranslation();
  const [serverError, setServerError] = useState<string | null>(null);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);
    try {
      await registerUser({ username: data.username, password: data.password });
      navigate('/tasks');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setServerError(t('auth.register.usernameExists'));
      } else {
        setServerError(t('auth.register.unexpectedError'));
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            {t('auth.register.title')}
          </Typography>

          <Collapse in={!!serverError}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {serverError}
            </Alert>
          </Collapse>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              label={t('auth.register.username')}
              margin="normal"
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username ? t(errors.username.message!) : ''}
              disabled={isSubmitting}
            />
            <TextField
              fullWidth
              label={t('auth.register.password')}
              type="password"
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password ? t(errors.password.message!) : ''}
              disabled={isSubmitting}
            />
            <TextField
              fullWidth
              label={t('auth.register.confirmPassword')}
              type="password"
              margin="normal"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword ? t(errors.confirmPassword.message!) : ''}
              disabled={isSubmitting}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : t('auth.register.submit')}
            </Button>

            <Typography variant="body2" align="center">
              {t('auth.register.haveAccount')}{' '}
              <Link component={RouterLink} to="/login" sx={{ fontWeight: 'bold' }}>
                {t('auth.register.loginHere')}
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegisterPage;
