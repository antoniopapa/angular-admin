import {Permission} from './permission';

export interface Role {
  id: number;
  name: string;
  permissions?: Permission[];
}
