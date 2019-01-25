import {
  Record,
} from 'immutable';

import URLNode from '../nodes/URL';

const URL = Record({
  cursor: '',
  node: URLNode(),
});

export default URL;
