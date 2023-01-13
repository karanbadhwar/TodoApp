import React, {
  FC,
  ReactElement,
  useState,
  useEffect,
  useContext,
} from 'react';
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
import { TaskStatusChangedContext } from '../../context';

import { Status } from './enums/Status';
import { Priority } from './enums/Priority';
import { ICreateTask } from '../taskarea/Interfaces/ICreateTask';

export const CreateTaskForm: FC = (): ReactElement => {
  //Decalring State
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(Priority.normal);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  //Using Context
  const tasksUpdatedContext = useContext(TaskStatusChangedContext);

  // Create a Task Mutation
  const createTaskMutation = useMutation((data: ICreateTask) =>
    sendApiRequest('http://localhost:3200/tasks', 'POST', data),
  );

  // Task Handler
  function createTaskHandler() {
    if (!title || !date || !description) {
      return;
    }

    const task: ICreateTask = {
      title,
      description,
      date: date.toString(),
      status,
      priority,
    };

    createTaskMutation.mutate(task);
  }

  /* 
      Manage Side Effects inside the application
    */
  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccess(true);
      tasksUpdatedContext.toggle()
    }
    const successTimeout = setTimeout(() => {
      setShowSuccess(false);
    }, 5000);

    return () => {
      clearTimeout(successTimeout);
    };
  }, [createTaskMutation.isSuccess]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert severity="success" sx={{ width: '100%', marginBottom: '16px' }}>
          <AlertTitle>Success</AlertTitle>
          The Task has been created Successfully
        </Alert>
      )}

      <Typography mb={2} component="h2" variant="h6">
        Create A Task
      </Typography>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <TaskTitleField
          onChange={(e) => setTitle(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDescription
          onChange={(e) => setDescription(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDateField
          value={date}
          onChange={(date) => setDate(date)}
          disabled={createTaskMutation.isLoading}
        />
        <Stack spacing={2} sx={{ width: '100%' }} direction="row">
          <TaskSelectorField
            label="Status"
            name="status"
            disabled={createTaskMutation.isLoading}
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
            disabled={createTaskMutation.isLoading}
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
        {createTaskMutation.isLoading && <LinearProgress />}
        <Button
          disabled={!title || !date || !description || !status || !priority}
          onClick={createTaskHandler}
          variant="contained"
          size="large"
          fullWidth
        >
          Crerate A Task
        </Button>
      </Stack>
    </Box>
  );
};
