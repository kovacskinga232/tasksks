import { Box, Card, CardContent, Chip, Grid, Theme, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TaskResponse } from '../models/payload/TaskResponse';
import { getPriorityColor } from '../utilities/getPriorityColor';
import { getTagColor } from '../utilities/getTagColor';

interface TaskCardProps {
  task: TaskResponse;
  onClick: () => void;
  theme: Theme;
}

export function TaskCard({ task, onClick, theme }: TaskCardProps) {
  const { t } = useTranslation();
  const pColor = getPriorityColor(task.priority);
  const borderColor = theme.palette.primary.main;

  return (
    <Grid item xs={12} sm={6} md={4} key={task.id}>
      <Card
        sx={{
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: '0.2s',
          bgcolor: 'background.paper',
          '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
          opacity: task.completed ? 0.7 : 1,
          borderLeft: task.completed ? 'none' : `6px solid ${borderColor}`,
        }}
        onClick={onClick}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box display="flex" justifyContent="space-between" mb={1.5}>
            <Chip label={t(`priority.${task.priority}`)} color={pColor} size="small" />
            <Chip label={t(`tag.${task.tag}`)} size="small" sx={{ bgcolor: getTagColor(task.tag), color: 'white' }} />
          </Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'text.secondary' : 'text.primary',
            }}
          >
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {t('deadline')}: {new Date(task.dueDate).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
