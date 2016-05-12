/**
 * ApiController.test
 */

import request from 'supertest';
import should from 'should';

/**
 * Test API "ping" endpoint.
 */
describe('Requests to the root (/api) path', function() {

  it('GET: Returns a 200 status code', done =>
    request(sails.hooks.http.app)
    .get('/api')
    .expect(200, done)
  );

  it('GET: Returns JSON format', done =>
    request(sails.hooks.http.app)
    .get('/api')
    .expect('content-type', /json/, done)
  );

  it('GET: Redirects to v1 path and returns v1 route details', done =>
    request(sails.hooks.http.app)
    .get('/api')
    .expect('content-type', /json/)
    .end(function(err, res) {
      if (err) { throw err; }
      res.body.should.have.property('v1');
      res.body.v1.should.endWith('/api/v1');
      done();
    })
  );

});

/**
 * Test API V1 information / status endpoint.
 */
describe('Requests to v1 root (/api/v1) path', function() {

  it('GET: Returns a 200 status code', done =>
    request(sails.hooks.http.app)
    .get('/api/v1')
    .expect(200, done)
  );

  it('GET: Returns v1 paths', done =>
    request(sails.hooks.http.app)
    .get('/api/v1')
    .expect('content-type', /json/)
    .end(function(err, res) {
      if (err) { throw err; }
      res.body.should.have.property('user');
      res.body.user.should.have.property('register');
      res.body.user.register.should.endWith('/api/v1/user/register');
      res.body.user.should.have.property('password');
      res.body.user.password.should.endWith('/api/v1/user/password');
      done();
    })
  );

});
