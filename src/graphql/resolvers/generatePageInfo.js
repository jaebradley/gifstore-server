import {
  toGlobalId,
} from 'graphql-relay';
import lodash from 'lodash';

import PageInfo from 'GraphQL/data/PageInfo';

// The intent of this is to be used with a greedy query that returns first / last + 1 results
// By querying for one additional result, it's easy to figure out if there are previous / next page
// https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo.Fields
// https://github.com/graphql/graphql-relay-js/issues/94#issuecomment-232410564
function calculateHasPreviousPage({ edges, last }) {
  return lodash.isNil(last)
    || (
      lodash.isArray(edges)
       && edges.length >= last + 1
    );
}

function calculateHasNextPage({ edges, first }) {
  return lodash.isNil(first)
    || (
      lodash.isArray(edges)
      && edges.length >= first + 1
    );
}

export default function generatePageInfo({
  first,
  last,
  edges,
  edgeType,
}) {
  const edgesCount = edges.length;
  let startCursor = null;
  let endCursor = null;

  if (edgesCount > 1) {
    startCursor = toGlobalId(edgeType, edges[0].node.id);
    endCursor = toGlobalId(edgeType, edges[edgesCount - 2].node.id);
  } else if (edgesCount === 1) {
    startCursor = toGlobalId(edgeType, edges[0].node.id);
    endCursor = startCursor;
  }

  return PageInfo({
    hasNextPage: calculateHasNextPage({ edges, first }),
    hasPreviousPage: calculateHasPreviousPage({ edges, last }),
    startCursor,
    endCursor,
  });
}
