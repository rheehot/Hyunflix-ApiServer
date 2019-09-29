import { Router } from 'express';

import articles from './articles';
import explorer from './explorer';
import musics from './musics';
import videos from './videos';

const router: Router = Router();

router.use('/articles', articles);
router.use('/explorer', explorer);
router.use('/musics', musics);
router.use('/videos', videos);

export default router;
