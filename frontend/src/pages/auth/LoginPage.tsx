import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CircularProgress,
  Link,
  Alert,
  Collapse,
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../store/AuthContext';
import { TokenPayload } from '../../models/payload/TokenPayload';
import { LoginFormValues, loginSchema } from '../../models/schemas/loginSchema';

function LoginPage() {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login, isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  useEffect(() => {
    if (isAuthenticated) {
      const target = currentUser?.role === 'ROLE_ADMIN' ? '/admin' : '/tasks';
      navigate(target);
    }
  }, [isAuthenticated, currentUser, navigate]);

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMessage(null);

    try {
      const response = await login(data);

      if (response && response.token) {
        const payload = jwtDecode<TokenPayload>(response.token);
        const target = payload.role === 'ROLE_ADMIN' ? '/admin' : '/tasks';
        navigate(target);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage(t('auth.login.invalidCredentials'));
      } else {
        setErrorMessage(t('auth.login.unexpectedError'));
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            {t('auth.login.title')}
          </Typography>

          <Collapse in={!!errorMessage}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          </Collapse>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              label={t('auth.login.username')}
              margin="normal"
              autoComplete="username"
              disabled={isSubmitting}
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username ? t(errors.username.message!) : ''}
            />

            <TextField
              fullWidth
              label={t('auth.login.password')}
              type="password"
              margin="normal"
              autoComplete="current-password"
              disabled={isSubmitting}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password ? t(errors.password.message!) : ''}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : t('auth.login.submit')}
            </Button>

            <Box textAlign="center">
              <Typography variant="body2">
                {t('auth.login.noAccount')}{' '}
                <Link component={RouterLink} to="/register" sx={{ fontWeight: 'bold' }}>
                  {t('auth.login.registerHere')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
