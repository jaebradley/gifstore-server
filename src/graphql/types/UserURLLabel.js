import {
  Record,
} from 'immutable';

import UserURL from './UserURL';
import Label from './Label';

const UserURLLabel = Record({
  userURL: UserURL(),
  label: Label(),
});

export default UserURLLabel;
