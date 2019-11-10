import { Router, Request, Response, NextFunction } from 'express';

import { UserVideo, Video } from '@src/entity';
import { Auth, IUserVideo } from '@src/models';

const router: Router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  (async function () {
    const { id: userId }: Auth = req['auth'];
    const query: string = req.query['q'] || '';
    const page: number = parseInt(req.query['p'] || '1', 10);
    const pageSize: number = parseInt(req.query['ps'] || '0', 10);

    const tmp: UserVideo[] = await UserVideo.$find({ userId });
    const items: IUserVideo[] = tmp.map(i => i.convert());

    const searched = (query)
      ? items.filter(i => i.video.title.includes(query))
      : items;

    const sliced = (pageSize)
      ? searched.slice((page - 1) * pageSize, (page) * pageSize)
      : searched;

    res.status(200);
    res.json({
      total: items.length,
      results: sliced,
    });
  })().catch(next);
});

router.get('/:videoId', (req: Request, res: Response, next: NextFunction) => {
  (async function () {
    const { id: userId }: Auth = req['auth'];
    const videoId: number = parseInt(req.params['videoId'], 10);

    const video: Video | undefined = await Video.findOne({ id: videoId });
    if (!video) {
      res.status(404);
      res.json({ msg: 'Not Found' });
      return;
    }

    const userVideo: UserVideo | undefined = await UserVideo.$findOne({ userId, video });
    if (!userVideo) {
      res.status(404);
      res.json({ msg: 'Not Found' });
      return;
    }

    res.status(200);
    res.json(userVideo.convert());
  })().catch(next);
});

router.delete('/', (req: Request, res: Response, next: NextFunction) => {
  (async function () {
    const { id: userId }: Auth = req['auth'];
    const videoIds: number[] = req.body['videoIds'];

    for (const videoId of videoIds) {
      const video: Video | undefined = await Video.findOne({ id: videoId });
      if (!video) {
        continue;
      }

      const userVideo: UserVideo | undefined = await UserVideo.$findOne({ userId, video });
      if (!userVideo) {
        continue;
      }

      await userVideo.remove();
    }

    res.status(204);
    res.json();
  })().catch(next);
});

export default router;
