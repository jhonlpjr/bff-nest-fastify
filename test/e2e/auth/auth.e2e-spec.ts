import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST) - should fail with invalid body', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({})
      .expect(400);
    expect(res.body).toHaveProperty('error');
  });

  it('/auth/login (POST) - should succeed with valid body', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpass' })
      .expect(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('userId');
    expect(res.body.data).toHaveProperty('accessToken');
  });

  it('/auth/refresh (POST) - should fail without cookies', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/refresh')
      .expect(401);
    expect(res.body).toHaveProperty('error');
  });

  it('/auth/logout (POST) - should require auth', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/logout')
      .expect(401);
    expect(res.body).toHaveProperty('error');
  });

  it('/auth/logout-all (POST) - should require auth', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/logout-all')
      .expect(401);
    expect(res.body).toHaveProperty('error');
  });

  // Puedes agregar más tests reales aquí, mockeando AuthApiPort si es necesario
});
