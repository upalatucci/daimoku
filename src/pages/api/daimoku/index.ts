import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';
export const revalidate = 1000;

export default async function handler(req: NextApiRequest, response: NextApiResponse) {
  if (req.method === 'POST') {
    const body = req.body as { hours: string; minutes: string };

    const hours = parseInt(body.hours);
    const minutes = parseInt(body.minutes);

    const daimoku = (hours * 60 + minutes) * 50;

    const newDaimoku = await kv.incrby('daimoku', daimoku);
    return response.json({ ok: 'ok', daimoku: newDaimoku });
  } else {
    const daimoku = await kv.get<number>('daimoku');
    response.setHeader('Cache-Control', 's-maxage=60');
    return response.json({ status: 'ok', daimoku: daimoku || 0 });
  }
}
