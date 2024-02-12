import request from 'supertest';
import { serverInstance } from '../server';
import { v4 as uuidv4 } from 'uuid';

describe('Server', () => {
  it('should create a new user', async () => {
    const response = await request(serverInstance)
      .post('/user')
      .send({ name: 'John Doe' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', 'John Doe');
  });

  it('should update the old user', async () => {
    const user = await request(serverInstance)
      .post('/user')
      .send({ name: 'John Doe' });
    const response = await request(serverInstance)
      .post('/update')
      .send({ name: 'John KOKO', id: user.body.id });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', 'John KOKO');
  });

  it('should not update the old user', async () => {
    await request(serverInstance).post('/user').send({ name: 'John Doe' });
    const response = await request(serverInstance)
      .post('/update')
      .send({ name: 'John KOKO', id: uuidv4() });

    console.log(response);
    expect(response.status).not.toBe(200);
  });

  it('should create a post', async () => {
    const user = await request(serverInstance)
      .post('/user')
      .send({ name: 'John Doe' });
    const response = await request(serverInstance)
      .post('/post')
      .send({ title: 'this is a post', userId: user.body.id });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title', 'this is a post');
    expect(response.body).toHaveProperty('userId', user.body.id);
  });
});
