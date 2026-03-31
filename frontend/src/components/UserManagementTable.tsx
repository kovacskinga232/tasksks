import { useState } from 'react';
import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { Delete as DeleteIcon, SwapHoriz as RoleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../store/AuthContext';
import { useDeleteUser } from '../hooks/useUsers';
import { useUpdateRole } from '../hooks/useAdmin';
import { UserResponse } from '../models/payload/UserResponse';
import { Role } from '../models/enums/Role';

interface UserTableProps {
  users: UserResponse[];
}

function UserManagementTable({ users }: UserTableProps) {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const deleteMutation = useDeleteUser();
  const updateRoleMutation = useUpdateRole();

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [roleChangeData, setRoleChangeData] = useState<{ id: number; username: string; newRole: Role } | null>(null);

  const handleRoleChangeRequest = (id: number, username: string, currentRole: Role) => {
    const newRole = currentRole === Role.ROLE_ADMIN ? Role.ROLE_USER : Role.ROLE_ADMIN;
    setRoleChangeData({ id, username, newRole });
  };

  const confirmRoleChange = () => {
    if (roleChangeData) {
      updateRoleMutation.mutate(
        { id: roleChangeData.id, role: roleChangeData.newRole },
        { onSuccess: () => setRoleChangeData(null) },
      );
    }
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  return (
    <>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">{t('admin.table.username')}</TableCell>
              <TableCell align="center">{t('admin.table.role')}</TableCell>
              <TableCell align="center">{t('admin.table.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => {
              const isSelf = user.id === currentUser?.id;
              const isUpdating = updateRoleMutation.isPending && updateRoleMutation.variables?.id === user.id;

              return (
                <TableRow
                  key={user.id}
                  hover
                  onClick={() => navigate(`/admin/users/${user.id}`)}
                  sx={{
                    cursor: 'pointer',
                    opacity: isSelf ? 0.8 : 1,
                  }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    {user.username} {isSelf && ` ${t('admin.table.you')}`}
                  </TableCell>
                  <TableCell align="center">
                    {isUpdating ? (
                      <CircularProgress size={20} />
                    ) : (
                      <Chip
                        label={user.role === 'ROLE_ADMIN' ? t('admin.role.ADMIN') : t('admin.role.USER')}
                        color={user.role === 'ROLE_ADMIN' ? 'secondary' : 'default'}
                        size="small"
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={isSelf ? t('admin.tooltip.cannotModifySelf') : t('admin.tooltip.changeRole')}>
                      <span>
                        <IconButton
                          color="primary"
                          disabled={isSelf || isUpdating}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRoleChangeRequest(user.id, user.username, user.role);
                          }}
                        >
                          <RoleIcon />
                        </IconButton>
                      </span>
                    </Tooltip>

                    <Tooltip title={isSelf ? t('admin.tooltip.cannotDeleteSelf') : t('admin.tooltip.deleteUser')}>
                      <span>
                        <IconButton
                          color="error"
                          disabled={isSelf || deleteMutation.isPending}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteId(user.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={roleChangeData !== null} onClose={() => setRoleChangeData(null)}>
        <DialogTitle>{t('admin.dialog.changeRoleTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('admin.dialog.changeRoleText', {
              username: roleChangeData?.username,
              role: roleChangeData?.newRole === Role.ROLE_ADMIN ? t('admin.role.ADMIN') : t('admin.role.USER'),
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRoleChangeData(null)}>{t('admin.dialog.cancel')}</Button>

          <Button
            onClick={confirmRoleChange}
            color="primary"
            variant="contained"
            disabled={updateRoleMutation.isPending}
          >
            {updateRoleMutation.isPending ? t('admin.dialog.updating') : t('admin.dialog.update')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
        <DialogTitle>{t('admin.dialog.confirmTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('admin.dialog.deleteText')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>{t('admin.dialog.cancel')}</Button>

          <Button
            onClick={confirmDelete}
            color="error"
            autoFocus
            variant="contained"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? t('admin.dialog.deleting') : t('admin.dialog.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserManagementTable;
