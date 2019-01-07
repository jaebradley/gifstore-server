import Router from 'express-promise-router';

import handleAuthentication from '../../../requests/api/google/handleAuthentication';

const router = Router();

router.get('/', handleAuthentication);

export default router;
