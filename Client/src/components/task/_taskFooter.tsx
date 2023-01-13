import React, { FC, ReactElement } from 'react';
import { Box, Button, Switch, FormControlLabel } from '@mui/material';
import { ITaskFooter } from './interfaces/ITaskFooter';
import PropTypes from 'prop-types';
import { Status } from '../createTaskForm/enums/Status';

export const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
  const {
    id,
    status,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
    >
      <FormControlLabel
        label="In Progress"
        control={
          <Switch
            onChange={(e) => onStatusChange(e, id)}
            color="warning"
            defaultChecked={status === Status.inProgress}
          />
        }
      />
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={(e) => onClick(e, id)}
        sx={{
          color: '#ffffff',
        }}
      >
        Mark Complete
      </Button>
    </Box>
  );
};
TaskFooter.propTypes = {
  onClick: PropTypes.func,
  onStatusChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  status: PropTypes.string,
};
