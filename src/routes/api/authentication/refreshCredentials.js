import Router from 'express-promise-router';

import handleRefreshCredentials from '../../../requests/api/authentication/handleRefreshCredentials';

const router = Router();

router.post('/', handleRefreshCredentials);

export default router;
