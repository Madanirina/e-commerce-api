import { Document } from 'mongoose';
export interface UserType extends Document {
  readonly name: string;
  readonly firstname: number;
}
