import {
  List,
  Record,
} from 'immutable';

import URL from './URL';
import User from './User';

const UserURL = Record({
  id: null,
  url: URL(),
  user: User(),
  labels: List(),
});

export default UserURL;
