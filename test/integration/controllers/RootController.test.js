/**
 * RootController.test.js
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
    request(app)
      .get('/api')
      .expect("content-type", /json/, done)
  });

});
