/**
 * ApiController.test.js
 */
var request = require('supertest');
var should = require('should');

/**
 * Test API "ping" endpoint.
 */
describe('Requests to the root (/api) path', function() {

  it('GET: Returns a 200 status code', function (done) {
    request(sails.hooks.http.app)
      .get('/api')
      .expect(200, done);
  });

  it('GET: Returns JSON format', function(done) {
    request(sails.hooks.http.app)
      .get('/api')
      .expect("content-type", /json/, done)
  });

  it('GET: Redirects to v1 path and returns v1 route details', function(done) {
    request(sails.hooks.http.app)
      .get('/api')
      .expect("content-type", /json/)
      .end(function(err, response) {
        if (err) throw err;
        response.body.should.have.property('v1');
        response.body.v1.should.endWith('/api/v1');
        done();
      });
  });
});

/**
 * Test API V1 information / status endpoint.
 */
describe('Requests to v1 root (/api/v1) path', function() {

  it('GET: Returns a 200 status code', function(done) {

    request(sails.hooks.http.app)
      .get('/api/v1')
      .expect(200, done);
  });

  it('GET: Returns JSON format', function(done) {

    request(sails.hooks.http.app)
      .get('/api/v1')
      .expect("content-type", /json/, done)
  });

  it('GET: Returns v1 paths', function(done) {

    request(sails.hooks.http.app)
      .get('/api/v1')
      .expect("content-type", /json/)
      .end(function(err, response) {
        if (err) throw err;
        response.body.should.have.property('user');
        response.body.user.should.have.property('register');
        response.body.user.register.should.endWith('/api/v1/user/register');
        response.body.user.should.have.property('password');
        response.body.user.password.should.endWith('/api/v1/user/password');
        done();
      });
  });
});
