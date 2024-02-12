import express, { Request, Response } from 'express';

import prisma from '../prisma/client';

const app = express();

app.use(express.json());

app.post('/user', async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
      },
    });

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/update', async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const user = await prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
      },
    });

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/post', async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        userId: body.userId,
      },
    });
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

export const serverInstance = app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
