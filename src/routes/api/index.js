import Router from 'express-promise-router';

import google from './google';
import authentication from './authentication';

const router = Router();

router.use('/google', google);
router.use('/authentication', authentication);

export default router;
