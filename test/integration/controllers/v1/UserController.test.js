'use strict';

/**
 * UserController.test
 */

 const request = require('supertest');
 const should = require('should');

/**
 * Test invalid /user/password endpoint.
 */

describe('Requests to the root (/user/password) path with missing required body parameters.', function() {

  it('POST: returns expected 422 - Not processable due to request validation error results.', done =>
    request(sails.hooks.http.app)
    .post('/api/v1/user/password')
    .send({})
    .expect(422)
    .expect('content-type', /json/)
    .end(function(err, res) {
      if (err) { throw err; }
      res.status.should.equal(422);
      res.body.should.have.property('reason');
      res.body.should.have.property('errors');
      res.body.errors.should.have.keys('user_id', 'email', 'mobile');
      let requiredRule = [ { 'rule': 'required' } ];
      res.body.errors.user_id.should.containDeep(requiredRule);
      res.body.errors.email.should.containDeep(requiredRule);
      res.body.errors.mobile.should.containDeep(requiredRule);
      done();
    })
  );

});

/**
 * Test /user/password endpoint.
 */

describe('Requests to the root (/user/password) path', function() {

  it('POST: Valid password request with only user_id returns expected properties.', done =>
    request(sails.hooks.http.app)
    .post('/api/v1/user/password')
    .send({'user_id': '54f9e1c8469c64df6c8b4568'})
    .expect(200)
    .expect('content-type', /json/)
    .end(function(err, res) {
      if (err) { throw err; }
      res.status.should.equal(200);
      res.body.should.have.property('activity');
      res.body.activity.should.equal('user_password');
      res.body.should.have.property('email');
      res.body.should.have.property('uid');
      res.body.should.have.property('merge_vars');
      res.body.merge_vars.should.have.property('MEMBER_COUNT');
      res.body.merge_vars.should.have.property('FNAME');
      res.body.merge_vars.should.have.property('RESET_LINK');
      res.body.should.have.property('user_country');
      res.body.should.have.property('user_language');
      res.body.should.have.property('email_template');
      res.body.should.have.property('email_tags');
      res.body.email_tags[0].should.equal('drupal_user_password');
      res.body.should.have.property('activity_timestamp');
      res.body.should.have.property('application_id');
      done();
    })
  );

  it('POST: Valid password request with only email returns expected properties.', done =>
    request(sails.hooks.http.app)
    .post('/api/v1/user/password')
    .send({'email': 'info@dosomething.org'})
    .expect(200)
    .expect('content-type', /json/)
    .end(function(err, res) {
      if (err) { throw err; }
      res.status.should.equal(200);
      res.body.should.have.property('activity');
      res.body.activity.should.equal('user_password');
      res.body.should.have.property('email');
      res.body.should.have.property('uid');
      res.body.should.have.property('merge_vars');
      res.body.merge_vars.should.have.property('MEMBER_COUNT');
      res.body.merge_vars.should.have.property('FNAME');
      res.body.merge_vars.should.have.property('RESET_LINK');
      res.body.should.have.property('user_country');
      res.body.should.have.property('user_language');
      res.body.should.have.property('email_template');
      res.body.should.have.property('email_tags');
      res.body.email_tags[0].should.equal('drupal_user_password');
      res.body.should.have.property('activity_timestamp');
      res.body.should.have.property('application_id');
      done();
    })
  );

  it('POST: Valid password request with only mobile returns expected properties.', done =>
    request(sails.hooks.http.app)
    .post('/api/v1/user/password')
    .send({'mobile': '15556669999'})
    .expect(200)
    .expect('content-type', /json/).end(function(err, res) {
      if (err) { throw err; }
      res.status.should.equal(200);
      res.body.should.have.property('activity');
      res.body.activity.should.equal('user_password');
      res.body.should.have.property('email');
      res.body.should.have.property('uid');
      res.body.should.have.property('merge_vars');
      res.body.merge_vars.should.have.property('MEMBER_COUNT');
      res.body.merge_vars.should.have.property('FNAME');
      res.body.merge_vars.should.have.property('RESET_LINK');
      res.body.should.have.property('user_country');
      res.body.should.have.property('user_language');
      res.body.should.have.property('email_template');
      res.body.should.have.property('email_tags');
      res.body.email_tags[0].should.equal('drupal_user_password');
      res.body.should.have.property('activity_timestamp');
      res.body.should.have.property('application_id');
      done();
    })
  );

});
