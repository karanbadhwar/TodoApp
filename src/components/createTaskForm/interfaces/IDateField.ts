import { IDIsabled } from './IDisabled';

export interface IDateField extends IDIsabled {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}
