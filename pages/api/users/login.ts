// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    var token = jwt.sign(
      { email: 'email@email.com', name: 'user.name' },
      'pacoca'
    );

    return res.json({
      token: token,
    });
  }
}
