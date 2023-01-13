import { ITaskDescription } from './ITaskDescription';
import { ITaskFooter } from './ITaskFooter';
import { ITaskHeader } from './ITaskHeader';

export interface ITask extends ITaskDescription, ITaskFooter, ITaskHeader {
  priority?: string;
}
