// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const prisma = new PrismaClient();
    const { email, name, password, cpf }: User = req.body;

    const response = await prisma.user.create({
      data: { email, name, password, cpf },
    });

    console.log(response);

    return res.status(201).json({
      message: `User created`,
    });
  }
}
