import Router from 'express-promise-router';

import handleRefreshCredentials from './refreshCredentials';

const router = Router();

router.use('/refresh-credentials', handleRefreshCredentials);

export default router;
