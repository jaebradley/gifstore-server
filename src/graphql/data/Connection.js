import {
  List,
  Record,
} from 'immutable';

import PageInfo from './PageInfo';

const Connection = Record({
  edges: List(),
  pageInfo: PageInfo(),
});

export default Connection;
