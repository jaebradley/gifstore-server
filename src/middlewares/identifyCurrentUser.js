import unless from 'express-unless';
import {
  get,
} from '../store/users';

async function identifyCurrentUser(request, _, next) {
  if (request.user.provider && request.user.providerId) {
    const user = await get({
      provider: request.user.provider,
      providerId: request.user.providerId,
    });
    request.currentUser = user;
  }

  next();
}

identifyCurrentUser.unless = unless;

export default identifyCurrentUser;
