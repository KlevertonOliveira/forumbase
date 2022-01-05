export function compareTimestamps( a, b ) {
    if ( a.createdAt < b.createdAt ) return 1;
    if ( a.createdAt > b.createdAt ) return -1;
    return 0;
  }