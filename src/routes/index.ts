import { Router, Response } from 'express';

import { ServiceResult } from '@src/services';

import videoSeries from './videos/video-series';
import videos from './videos/videos';
import fs from './fs';
import musics from './musics/musics';
import musicPlaylist from './musics/music-playlist';
import userVideos from './user/user-videos';
import encodes from './encodes';
import ffmpeg from './ffmpeg';
import youtube from './youtube';
import comics from './comics/comics';

const router: Router = Router();

router.use('/videos/series', videoSeries);
router.use('/videos', videos);
router.use('/musics/playlist', musicPlaylist);
router.use('/musics', musics);
router.use('/fs', fs);
router.use('/user/videos', userVideos);
router.use('/encodes', encodes);
router.use('/ffmpeg', ffmpeg);
router.use('/youtube', youtube);
router.use('/comics', comics);

export default router;

export const handleServiceResult = (res: Response) => (result: ServiceResult) => {
  const [status, response] = result;
  res.status(status);
  res.json(response);
};
