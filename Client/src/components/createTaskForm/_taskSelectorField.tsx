import React, { FC, ReactElement } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ISelectField } from './interfaces/ISelectField';
import PropTypes, { string } from 'prop-types';

export const TaskSelectorField: FC<ISelectField> = (props): ReactElement => {
  const {
    value = '',
    label = 'Select Box',
    name = 'SelectBox',
    items = [
      {
        value: '',
        label: 'Add Items',
      },
    ],
    disabled = false,
    onChange = (e: SelectChangeEvent) => console.log(e),
  } = props;
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${name}-id`}>{label}</InputLabel>
      <Select
        label={label}
        labelId={`${name}-id`}
        id={`${name}-id-select`}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
      >
        {items.map((item, index) => (
          <MenuItem key={item.value + index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

TaskSelectorField.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: string.isRequired,
      label: string.isRequired,
    }).isRequired,
  ),
};
