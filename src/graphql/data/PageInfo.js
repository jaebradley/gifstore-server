import {
  Record,
} from 'immutable';

const PageInfo = Record({
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor: '',
  endCursor: '',
});

export default PageInfo;
