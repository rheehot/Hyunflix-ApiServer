import * as Joi from '@hapi/joi';
import * as Fuse from 'fuse.js';
import { Raw } from 'typeorm';

import { ServiceResult } from '@src/services';
import { Comic } from '@src/entity';
import { IComic } from '@src/models';

interface Schema {
  q?: string;
  p: number;
  ps?: number;
  authority: string[];
}

const schema = Joi.object({
  q: Joi.string().optional().empty(''),
  p: Joi.number().optional().default(1),
  ps: Joi.number().optional(),
  authority: Joi.number().required(),
});

export default async function (args: object): Promise<ServiceResult> {
  const { value, error } = schema.validate(args);
  if (error) {
    return [400, { msg: error.message }];
  }

  const { q: query, p: page, ps: pageSize, authority } = value as Schema;

  const tmp: Comic[] = await Comic.find({
    order: { id: 'DESC' },
    where: { authority: Raw(`${authority} & authority`) },
  });

  const videos: IComic[] = tmp.map(m => m.convert());

  const searched = (query)
    ? search(videos, query)
    : videos;

  const sliced = (pageSize)
    ? searched.slice((page - 1) * pageSize, page * pageSize)
    : searched;

  return [200, { total: searched.length, results: sliced }];
}

function search(videos: IComic[], query: string): IComic[] {
  return new Fuse(videos, {
    shouldSort: true,
    threshold: 0.1,
    maxPatternLength: 32,
    keys: ['tags', 'title'],
  }).search(query);
}
