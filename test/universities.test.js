const request = require('supertest');
const app = require('../app');
const config = require('../config/config.json')
const id = 14;

//Happy Senario Test Case

beforeAll(async () => {
  const clientId = config.defaultClientId;
  const clientSecret = config.defaultClientSecret;
  const credentials = `${clientId}:${clientSecret}`;

  const bearerToken = Buffer.from(credentials).toString('base64');
  authToken = `Basic ${bearerToken}`;
});

describe('Create University API', () => {
  it('should create an university', async () => {
    const newUniversity = {
      "name": "Test Case 155 Hoo university",
      "country": "Raymus Country",
      "webpages": "www.Raymus.com"
    };
    const response = await request(app).post('/api/university').set('Authorization', authToken).send(newUniversity);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      "name": "Test Case 155 Hoo university",
      "country": "Raymus Country",
      "webpages": "www.Raymus.com"
    });
  });
});

describe('Get Universities API', () => {
  it('should fetch all university', async () => {
    const response = await request(app).get('/api/university');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(response.body.rows.length).toBeGreaterThan(0);
  });
});

describe('Get Universities By Id API', () => {
  it('should fetch one university', async () => {
    const response = await request(app).get(`/api/university/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      "id": parseInt(`${id}`)
    })
  });
});

describe('Update University API', () => {
  it('should update university', async () => {
    const updateUniversity = {
      "name": "Test Case 3333 Hoo university",
    };
    const response = await request(app).put(`/api/university/${id}`).set('Authorization', authToken).send(updateUniversity);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      "name": "Test Case 3333 Hoo university",
    });
  });
});

describe('Bookmark University API', () => {
  it('should bookmark university', async () => {
    const response = await request(app).post(`/api/university/bookmark/${id}`).set('Authorization', authToken);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      "isBookmark": true,
    });
  });
});

describe('Delete University API', () => {
  it('should delete university', async () => {
    const response = await request(app).delete(`/api/university/${id}`).set('Authorization', authToken);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      "isActive": false,
    });
  });
});