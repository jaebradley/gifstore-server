export default function parseOrderBy(orderBy) {
  let orderByField = 'created_at';
  let orderByDirection = 'desc';

  if (orderBy) {
    if (orderBy.field) {
      if (orderBy.field === 'CREATED_AT') {
        orderByField = 'created_at';
      } else {
        throw new Error('Unknown orderBy field');
      }
    }

    if (orderBy.direction) {
      if (orderBy.direction === 'ASCENDING') {
        orderByDirection = 'asc';
      } else if (orderBy.direction === 'DESCENDING') {
        orderByDirection = 'desc';
      } else {
        throw new Error('Unknown orderBy direction');
      }
    }
  }

  return {
    orderByField,
    orderByDirection,
  };
}
