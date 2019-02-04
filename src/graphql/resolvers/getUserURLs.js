import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import {
  getAll as getAllUserURLs,
} from 'Store/userURLs';

import URL from 'GraphQL/data/nodes/URL';
import Connection from 'GraphQL/data/Connection';
import Edge from 'GraphQL/data/Edge';

import connectionArgumentParser from './connectionArgumentParser';
import parseOrderBy from './parseOrderBy';
import generatePageInfo from './generatePageInfo';

export default async function getUserURLs(parent, args, context) {
  const {
    type,
    id: userId,
  } = fromGlobalId(args.userId);

  if (type !== 'User') {
    throw new Error('A valid User was not specified');
  }

  if (Number(userId) !== context.currentUser.id) {
    throw new Error('You are not the specified user');
  }

  const {
    afterId,
    beforeId,
    limit,
    resultsCount,
  } = connectionArgumentParser({
    after: args.after,
    before: args.before,
    cursorType: 'URL',
  });

  const {
    orderByField,
    orderByDirection,
  } = parseOrderBy(args.orderBy);

  const userURLs = await getAllUserURLs({
    userId,
    orderField: orderByField,
    orderDirection: orderByDirection,
    afterId,
    beforeId,
    limit,
  });

  const edges = userURLs.map((userURL) => {
    const url = URL({
      id: Number(userURL.url_id),
      url: userURL.url,
    });
    return Edge({
      node: url,
      cursor: toGlobalId('URL', url.id),
    });
  });

  const pageInfo = generatePageInfo({
    first: args.first,
    last: args.last,
    edges,
    edgeType: 'URL',
  });

  // Remove "greedy" edge after page info has been calculated
  if (resultsCount < edges.length) {
    edges.length = resultsCount;
  }

  return Connection({
    edges,
    pageInfo,
  });
}
