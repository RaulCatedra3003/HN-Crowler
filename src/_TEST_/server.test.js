const { app } = require('../server');
const { server } = require('../index');
const supertest = require('supertest');
const request = supertest(app);

const newsPerPage = 30;

describe('Testing functionality request', () => {
  afterEach(() => server.close());

  it('When http get to root hould return a array with 30 objects.', async () => {
    const res = await request.get('/').set('Accept', 'application/json');
    expect(res.body.length).toBe(newsPerPage);
  });

  it('When http get to root/:pageNumber should return a array with 30 * pageNumber objects', async () => {
    const pageNumber = 5;
    const res = await request.get(`/${pageNumber}`).set('Accept', 'application/json');
    expect(res.body.length).toBe(newsPerPage * pageNumber);
  });
});