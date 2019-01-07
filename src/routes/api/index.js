import Router from 'express-promise-router';

import google from './google';

const router = Router();

router.use('/google', google);

export default router;
