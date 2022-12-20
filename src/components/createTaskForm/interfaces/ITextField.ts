import React from 'react';
import { IDIsabled } from './IDisabled';

export interface ITextField extends IDIsabled {
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}
