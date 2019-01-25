import {
  Record,
} from 'immutable';

import LabelNode from '../nodes/Label';

const Label = Record({
  cursor: '',
  node: LabelNode(),
});

export default Label;
