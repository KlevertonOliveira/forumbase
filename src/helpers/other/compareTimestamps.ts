import { TPost } from '../../types/TPost';

export function compareTimestamps( a:any, b:any ) {
  if ( a.createdAt < b.createdAt ) return 1;
  if ( a.createdAt > b.createdAt ) return -1;
  return 0;
}