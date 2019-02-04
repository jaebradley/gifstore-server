import {
  fromGlobalId,
} from 'graphql-relay';
import lodash from 'lodash';

function parseCursor({ cursor, decoder, cursorType }) {
  const {
    id,
    type,
  } = decoder(cursor);
  if (type === cursorType) {
    return id;
  }

  throw new Error(`Expected a ${cursorType} cursor and not a ${type} cursor`);
}

// As mentioned in generatePageInfo, the intent is to set a "greedy" limit
// This greedy limit is used in the context of the query to garner information about
// if there are previous / next pages
function connectionArgumentParser({
  after,
  before,
  cursorType,
  first,
  last,
}) {
  let afterId;
  let beforeId;
  let limit = 20;
  let resultsCount = limit;

  if (after) {
    afterId = Number(parseCursor({ cursor: after, decoder: fromGlobalId, cursorType }));
  }

  if (before) {
    beforeId = Number(parseCursor({ cursor: before, decoder: fromGlobalId, cursorType }));
  }

  if (!lodash.isNil(first)) {
    if (first < 0) {
      throw new Error('first cannot be negative');
    }
    limit = first + 1;
    resultsCount = first;
  }

  if (!lodash.isNil(last)) {
    if (last < 0) {
      throw new Error('last cannot be negative');
    }
    limit = last + 1;
    resultsCount = last;
  }

  return {
    afterId,
    beforeId,
    limit,
    resultsCount,
  };
}

export default connectionArgumentParser;
