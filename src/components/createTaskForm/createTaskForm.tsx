import React, { FC, ReactElement } from 'react';
import { Box, Typography, Stack } from '@mui/material';

import { TaskTitleField } from './_taskTitleField';
import { TaskDescription } from './_taskDescription';
import { TaskDateField } from './_taskDateField';
import { TaskSelectorField } from './_taskSelectorField';

export const CreateTaskForm: FC = (): ReactElement => {
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
          <TaskSelectorField />
        </Stack>
      </Stack>
    </Box>
  );
};