import {
  Record,
} from 'immutable';

import LabelEdge from '../edges/Label';

const AddLabelToURL = Record({
  labelEdge: LabelEdge(),
});

export default AddLabelToURL;
