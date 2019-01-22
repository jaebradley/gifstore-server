import {
  Record,
  List,
} from 'immutable';

const URL = Record({
  id: null,
  url: null,
  labels: List(),
});

export default URL;
