// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const prisma = new PrismaClient();
    const { email, password }: User = req.body;
    console.log(req.body);

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (user?.password === password) {
      console.log(user);

      var token = jwt.sign({ email: user.email, name: user.name }, 'pacoca');

      return res.json({
        token: token,
      });
    } else {
      return res.status(401).json({
        message: 'Email/Password',
      });
    }
  }
}
