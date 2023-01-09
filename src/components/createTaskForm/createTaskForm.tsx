import React, { FC, ReactElement, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { TaskTitleField } from './_taskTitleField';
import { TaskDescription } from './_taskDescription';
import { TaskDateField } from './_taskDateField';
import { TaskSelectorField } from './_taskSelectorField';
import { sendApiRequest } from '../../helpers/sendApiRequest';

import { Status } from './enums/Status';
import { Priority } from './enums/Priority';

export const CreateTaskForm: FC = (): ReactElement => {
  //Decalring State
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(Priority.normal);

  // Create a Task Mutation
  const createTaskMutation = useMutation((data) =>
    sendApiRequest('http://localhost:3200/tasks', 'POST', data),
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      <Alert severity="success" sx={{ width: '100%', marginBottom: '16px' }}>
        <AlertTitle>Success</AlertTitle>
        The Task has been created Successfully
      </Alert>
      <Typography mb={2} component="h2" variant="h6">
        Create A Task
      </Typography>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <TaskTitleField onChange={(e) => setTitle(e.target.value)} />
        <TaskDescription onChange={(e) => setDescription(e.target.value)} />
        <TaskDateField value={date} onChange={(date) => setDate(date)} />
        <Stack spacing={2} sx={{ width: '100%' }} direction="row">
          <TaskSelectorField
            label="Status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as string)}
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
            ]}
          />
          <TaskSelectorField
            label="Priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as string)}
            items={[
              {
                value: Priority.high,
                label: Priority.high,
              },
              {
                value: Priority.normal,
                label: Priority.normal,
              },
              {
                value: Priority.low,
                label: Priority.low,
              },
            ]}
          />
        </Stack>
        <LinearProgress />
        <Button variant="contained" size="large" fullWidth>
          Crerate A Task
        </Button>
      </Stack>
    </Box>
  );
};
