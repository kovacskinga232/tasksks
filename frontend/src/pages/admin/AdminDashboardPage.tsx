import { Box, Grid, Card, CardContent, Typography, CircularProgress, Alert, Pagination } from '@mui/material';
import { People as PeopleIcon, AdminPanelSettings as AdminIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../../hooks/useUsers';
import UserManagementTable from '../../components/UserManagementTable';

function AdminDashboardPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data: pageData, isLoading: usersLoading, error: usersError } = useUsers(page - 1);

  if (usersLoading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (usersError) {
    return <Alert severity="error">{t('admin.dashboard.loadingError')}</Alert>;
  }

  const stats = [
    {
      label: t('admin.dashboard.stats.totalUsers'),
      value: pageData?.totalElements || 0,
      icon: <PeopleIcon color="primary" fontSize="large" />,
    },
    {
      label: t('admin.dashboard.stats.adminsOnPage'),
      value: pageData?.content.filter((u) => u.role === 'ROLE_ADMIN').length || 0,
      icon: <AdminIcon color="secondary" fontSize="large" />,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        {t('admin.dashboard.title')}
      </Typography>

      <Grid container spacing={3} mb={5}>
        {stats.map((stat) => (
          <Grid item xs={12} sm key={stat.label}>
            <Card elevation={3}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {stat.icon}
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {stat.label}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" mb={2}>
        {t('admin.dashboard.userManagement')}
      </Typography>
      <UserManagementTable users={pageData?.content || []} />

      {pageData && pageData.totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination count={pageData.totalPages} page={page} onChange={(_, v) => setPage(v)} color="primary" />
        </Box>
      )}
    </Box>
  );
}

export default AdminDashboardPage;
