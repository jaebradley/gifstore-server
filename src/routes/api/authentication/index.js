import Router from 'express-promise-router';

import handleAuthentication from '../../../requests/api/authentication';

const router = Router();

router.get('/', handleAuthentication);

export default router;
