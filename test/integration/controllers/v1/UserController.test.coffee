###*
# UserController.test
###

request = require('supertest')
should = require('should')

###*
# Test invalid /user/password endpoint.
###

describe 'Requests to the root (/user/password) path with missing required body parameters.', ->
  it 'POST: Invalid password reset request with missing body parameters returns expected 422
      - Unprocessable due to request validation error results.', (done) ->
    request(sails.hooks.http.app)
      .post('/api/v1/user/password')
      .send({})
      .expect(422)
      .expect('content-type', /json/)
      .end (err, res) ->
        if err
          throw err
        res.status.should.equal 422
        res.body.should.have.property 'reason'
        res.body.should.have.property 'errors'
        res.body.errors.should.have.keys 'user_id', 'email', 'mobile'
        requiredRule = [ { 'rule': 'required' } ]
        res.body.errors.user_id.should.containDeep requiredRule
        res.body.errors.email.should.containDeep requiredRule
        res.body.errors.mobile.should.containDeep requiredRule
        done()
        return
    return
  return
