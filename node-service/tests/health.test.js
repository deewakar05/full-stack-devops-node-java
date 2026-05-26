const request = require('supertest');
const { app } = require('../src/server');

describe('Node Service GET /health', () => {
  it('should return 200 OK and valid JSON format', async () => {
    const response = await request(app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('service', 'node-service');
    expect(response.body).toHaveProperty('status', 'UP');
    expect(response.body).toHaveProperty('database');
    expect(response.body).toHaveProperty('timestamp');
  });
});
