'use strict';

/**
 * UserController.test
 */

const request = require('supertest');
const should = require('should');

/**
 * Test /user/password endpoint.
 */
describe('POST /user/password', () => {

  /* Empty POST. */
  it('should reject empty POST with HTTP 422 and validation errors', done =>
    request(sails.hooks.http.app)
      .post('/api/v1/user/password')
      .send({})
      .expect(422)
      .expect('content-type', /json/)
      .expect(hasCorrect422Response)
      .end(done)
  );

  /* Only user_id field posted. */
  it('should accept test `user_id` and return expected json payload', done =>
    postValidDataAndCheckResponse(done, {'user_id': '5480c950bffebc651c8b456f'})
  );

  /* Only email field posted. */
  it('should accept test `email` and return expected json payload', done =>
    postValidDataAndCheckResponse(done, {'email': 'test@dosomething.org'})
  );

  /* Only mobile field posted. */
  it('should accept test `mobile` and return expected json payload', done =>
    postValidDataAndCheckResponse(done, {'mobile': '5555555555'})
  );

  /* Helper: POST data to /user/password and validate response. */
  function postValidDataAndCheckResponse(done, data) {
    request(sails.hooks.http.app)
      .post('/api/v1/user/password')
      .send(data)
      .expect(200)
      .expect('content-type', /json/)
      .expect(hasCorrect200Response)
      .end(done);
  }

  /* Helper. 200 OK: response body should have contain properties. */
  function hasCorrect200Response(res) {
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
    res.body.email_tags[0].should.equal('user_password');
    res.body.should.have.property('activity_timestamp');
    res.body.should.have.property('application_id');
  }

  /*
   * Helper. 422 Unprocessable Entity:
   * response should contain expected validation errors.
   */
  function hasCorrect422Response(res) {
    const requiredRule = [{ rule: 'required' }];
    res.body.should.have.property('reason');
    res.body.should.have.property('errors');
    res.body.errors.should.have.keys('user_id', 'email', 'mobile');
    res.body.errors.user_id.should.containDeep(requiredRule);
    res.body.errors.email.should.containDeep(requiredRule);
    res.body.errors.mobile.should.containDeep(requiredRule);
  }


});
