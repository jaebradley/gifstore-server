import Router from 'express-promise-router';

import handleAuthentication from '../../../requests/api/google/handleAuthentication';

const router = Router();

router.post('/', handleAuthentication);

export default router;
