import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { isValidObjectId } from 'mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks (POST)', async () => {
    const res = await request(app.getHttpServer()).post('/tasks').send({
      status: 'Новая',
      name: 'Task24',
      definition: 'Описание ялыллфлыфв',
    });
    expect(res.body.status).toBe('Новая');
    expect(res.body.name).toBe('Task24');
    expect(res.body.definition).toBe('Описание ялыллфлыфв');
    expect(res.statusCode).toBe(201);
  });

  it('/api/register (POST)', async () => {
    const res = await request(app.getHttpServer()).post('/api/register').send({
      login: 'sddad',
      password: 'nik1234W',
      email: 'i@i.ua',
    });
    expect(res.body.login).toBe('sddad');
    expect(res.body.password).toBe('nik1234W');
    expect(res.body.email).toBe('i@i.ua');
    expect(isValidObjectId(res.body._id)).toBe(true);
    expect(res.statusCode).toBe(201);
  });

  it('/api/users (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/api/users');
    expect(res.statusCode).toBe(200);
    res.body.forEach((el) => {
      const keys = Object.keys(el);
      expect(keys).toHaveLength(5);
      expect(isValidObjectId(el[keys[0]])).toBe(true);
    });
  });

  it('/auth (POST)', async () => {
    const res = await request(app.getHttpServer()).post('/auth').send({
      login: 'Kilya',
      pass: 'nik1234W',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.access_token).toContain(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.',
    );
  });

  it('/tasks (POST)', async () => {
    const res = await request(app.getHttpServer()).post('/tasks').send({
      status: 'Новая',
      name: 'Task24',
      definition: 'Описание ялыллфлыфв',
    });
    expect(res.statusCode).toBe(201);
    const keys = Object.keys(res.body);
    expect(keys).toHaveLength(7);
    //expect(isValidObjectId(res.body[keys[3]])).toBe(true);
    expect(
      res.body.status === 'Новая' ||
        res.body.status === 'В процессе' ||
        res.body.status === 'Завершена',
    ).toBeTruthy();
  });

  it('/tasks (PATCH)', async () => {
    const res = await request(app.getHttpServer()).patch('/tasks').send({
      _id: '6532e6159358ecfc50a0955f',
      definition: 'update',
    });
    expect(res.statusCode).toBe(204);
    const keys = Object.keys(res.body);
    expect(keys).toHaveLength(7);
    expect(res.body.definition).toBe('update');
  });

  it('/tasks (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks/6532e6159358ecfc50a0955f')
      .send();
    expect(res.statusCode).toBe(200);
    const keys = Object.keys(res.body);
    expect(keys).toHaveLength(7);
    //    expect(res.body._id.toString()).toBe('6532e6159358ecfc50a0955f');
  });
});
