'use strict';

/**
 * ApiController.test
 */

const request = require('supertest');

/**
 * Test root redirect.
 */
describe('GET /', () => {
  it('should redirect to /api', (done) => {
    request(sails.hooks.http.app)
      .get('/')
      .expect(302)
      .expect('location', /^\/api$/)
      .end(done);
  });
});


/**
 * Test API "ping" endpoint.
 */
describe('GET /api', () => {
  it('should respond with JSON list of API versions', (done) => {
    request(sails.hooks.http.app)
      .get('/api')
      .expect(200)
      .expect('content-type', /json/)
      .expect((res) => {
        res.body.should.have.property('v1');
        res.body.v1.should.endWith('/api/v1');
      })
      .end(done);
  });
});
