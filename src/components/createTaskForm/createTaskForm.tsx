import React, { FC, ReactElement, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';

import { TaskTitleField } from './_taskTitleField';
import { TaskDescription } from './_taskDescription';
import { TaskDateField } from './_taskDateField';
import { TaskSelectorField } from './_taskSelectorField';

import { Status } from './enums/Status';
import { Priority } from './enums/Priority';

export const CreateTaskForm: FC = (): ReactElement => {
  //Decalring State
  const [title, setTitle] = useState<string | undefined>(undefined);

  const [description, setDescription] = useState<string | undefined>(undefined);

  const [date, setDate] = useState<Date | null>(new Date());

  const [status, setStatus] = useState<string>(Status.todo);

  const [priority, setPriority] = useState<string>(Priority.normal);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      <Typography mb={2} component="h2" variant="h6">
        Create A Task
      </Typography>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <TaskTitleField />
        <TaskDescription />
        <TaskDateField />
        <Stack spacing={2} sx={{ width: '100%' }} direction="row">
          <TaskSelectorField
            label="Status"
            name="status"
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
      </Stack>
    </Box>
  );
};
