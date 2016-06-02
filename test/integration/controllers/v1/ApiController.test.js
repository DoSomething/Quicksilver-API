'use strict';

/**
 * ApiController.test
 */

const request = require('supertest');

/**
 * Test API V1 information / status endpoint.
 */
describe('GET /api/v1', () => {
  /* Helper: validate endpoints list. */
  function hasCorrectEndpointsList(res) {
    // User methods.
    res.body.should.have.property('user');
    res.body.user.should.have.property('register');
    res.body.user.register.should.endWith('/api/v1/user/register');
    res.body.user.should.have.property('password');
    res.body.user.password.should.endWith('/api/v1/user/password');
  }

  it('should respond with JSON list of available endpoins', (done) => {
    request(sails.hooks.http.app)
      .get('/api/v1')
      .expect(200)
      .expect('content-type', /json/)
      .expect(hasCorrectEndpointsList)
      .end(done);
  });
});
