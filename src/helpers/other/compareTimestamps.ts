import { TAnswer } from '../../types/TAnswer';
import { TPost } from '../../types/TPost';

export function compareTimestamps(a:TPost | TAnswer, b:TPost | TAnswer) {
  if ( a.createdAt < b.createdAt ) return 1;
  if ( a.createdAt > b.createdAt ) return -1;
  return 0;
}