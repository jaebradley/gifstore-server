import {
  Record,
} from 'immutable';

import URLEdge from '../edges/URL';

const CreateUserURL = Record({
  urlEdge: URLEdge(),
});

export default CreateUserURL;
