import { SelectChangeEvent } from '@mui/material';
import { IDIsabled } from './IDisabled';

export interface ISelectField extends IDIsabled {
  onChange?: (e: SelectChangeEvent) => void;
  name?: string;
  value?: string;
  label?: string;
  items?: ISelectItems[];
}

export interface ISelectItems {
  value: string;
  label: string;
}
