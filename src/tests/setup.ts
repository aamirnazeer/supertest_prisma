import prisma from '../../prisma/client';
import { serverInstance } from '../server';

beforeAll(() => {
  if (process.env.ENV !== 'TEST') {
    throw new Error('not expected ENV');
  }
});
afterAll(async () => {
  await prisma.$transaction([
    prisma.user.deleteMany({}),
    prisma.post.deleteMany({}),
  ]);
  serverInstance.close();
});
