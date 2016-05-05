/**
 * UserController.test.js
 */
var request = require('supertest');
var should = require('should');

/**
 * Test invalid /user/password endpoint.
 */
describe('Requests to the root (/user/password) path with missing required body parameters.', function() {

  it('POST: Invalid password reset request with missing body parameters returns expected 422 - Unprocessable due to request validation error results.', function(done) {

    request(sails.hooks.http.app)
      .post('/api/v1/user/password')
      .send({})
      .expect(422)
      .expect("content-type", /json/)
      .end(function(err, response) {
        if (err) throw err;
        response.status.should.equal(422);
        response.body.should.have.property('reason');
        response.body.should.have.property('errors');
        response.body.errors.should.have.keys('user_id', 'email', 'mobile');

        var requiredRule = [{"rule": "required"}];
        response.body.errors.user_id.should.containDeep(requiredRule);
        response.body.errors.email.should.containDeep(requiredRule);
        response.body.errors.mobile.should.containDeep(requiredRule);
        done();
      });
  });

});

/**
 * Test /user/password endpoint.
 */
describe('Requests to the root (/user/password) path', function() {

  it('POST: Valid password request with only user_id returns expected results.', function(done) {

  request(sails.hooks.http.app)
    .post('/api/v1/user/password')
    .send({
      "user_id": "54f9e1c8469c64df6c8b4568"
    })
    .expect(200)
    .expect("content-type", /json/)
    .end(function(err, response) {
      if (err) {
        throw err;
      }
      response.status.should.equal(200);
      response.body.should.have.property('activity');
      response.body.activity.should.equal('user_password');
      response.body.should.have.property('email');
      response.body.should.have.property('uid');
      response.body.should.have.property('merge_vars');
      response.body.merge_vars.should.have.property('MEMBER_COUNT');
      response.body.merge_vars.should.have.property('FNAME');
      response.body.merge_vars.should.have.property('RESET_LINK');
      response.body.should.have.property('user_country');
      response.body.should.have.property('user_language');
      response.body.should.have.property('email_template');
      response.body.should.have.property('email_tags');
      response.body.email_tags[0].should.equal('drupal_user_password');
      response.body.should.have.property('activity_timestamp');
      response.body.should.have.property('application_id');
      done();
    });
  });

  it('POST: Valid password request with only email returns expected results.', function(done) {

  request(sails.hooks.http.app)
    .post('/api/v1/user/password')
    .send({
      "email": "info@dosomething.org"
    })
    .expect(200)
    .expect("content-type", /json/)
    .end(function(err, response) {
      if (err) {
        throw err;
      }
      response.status.should.equal(200)
      response.body.should.have.property('activity');
      response.body.activity.should.equal('user_password');
      response.body.should.have.property('email');
      response.body.should.have.property('uid');
      response.body.should.have.property('merge_vars');
      response.body.merge_vars.should.have.property('MEMBER_COUNT');
      response.body.merge_vars.should.have.property('FNAME');
      response.body.merge_vars.should.have.property('RESET_LINK');
      response.body.should.have.property('user_country');
      response.body.should.have.property('user_language');
      response.body.should.have.property('email_template');
      response.body.should.have.property('email_tags');
      response.body.email_tags[0].should.equal('drupal_user_password');
      response.body.should.have.property('activity_timestamp');
      response.body.should.have.property('application_id');
      done();
    });
  });

  it('POST: Valid password request with only mobile returns expected results.', function(done) {

  request(sails.hooks.http.app)
    .post('/api/v1/user/password')
    .send({
      "mobile": "15556669999"
    })
    .expect(200)
    .expect("content-type", /json/)
    .end(function(err, response) {
      if (err) {
        throw err;
      }
      response.status.should.equal(200)
      response.body.should.have.property('activity');
      response.body.activity.should.equal('user_password');
      response.body.should.have.property('email');
      response.body.should.have.property('uid');
      response.body.should.have.property('merge_vars');
      response.body.merge_vars.should.have.property('MEMBER_COUNT');
      response.body.merge_vars.should.have.property('FNAME');
      response.body.merge_vars.should.have.property('RESET_LINK');
      response.body.should.have.property('user_country');
      response.body.should.have.property('user_language');
      response.body.should.have.property('email_template');
      response.body.should.have.property('email_tags');
      response.body.email_tags[0].should.equal('drupal_user_password');
      response.body.should.have.property('activity_timestamp');
      response.body.should.have.property('application_id');
      done();
    });
  });

});
