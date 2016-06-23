'use strict';

/**
 * UserController.test
 */

const request = require('supertest');

/**
 * Test /user/password endpoint.
 */
describe('POST /user/password', () => {
  /**
   * Helper. 200 OK: response body should have contain properties.
   */
  function hasCorrect200Response(res) {
    const data = res.body;

    const emailTags = [
      'user_password',
      'quicksilver_api',
    ];

    // User properties.
    data.should.have.property('activity', 'user_password');
    data.should.have.property('email', 'test@dosomething.org');
    data.should.have.property('uid', '187');
    data.should.have.property('user_country', 'US');
    data.should.have.property('user_language', 'en-global');
    data.should.have.property('email_template', 'mb-user-password-US');
    data.should.have.property('email_tags', emailTags);
    data.should.have.property('application_id', 'QuicksilverAPI');

    // TODO: add custom assertions.
    // Timestamp.
    data.should.have.property('activity_timestamp').which.is.a.Number();

    // Merge vars.
    data.should.have.property('merge_vars').which.is.an.Object();

    // First name.
    data.merge_vars.should.have.property('FNAME', 'test');

    // Member count should be `[float number] [million]` word.
    data.merge_vars
      .should.have.property('MEMBER_COUNT')
      .which.is.not.empty()
      .which.is.a.match(/^\d+(\.\d)? million/);

    // Reset link should [/user/reset/][drupal_id]/[timestamp]/[reduced base64].
    // For reduced base64 see drupal_hmac_base64():
    // https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/drupal_hmac_base64/7.x
    data.merge_vars
      .should.have.property('RESET_LINK')
      .which.is.not.empty()
      .and.is.a.match(/\/user\/reset\/\d+\/\d+\/[a-zA-Z0-9-\_]+\/login$/);
  }

  /**
   * Helper. 422 Unprocessable Entity:
   * response should contain expected validation errors.
   */
  function hasCorrect422Response(res) {
    const requiredRule = [{ rule: 'required' }];
    res.body.should.have.property('reason');
    res.body.should.have.property('errors');
    res.body.errors.should.have.keys(['user_id', 'email', 'mobile']);
    res.body.errors.user_id.should.containDeep(requiredRule);
    res.body.errors.email.should.containDeep(requiredRule);
    res.body.errors.mobile.should.containDeep(requiredRule);
  }

  /**
   * Helper: POST data to /user/password and validate response.
   */
  function postValidDataAndCheckResponse(done, data) {
    // Post optional application_id field to check if it ends up in
    // the correct places eventually.
    const postData = Object.assign(data, { application_id: 'QuicksilverAPI' });
    request(sails.hooks.http.app)
      .post('/api/v1/user/password')
      .send(postData)
      .expect(200)
      .expect('content-type', /json/)
      .expect(hasCorrect200Response)
      .end(done);
  }

  /* Empty POST. */
  it('should reject empty POST with HTTP 422 and validation errors', (done) => {
    request(sails.hooks.http.app)
      .post('/api/v1/user/password')
      .send({})
      .expect(422)
      .expect('content-type', /json/)
      .expect(hasCorrect422Response)
      .end(done);
  });

  /* Only user_id field posted. */
  it('should accept test `user_id` and return expected json payload', (done) => {
    postValidDataAndCheckResponse(done, { user_id: '5480c950bffebc651c8b456f' });
  });

  /* Only email field posted. */
  it('should accept test `email` and return expected json payload', (done) => {
    postValidDataAndCheckResponse(done, { email: 'test@dosomething.org' });
  });

  /* Only mobile field posted. */
  it('should accept test `mobile` and return expected json payload', (done) => {
    postValidDataAndCheckResponse(done, { mobile: '5555555555' });
  });
});
